$(document).ready(function() {

// setting variables

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
let timerDisp = $(".timer");
let highScores = $(".highScores");
let arrayIndex = 0;
let score = 60;
let finalScore;
let t;
let userHighScores = JSON.parse(localStorage.getItem("userHighScores"));

console.log(userHighScores);

// Start the Quiz

$(document).on("click", ".btn-start", function() {
  $(".btn-large").addClass("disabled");
  arrayIndex = 0;
  timer();
  renderQuestion();
});

// Timer Function

function countDown() {
    score--;
    timer();
    timerDisp.text(score);
}

function timer() {
    t = setTimeout(countDown, 1000);
      if (score < 1 || arrayIndex > questions.length - 1) {
    clearTimeout(t);
  }
}

// shows a question to the user
function renderQuestion() {

  if (arrayIndex < questions.length) {
      
    quizDiv.append($("<p>").text(questions[arrayIndex].quest));

    for (let j = 0; j < questions[arrayIndex].choice.length; j++) {
      quizDiv.append($("<button>").text(questions[arrayIndex].choice[j]).addClass("btn-choice btn-large mycolor"));
    };
  }

  else {
    endGame();
  };
};

// takes the question, checks if correct, increments to next question

$(document).on("click", ".btn-choice", function() {
  let choice = $(this).text();
  if (choice === questions[arrayIndex].choice[3]) {
    // trigger toast message
    M.toast({html: 'Correct!'});
  }

  else {
    // trigger loosing toast message
    score = score - 10;
    $(".card").addClass("shake");
    M.toast({html: `Oops, the correct answer is ${questions[arrayIndex].choice[3]}`});
          setTimeout(function() {
        $(".card").removeClass("shake");
      }, 800);
  };
  arrayIndex++;
  quizDiv.empty();
  renderQuestion();
});

// End of Game

function endGame() {
  clearTimeout(t);
  let elem = document.querySelector('.modal');
  let instance = M.Modal.init(elem);
  M.Toast.dismissAll();
  finalScore = score;
  $(".finalScore").text(finalScore);
  score = 60;
  timerDisp.text(score);
  instance.open();
  $(".btn-large").removeClass("disabled");
};


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
 
// Create object to store score in local storage

$("#submit").on("click", function() {
  let userName = $("#name").val();

  // if (userHighScores !== null) {
  //   userHighScores[userHighScores.length] = {
  //     username: userName.trim(),
  //     score: finalScore
  //   };
  // }

  // else {
  //   userHighScores[0] = {
  //     username: userName.trim(),
  //     score: finalScore
  //   };
  // };

  // retrieve JSON object
  // append new element to JSON object
  // set new 
  // https://stackoverflow.com/questions/736590/add-new-attribute-element-to-json-object-using-javascript
  

  console.log(userHighScores[0]);
});

// Display the latest user high scores


});