$(document).ready(function() {

let questions = [
  {
    "quest" : "What is JavaScript's official name?",
    "choice" : ["Java", "Cascading Style Sheets", "JS", "ECMAScript"],
    "correct" : 3
  },
  {
    "quest" : "What HTML element does JavaScript go in?",
    "choice" : ["<function>", "<link>", "<js>", "<script>"],
    "correct" : 3
  },
  {
    "quest" : "How do you create a function in JavaScript?",
    "choice" : ["myDemo function()", "function = myDemo()", "myDemo:function()", "function myDemo()"],
    "correct" : 3
  },
  {
    "quest" : "How do you call a function in JavaScript?",
    "choice" : ["render myDemo()", "function = myDemo()", "function:myDemo()", "myDemo()"],
    "correct" : 3
  }
];

let quizDiv = $("#quiz");
let timer = 60;
let arrayIndex = 0;
var t;

function startQuiz() {

};

// https://jsfiddle.net/Daniel_Hug/pvk6p/

function countDown() {
  t = setTimeout(function() {
    timer--;
    removeSec();
  }, 1000);
}

function removeSec() {
  timer--;
};

countDown();
console.log(timer);

renderQuestion();

// shows a question to the user
function renderQuestion() {

    quizDiv.append($("<p>").text(questions[arrayIndex].quest));

    for (let j = 0; j < questions[arrayIndex].choice.length; j++) {
      quizDiv.append($("<button>").text(questions[arrayIndex].choice[j]).addClass("btn-choice btn-large mycolor"));
    };
};

// takes the question, checks if correct, increments to next question

$(document).on("click", ".btn-choice", function() {
  let choice = $(this).text();
  console.log(choice);
  if (choice === questions[arrayIndex].choice[3]) {
    // trigger toast message
    // alert("correct!");
    M.toast({html: 'Correct!'});
  }

  else {
    // trigger loosing toast message
    timer--;
    M.toast({html: `Oops, the correct answer is ${questions[arrayIndex].choice[3]}`});
  };
  arrayIndex++;
  quizDiv.empty();
  renderQuestion();
});



    // randomize/shuffle basePassword array

    // function passShuffe(array) {

    //   let currentIndex = array.length;
    //   let temporaryValue, randomIndex;
  
    //   while (0 !== currentIndex) {
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex--;
  
    //     temporaryValue = array[currentIndex];
    //     array[currentIndex] = array[randomIndex];
    //     array[randomIndex] = temporaryValue;
    //   }
    //   return array;
    // };
 

});