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
    appPassword: 'OOmVxg1kNob7O72jgPCdjdi'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('Hi', function (session) {
    session.send("Hello");
});
bot.dialog('How are you', function (session) {
    session.send("I am fine thanks");
});
bot.dialog('Bye', function (session) {
    session.send("Good Bye");
});

//LUIS Model
var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?xxxxxxx';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer]});
/*
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
    appPassword: 'OOmVxg1kNob7O72jgPCdjdi'
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
});*/

