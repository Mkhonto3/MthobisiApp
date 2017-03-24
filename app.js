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

bot.dialog('/', function (session) {
    session.send("I am working");
});
bot.dialog('Hi', function (session) {
    session.send("Hello");
});
bot.dialog('How are you', function (session) {
    session.send("I am fine thanks");
});
bot.dialog('Bye', function (session) {
    session.send("Good Bye");
});
