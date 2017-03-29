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

bot.dialog('Hi', function (session) {
    session.send("Greetings");
});
bot.dialog('How are you', function (session) {
    session.send("Fine thanks");
});
bot.dialog('What is your name', function (session) {
    session.send("Computer");
});
bot.dialog('How old are you', function (session) {
    session.send("1 week");
});