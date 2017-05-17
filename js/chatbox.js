var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date();
  if (m !== d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}
var msg;
function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) === '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  //setTimeout(function() {
    conversationpatterns();
  //}, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which === 13) {
    insertMessage();
    return false;
  }
});

var convpatterns = new Array(
  new Array (".*hello.*","Greetings.","Hi","Good day"),
  new Array ("how are you","I am good and you.","Not bad at all","I am super"),
  new Array (".*your name.*","I am System Smart","Computer"),
  new Array ("Who made you","Mthobisi"),
  new Array ("What do you know","Computer Programming languages","Explaining computer languages"),
  new Array ("What is java","Java is an object oreinted programming"),
  new Array ("What is C","C is a high-level and general-purpose programming language"),
  new Array ("Bye","See you later","I am out of here","Cool","Goodbye"),
  new Array (".*","What do you mean","Come agian","I dont understand you")
          );

var soutput = "";
function conversationpatterns(){
    for(i=0;i < convpatterns.length;i++){
        re = new RegExp (convpatterns[i][0],"i");
        if(re.test(msg)){
            len = convpatterns[i].length - 1;
            index = Math.ceil(len * Math.random());
            reply = convpatterns[i][index];
            soutput = msg.replace(re,reply);
            soutput = initialCap(soutput);
            
            $('.message.loading').remove();
            $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + soutput + '</div>').appendTo($('.mCSB_container')).addClass('new');
            updateScrollbar();
        }
    }
    
    setDate();
   
    //i++;
  //}, 1000 + (Math.random() * 20) * 100);
}
function initialCap(field) {
   field = field.substr(0, 1).toUpperCase() + field.substr(1);
   return field;
}

/*var questionNum = 0;													// keep count of question, used for IF condition.
var question = '<h1>what is your name?</h1>';				  // first question

var output = document.getElementById('output');				// store id="output" in output variable
output.innerHTML = question;													// ouput first question

function bot() { 
    var input = document.getElementById("input").value;
    console.log(input);

    if (questionNum == 0) {
    output.innerHTML = '<h1>hello ' + input + '</h1>';// output response
    document.getElementById("input").value = "";   		// clear text box
    question = '<h1>how old are you?</h1>';			    	// load next question		
    setTimeout(timedQuestion, 2000);									// output next question after 2sec delay
    }

    else if (questionNum == 1) {
    output.innerHTML = '<h1>That means you were born in ' + (2016 - input) + '</h1>';
    document.getElementById("input").value = "";   
    question = '<h1>where are you from?</h1>';					      	
    setTimeout(timedQuestion, 2000);
    }   
}

function timedQuestion() {
    output.innerHTML = question;
}

//push enter key (using jquery), to run bot function.
$(document).keypress(function(e) {
  if (e.which == 13) {
    bot();																						// run bot function when enter key pressed
    questionNum++;																		// increase questionNum count by 1
  }
});

 */


