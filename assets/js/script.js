var startBtn = document.getElementById("start-button");
var timerContainer = document.getElementById("timer-container")
var startContainer=document.getElementById("start-container");
var questionContainer=document.getElementById("question-container");
var submitContainer=document.getElementById("submit-container");
var scoreContainer=document.getElementById("score-container");
var timeEl = document.getElementById("timer");
var question = document.getElementById('question')
var answerA= document.getElementById("A");
var answerB= document.getElementById("B");
var answerC= document.getElementById("C");
var answerD= document.getElementById("D");
var showAnswer = document.getElementById("showAnswer")
var answerBtn = document.getElementById('answer-buttons')
var scoreEl = document.getElementById("score")
var userInitial = document.getElementById("user-initial")
var scoreList = document.getElementById("score-list")
var submit = document.getElementById("submit")
var restart = document.getElementById("go-back")
var clearButton = document.getElementById("clear-score")

// set questions
let questions = [
  {
   
    question: "What does HTML stand for?",
    //"Hyper Text Markup Language",
    correct: "C" , 
    choiceA:"A. Hyper Text Preprocessor",
      
    choiceB: "B. Hyper Text Markup Language",
    choiceC:"C. Hyper Text Multiple Language",
    choiceD:"D. Hyper Tool Multi Language"
    
  },
  {
    
    question: "What does CSS stand for?",
    //"Cascading Style Sheet", 
    correct: "D",
    
    choiceA: "A. Common Style Sheet",
    choiceB: "B. r Colorful Style Sheet",
    choiceC:"C. ComputeStyle Sheet",
    choiceD:"D. Cascading Style Sheet"
    
  },
  {
    
    question: "What does PHP stand for?",
    //"Hypertext Preprocessor",
    correct: "A",
    choiceA:"A. Hypertext Preprocessor",
    choiceB:"B. Hypertext Programming",
    choiceC: "C. Hypertext Preprogramm ing",
    choiceD: "D. Hometext Preprocessor"
  
  },
  {
    
    question: "What does SQL stand for?",
     //"Structured Query Language",
    correct: "D",
      choiceA:"A. Stylish Question Language",
      choiceB:"B. Stylesheet Query Language",
      choiceC:"C. Statement Question Language",
      choiceD:"D. Structured Query Language"
    
  },
  {
    
    question: "What does XML stand for?",
     //"eXtensible Markup Language",
    correct: "A",
      choiceA:"A. eXtensible Markup Language",
      choiceB:"B. eXecutable Multiple Language",
      choiceC:"C. eXTra Multi-Program Language",
      choiceD:"D. eXamine Multiple Language"
    
  }]
  

 
let lastQuestionIndex = questions.length-1;
let currentQuestionIndex =0;
// let score = 0;
 
let score = 0;
var scores =[];
var initials =[];
var secondsLeft = 60;

  // show question container
function renderQuestion(){
  let q = questions[currentQuestionIndex];
  question.innerHTML = q.question;
  answerA.innerHTML = q.choiceA;
  answerB.innerHTML = q.choiceB;
  answerC.innerHTML = q.choiceC;
  answerD.innerHTML = q.choiceD;

}


function answerIsCorrect(){
  showAnswer.innerHTML ="Correct"  

}

function answerIsWrong(){
  showAnswer.innerHTML ="Wrong"
  secondsLeft = (secondsLeft - 12) < 0 ? 1 : (secondsLeft - 12)
}

//Check answer
function checkAnswer(answer){
  showAnswer.classList.remove('hide')

  if(questions[currentQuestionIndex].correct == answer){
    score ++;
    answerIsCorrect();
  }else{
    answerIsWrong()
   }

  if(currentQuestionIndex<lastQuestionIndex){
    currentQuestionIndex++;
    renderQuestion();
  }else{
    currentQuestionIndex++;
    showAnswer.classList.add('hide')
    questionContainer.classList.add('hide')
    submitContainer.classList.remove('hide')
    scoreEl.innerHTML = score;
    // timeEl= secondsLeft;
  }
   
}

// Start quiz function 
function startQuiz(){
    timeEl.textContent=60;
    startContainer.classList.add('hide')
    questionContainer.classList.remove("hide")
    timerContainer.classList.remove('hide')
    showAnswer.classList.add('hide')
    
    setTime()
    renderQuestion()
};


// Store score in local storage

function storeScores() {
  localStorage.setItem("scores", JSON.stringify(scores))
  localStorage.setItem("initials", JSON.stringify(initials))
  
  // var initial = localStorage.getItem("initial")
}

// Show Scores 
function renderScores(){
  scoreList.innerHTML =""
  var initials= JSON.parse(localStorage.getItem("initials"));
    var scores = JSON.parse(localStorage.getItem("scores"));
  // create li for each inital 
  for (var i = 0; i < initials.length; i++) {
    
    var initial = initials[i];
    var score = scores[i];
    var li = document.createElement("li");
    li.textContent = initial+"-"+score;
    scoreList.appendChild(li);
}
}


// This function is being called below and will run when the page loads.
function init() {
  
  var storedInitial = JSON.parse(localStorage.getItem("initials"));
  var storedScore = JSON.parse(localStorage.getItem("scores"));

  
  if (storedInitial !== null) {
    initials = storedInitial;
    scores = storedScore;
  }
  renderScores()

}

//Clear history storage
function reset(){
  score = 0;
  scores =[];
  initials =[];
  localStorage.removeItem("initials");
  localStorage.removeItem("scores");
  scoreList.innerHTML =""
  };


  // Timer
function setTime() {
    
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft ; 

      if(!(currentQuestionIndex <= lastQuestionIndex)){
        
        clearInterval(timerInterval);
      }
      if(secondsLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        questionContainer.classList.add('hide')
        submitContainer.classList.remove('hide')
        showAnswer.classList.add('hide')
        scoreContainer.classList.add('hide')
        scoreEl.innerHTML = score;
      }
     
    }, 1000);
  };


  // Start Quiz
  startBtn.addEventListener("click", startQuiz);
  
  // Submit score and initial button 
  submit.addEventListener("click", function(event){
    event.preventDefault();
    var initial = userInitial.value.trim()
    var scoreInput = scoreEl.innerHTML
   
  
    if (initial === "") {
      return;
    } 
      initials.push(initial)
      scores.push(scoreInput)
      userInitial.value = "";
      storeScores()
      renderScores()
      submitContainer.classList.add('hide')
      scoreContainer.classList.remove('hide')
    }
  
  )
  
//   Clear button
  clearButton.addEventListener("click", reset);

  restart.addEventListener("click", function(){
  scoreContainer.classList.add('hide')
  startContainer.classList.remove('hide')
  showAnswer.classList.add('hide')
  timerContainer.classList.add('hide')
  currentQuestionIndex =0;
  showAnswer.innerHTML ="" 
  score = 0;
  secondsLeft = 60;
  })

  init()















   
  // console.log('answer1El->: ', answer1El || null)
  // answer1El.addEventListener("click", function() {
  //   console.log("work")
  //   currentQuestion++;
  //   showQuestion()
  // })