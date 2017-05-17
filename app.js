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
    appPassword: 'PjPqhyVA4qgPVOaLdVykmJn'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
var Hmsg = '\n * If you want to know which city I\'m using for my searches type \'current city\'. \n * Want to change the current city? Type \'change city to cityName\'. \n * Want to change it just for your searches? Type \'change my city to cityName\'';
var UserKey = 'UserName';
var UserWelKey = 'UserWelcomed';
var TownKey = 'City';

// Default dialog
var bot = new builder.UniversalBot(connector, function (session) {

    // initialize with default city
    if (!session.conversationData[§]) {
        session.conversationData[TownKey] = 'Gauteng';
        session.send('Welcome to the Wesbank chatbot. I\'m currently configured to search for things in %s');
    }

    // is user's name set? 
    var userName = session.userData[UserKey];
    if (!userName) {
        return session.beginDialog('greet');
    }

    // has the user been welcomed to the conversation?
    if (!session.privateConversationData[UserWelKey]) {
        session.privateConversationData[UserWelKey] = true;
        return session.send('Welcome back %s!);
    }

    session.beginDialog('search');
});

// Enable Conversation Data persistence
bot.set('persistConversationData', true);

// search dialog
bot.dialog('search', function (session, args, next) {
    // perform search
    var city = session.privateConversationData[TownKey] || session.conversationData[TownKey];
    var userName = session.userData[UserKey];
    var msgT = session.message.text.trim();
    if(msgT == ".*Statement*."){
       https://www.wesbank.co.za/wesbankcoza/account/
       session.send('%s, wait a few seconds. Searching for \'%s\' in \'%s\'...', userName, msgT);
      session.send('https://www.wesbank.co.za/search?q=%s', encodeURIComponent(msgT));
      session.endDialog();
    }
  
});

// reset bot dialog
bot.dialog('reset', function (session) {
    // reset data
    delete session.userData[UserKey];
    delete session.conversationData[TownKey];
    delete session.privateConversationData[TownKey];
    delete session.privateConversationData[UserWelKey];
    session.endDialog('Ups... I\'m suffering from a memory loss...');
}).triggerAction({ matches: /^reset/i });

// print current city dialog
bot.dialog('printCurrentCity', function (session) {
    var userName = session.userData[UserKey];
    var defaultCity = session.conversationData[TownKey];
    var userCity = session.privateConversationData[TownKey];
    if (!defaultCity) {
        session.endDialog('I don\'t have a search city configured yet.');
    } else if (userCity) {
        session.endDialog(
            '%s, you have overridden the city. Your searches are for things in %s. The default conversation city is %s.',
            userName, userCity, defaultCity);
    } else {
        session.endDialog('Hey %s, I\'m currently configured to search for things in %s.', userName, defaultCity);
    }
}).triggerAction({ matches: /^current city/i });

// change current city dialog
bot.dialog('changeCurrentCity', function (session, args) {
    // change default city
    var newCity = args.intent.matched[1].trim();
    session.conversationData[TownKey] = newCity;
    var userName = session.userData[UserKey];
    session.endDialog('All set %s. From now on, all my searches will be for things in %s.', userName, newCity);
}).triggerAction({ matches: /^change city to (.*)/i });

// change my current city dialog
bot.dialog('changeMyCurrentCity', function (session, args) {
    // change user's city
    var newCity = args.intent.matched[1].trim();
    session.privateConversationData[TownKey] = newCity;
    var userName = session.userData[UserKey];
    session.endDialog('All set %s. I have overridden the city to %s just for you', userName, newCity);
}).triggerAction({ matches: /^change my city to (.*)/i });

// Greet dialog
bot.dialog('greet', new builder.SimpleDialog(function (session, results) {
    if (results && results.response) {
        session.userData[UserKey] = results.response;
        session.privateConversationData[UserWelKey] = true;
        return session.endDialog('Welcome %s! %s', results.response, Hmsg);
    }

    builder.Prompts.text(session, 'Can you please tell me your name?');
}));
