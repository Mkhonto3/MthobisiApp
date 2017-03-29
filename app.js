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

var intents = new builder.IntentDialog();
bot.dialog('/', intents);
intents.matches(/^say something else/i, [
    function (session) {
        session.beginDialog('/changesentence');
    },
    function (session, results) {
        session.send('Ok, I will say the following sentence from now on: %s', session.userData.sentence);
    }
]);
intents.onDefault([
    function (session, args, next) {
        if (!session.userData.sentence) {
            session.beginDialog('/changesentence');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send(session.userData.sentence);
    }
]);
bot.dialog('/changesentence', [
    function (session) {
        builder.Prompts.text(session, 'Hi, I am version 2.0 of the Microsoft Chatbot! I am already a lot smarter now! What would you like me to say?');
    },
    function (session, results) {
        session.userData.sentence = results.response;
        session.endDialog();
    }
]);
