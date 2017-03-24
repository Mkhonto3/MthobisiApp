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
    appId: 'a457eb4b-956d-4dff-addd-ffd83bad5031',
    appPassword: 'kqOVtpmLo24K0kU1BJOhrxm'
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