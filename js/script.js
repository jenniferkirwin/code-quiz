$(document).ready(function() {

// setting variables

let questions = [
  {
    "quest" : "What is JavaScript's official name?",
    "choice" : ["Java", "ECMAScript", "Cascading Style Sheets", "JS"],
    "correct" : 1
  },
  {
    "quest" : "What HTML element does JavaScript go in?",
    "choice" : ["&lt;function&gt;", "&lt;link&gt;", "&lt;js&gt;", "&lt;script&gt;"],
    "correct" : 3
  },
  {
    "quest" : "How do you create a function in JavaScript?",
    "choice" : ["myDemo function()", "function = myDemo()", "function myDemo()", "myDemo:function()"],
    "correct" : 2
  },
  {
    "quest" : "How do you call a function in JavaScript?",
    "choice" : ["render myDemo();", "function = myDemo();",  "myDemo();", "function:myDemo();"],
    "correct" : 2
  }
];

let quizDiv = $("#quiz");
let timerDisp = $(".timer");
let scoresTable = $(".scoresTable");
let arrayIndex = 0; 
let currentScore = 60;
let finalScore;
let t; // t is for the timer
let userScores; 
let elem = document.querySelector('.modal'); // Modal variable
let instance = M.Modal.init(elem); // Modal variable

// -------------------------------------------------------------------------------------
// seeing if scores are in storage & rendering them
// -------------------------------------------------------------------------------------

if (localStorage.getItem("userScores") !== null) {
  userScores = JSON.parse(localStorage.getItem("userScores"));
  userScoresInd = userScores.length;
  scoreList();
}

else {
  userScores = [];
};

function scoreList() {
  for (let i = 0; i < userScores.length; i++) {
    let tr = scoresTable.append($("<tr>"));
    tr.append($("<td>").text(userScores[i].name));
    tr.append($("<td>").text(userScores[i].score));
  };  
};

// -------------------------------------------------------------------------------------
// Start the Quiz
// -------------------------------------------------------------------------------------

$(document).on("click", ".btn-start", function() {
  $(".btn-large").addClass("disabled");
  arrayIndex = 0;
  timer();
  renderQuestion();
});

// -------------------------------------------------------------------------------------
// Timer Function
// -------------------------------------------------------------------------------------

function countDown() {
    currentScore--;
    timer();
    timerDisp.text(currentScore);
}

function timer() {
    t = setTimeout(countDown, 1000);
      if (currentScore < 1 || arrayIndex > questions.length - 1) {
    clearTimeout(t);
    endGame();
  }
}


// -------------------------------------------------------------------------------------
// shows a question to the user
// -------------------------------------------------------------------------------------

function renderQuestion() {

  if (arrayIndex < questions.length && currentScore > 0) {
      
    quizDiv.append($("<p>").text(questions[arrayIndex].quest));

    for (let j = 0; j < questions[arrayIndex].choice.length; j++) {
      quizDiv.append($("<button>").html(questions[arrayIndex].choice[j]).attr("data-index", j).addClass("btn-choice btn-large mycolor"));
    };
  }

  else {
    endGame();
  };
};

// -------------------------------------------------------------------------------------
// takes the question, checks if correct, increments to next question
// -------------------------------------------------------------------------------------

$(document).on("click", ".btn-choice", function() {
  let correctAns = questions[arrayIndex].correct;
  let choice = parseInt($(this).attr("data-index"));

  if (choice === correctAns) {
    // trigger toast message
    M.toast({html: 'Correct!'});
  }

  else {
    // trigger loosing toast message
    currentScore = currentScore - 10;
    timerDisp.text(currentScore);
    $(".card").addClass("shake");
    M.toast({html: `Oops, the correct answer is ${questions[arrayIndex].choice[correctAns]}`});
          setTimeout(function() {
        $(".card").removeClass("shake");
      }, 800);
  };
  arrayIndex++;
  quizDiv.empty();
  renderQuestion();
});

// -------------------------------------------------------------------------------------
// End of Game
// -------------------------------------------------------------------------------------

function endGame() {
  clearTimeout(t);
  M.Toast.dismissAll();
  quizDiv.empty();
  if (currentScore < 1) {
    finalScore = 0;
  }
  else {
    finalScore = currentScore;
  }
  
  $(".finalScore").text(finalScore);
  currentScore = 60;
  timerDisp.text(currentScore);
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

    // OR https://stackoverflow.com/questions/3718282/javascript-shuffling-objects-inside-an-object-randomize
 
// -------------------------------------------------------------------------------------
// Create object to store score in local storage
// -------------------------------------------------------------------------------------

$("#submit").on("click", function(e) {

  let userName = $("#name").val();
  
  if (userName === "") {
    $(".modal").addClass("shake");
    setTimeout(function() {
      $(".modal").removeClass("shake");
    }, 800);
    return;
    
  }
  // push to storage
  
  newScore = {
    "name": userName,
    "score": finalScore
  }
  userScores.push(newScore);
  localStorage.setItem("userScores", JSON.stringify(userScores));
  $("#name").val("");

  // render on table
  let tr = scoresTable.append($("<tr>"));
  tr.append($("<td>").text(userScores[userScores.length-1].name));
  tr.append($("<td>").text(userScores[userScores.length-1].score));
  instance.close();
});

$(".btn-clear").on("click", function() {
  localStorage.clear();
  userScores = [];
  scoresTable.empty();
});

});