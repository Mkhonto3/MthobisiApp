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
var Hmsg = '\n 1. If you looking Settlement Request. \n 2. Are you looking for Tax Certificate. \n 3. Are you looking for any statements';
var UserKey = 'UserName';
var UserWelKey = 'UserWelcomed';
var TownKey = 'City';

// Default dialog
var bot = new builder.UniversalBot(connector, function (session) {

    // initialize with default city
    if (!session.conversationData[TownKey]) {
        session.conversationData[TownKey] = 'Gauteng';
        session.send('Welcome to the Wesbnank %s', session.conversationData[TownKey]);
    }

    // is user's name set?
    var userName = session.userData[UserKey];
    if (!userName) {
        return session.beginDialog('greet');
    }

    // has the user been welcomed to the conversation?
    if (!session.privateConversationData[UserWelKey]) {
        session.privateConversationData[UserWelKey] = true;
        return session.send('Welcome back %s! Choose from the list: %s', userName, Hmsg);
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
   
    session.send('%s, wait a few seconds. Searching for \'%s\' in \'%s\'...', userName, msgT, city);
    session.send('https://www.wesbank.co.za/search?q=%s', encodeURIComponent(msgT));
    session.endDialog();
});

// reset bot dialog
bot.dialog('reset', function (session) {
    // reset data
    delete session.userData[UserKey];
    delete session.conversationData[TownKey];
    delete session.privateConversationData[TownKey];
    delete session.privateConversationData[UserWelKey];
    session.endDialog('Reseting Successful');
}).triggerAction({ matches: /^reset/i });

// Settlement Request
bot.dialog('1', function (session) {
    var userName = session.userData[UserKey];
    var defaultCity = session.conversationData[TownKey];
    var userCity = session.privateConversationData[TownKey];
    var msgT = 'Settlement request';
    session.send('%s, wait a few seconds. Searching for \'%s\' in \'%s\'...', userName, msgT, city);
    session.send('https://www.wesbank.co.za/search?q=%s', encodeURIComponent(msgT));
    session.endDialog();
}).triggerAction({ matches: /^1/i });

// Tax certificate
bot.dialog('2', function (session, args) {
    // change default city
    var newCity = args.intent.matched[1].trim();
    session.conversationData[TownKey] = newCity;
    var userName = session.userData[UserKey];
    var msgT = 'Tax Certificate';
    session.send('%s, wait a few seconds. Searching for \'%s\' in \'%s\'...', userName, msgT, city);
    session.send('https://www.wesbank.co.za/search?q=%s', encodeURIComponent(msgT));
    session.endDialog();
}).triggerAction({ matches: /^2/i });

// Statement
bot.dialog('changeMyCurrentCity', function (session, args) {
    // change user's city
    var newCity = args.intent.matched[1].trim();
    session.privateConversationData[TownKey] = newCity;
    var userName = session.userData[UserKey];
    
    var msgT = 'Statement';
    session.send('%s, wait a few seconds. Searching for \'%s\' in \'%s\'...', userName, msgT, city);
    session.send('https://www.wesbank.co.za/search?q=%s', encodeURIComponent(msgT));
    session.endDialog();
}).triggerAction({ matches: /^3/i });

// Greet dialog
bot.dialog('greet', new builder.SimpleDialog(function (session, results) {
    if (results && results.response) {
        session.userData[UserKey] = results.response;
        session.privateConversationData[UserWelKey] = true;
        return session.endDialog('Welcome %s! Choose from the list: %s ', results.response, Hmsg);
    }

    builder.Prompts.text(session, 'Can you please tell me your name?');
}));
