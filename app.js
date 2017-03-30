var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: 'f7d843c6-24e4-448d-8f62-70d910b29b6f',
    appPassword: 'rQZi4LZeyb1N6r6mojwew0T'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
var HelpMessage = '\n * If you want to know which programming I\'m using for my searches type \'current programming\'. \n * Want to change the current programming? Type \'change programming to programmingName\'. \n * Want to change it just for your searches? Type \'change my programming to programmingName\'';
var UserNameKey = 'UserName';
var UserWelcomedKey = 'UserWelcomed';
var ProgrammingKey = 'Programming';

// Setup bot with default dialog
var bot = new builder.UniversalBot(connector, function (session) {

    // initialize with default Programming
    if (!session.conversationData[ProgrammingKey]) {
        session.conversationData[ProgrammingKey] = 'Java';
        session.send('Welcome to the Search Programming bot. I\'m currently configured to search for things in %s', session.conversationData[ProgrammingKey]);
    }

    // is user's name set? 
    var userName = session.userData[UserNameKey];
    if (!userName) {
        return session.beginDialog('greet');
    }

    // has the user been welcomed to the conversation?
    if (!session.privateConversationData[UserWelcomedKey]) {
        session.privateConversationData[UserWelcomedKey] = true;
        return session.send('Welcome back %s! Remember the rules: %s', userName, HelpMessage);
    }

    session.beginDialog('search');
});

// Enable Conversation Data persistence
bot.set('persistConversationData', true);

// search dialog
bot.dialog('search', function (session, args, next) {
    // perform search
    var program = session.privateConversationData[ProgrammingKey] || session.conversationData[ProgrammingKey];
    var userName = session.userData[UserNameKey];
    var messageText = session.message.text.trim();
    session.send('%s, wait a few seconds. Searching for \'%s\' in \'%s\'...', userName, messageText, program);
    session.send('https://www.bing.com/search?q=%s', encodeURIComponent(messageText + ' in ' + program));
    session.endDialog();
});

// reset bot dialog
bot.dialog('reset', function (session) {
    // reset data
    delete session.userData[UserNameKey];
    delete session.conversationData[ProgrammingKey];
    delete session.privateConversationData[ProgrammingKey];
    delete session.privateConversationData[UserWelcomedKey];
    session.endDialog('Ups... I\'m suffering from a memory loss...');
}).triggerAction({ matches: /^reset/i });

// print current programming dialog
bot.dialog('printCurrentProgramming', function (session) {
    var userName = session.userData[UserNameKey];
    var defaultProgram = session.conversationData[ProgrammingKey];
    var userProgram = session.privateConversationData[ProgrammingKey];
    if (!defaultProgram) {
        session.endDialog('I don\'t have a search city configured yet.');
    } else if (userProgram) {
        session.endDialog(
            '%s, you have overridden the programming. Your searches are for things in %s. The default conversation programming is %s.',
            userName, userProgram, defaultProgram);
    } else {
        session.endDialog('Hey %s, I\'m currently configured to search for things in %s.', userName, defaultProgram);
    }
}).triggerAction({ matches: /^current programming/i });

// change current programming dialog
bot.dialog('changeCurrentProgramming', function (session, args) {
    // change default programming
    var newProgram = args.intent.matched[1].trim();
    session.conversationData[ProgrammingKey] = newProgram;
    var userName = session.userData[UserNameKey];
    session.endDialog('All set %s. From now on, all my searches will be for things in %s.', userName, newProgram);
}).triggerAction({ matches: /^change programming to (.*)/i });

// change my current programming dialog
bot.dialog('changeMyCurrentProgramming', function (session, args) {
    // change user's programming
    var newProgram = args.intent.matched[1].trim();
    session.privateConversationData[ProgrammingKey] = newProgram;
    var userName = session.userData[UserNameKey];
    session.endDialog('All set %s. I have overridden the programming to %s just for you', userName, newProgram);
}).triggerAction({ matches: /^change my programming to (.*)/i });

// Greet dialog
bot.dialog('greet', new builder.SimpleDialog(function (session, results) {
    if (results && results.response) {
        session.userData[UserNameKey] = results.response;
        session.privateConversationData[UserWelcomedKey] = true;
        return session.endDialog('Welcome %s! %s', results.response, HelpMessage);
    }

    builder.Prompts.text(session, 'Before get started, please tell me your name?');
}));
