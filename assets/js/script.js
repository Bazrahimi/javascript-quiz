//DOM Elements
const startBtn = document.getElementById('start-button');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const initialsInput = document.getElementById('initials');
const scoreEl = document.getElementById('scores');
const submitBtn = document.getElementById('submit-button');



//Quiz Variables 
let currentQuestionIndex = 0;
let time = 40;
let timeInterval;
let scores = 0;

//Quiz Questions
const questions = [
  {
    question: 'What is JavaScript  ___?',
    choices: ['A script code editor', 'A style sheet language', 'A markup language', 'A programming language'],
    //represent the index of correct answer
    answer: 3
  },
  {
    question: 'What does DOM stand for  ___?',
    choices: ['Display Object Module', 'Data Object Model', 'Domain Object Model', 'Document Object Model'],
    //represent the index of correct answer
    answer: 3
  },
  {
    question: 'Which keyword is used to declare a variable in JavaScript  ___?',
    choices: ['const', 'var', 'Let', 'all of the above'],
    answer: 3
  },
  {
    question: 'Which of the following is NOT a JavaScript data type  ___?',
    choices: ['String', 'Float', 'Number', 'Boolean'],
    //represent the index of correct answer
    answer: 1
  },
  {
    question: 'What is the purpose of the "if" statement in JavaScript___?',
    choices: ['To make decisions based on conditions', 'To declare variables', 'To iterate over an array', 'To perform mathematical calculations'],
    answer: 0
  }
];

//event listener for start button + function to start the Quiz
startBtn.addEventListener('click', function startQuiz() {
  //Hide start button
  startBtn.style.display = 'none';

  //start the timer
  startTimer();

  //display the first question
  showQuestion();
});

//function to start Timer 
function startTimer() {
  timeInterval = setInterval(function() {
    time--;
    timerEl.textContent = 'Time: ' + time;
    if (time <= 0) {
      endQuiz();
    }
  }, 1000);
}

//function to display questions
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;

  choicesEl.innerHTML = '';

  for (let i = 0; i < question.choices.length; i++) {
    const choice = document.createElement('button');
    choice.textContent = (i + 1) + '. ' + question.choices[i];
    choice.setAttribute('data-index', i);
    choice.addEventListener('click', handleChoice);
    choicesEl.appendChild(choice);

    choicesEl.appendChild(document.createElement('br'));
  }
}

//function to handle a user quiz attempt
// ...

function handleChoice(event) {
  const selectedChoiceIndex = parseInt(event.target.getAttribute('data-index'));
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedChoiceIndex === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!";
    feedbackEl.classList.remove('incorrect-feedback');
    feedbackEl.classList.add('correct-feedback');
    scores+= 20;
    upddateScore();
  } else {
    feedbackEl.textContent = 'Wrong!';
    feedbackEl.classList.add('incorrect-feedback');
    feedbackEl.classList.remove('correct-feedback');
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = 'Time: ' + time;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    // Proceed to the next question
    showQuestion();
  }

  // Hide initials input if it has a value
  if (initialsInput.value !== '') {
    initialsInput.style.display = 'none';
  }
}


//function to update the scores
//plase consider to delete this
function upddateScore() {
  scoreEl.textContent = `Total Score:      ${scores}%`;
}

//funtion to save scores and initials
function saveScore() {
  const initials = initialsInput.value.trim();
  const scoreData = {
    initials: initials,
    score: scores
  };
    //safe new scores localStorage
  let scoresArray = JSON.parse(localStorage.getItem('scores')) || [];
  scoresArray.push(scoreData);
  localStorage.setItem('scores', JSON.stringify(scoresArray));
}

function endQuiz() {
  clearInterval(timeInterval);
  timerEl.textContent = 'Time: ' + time;

  //Hide start button, Question, multiple choice and feedback to multiple choices.
  startBtn.style.display = 'none';
  questionEl.style.display = 'none';
  choicesEl.style.display = 'none';
  feedbackEl.style.display = 'none';

  //Display initials input and submit button
  initialsInput.style.display = 'block';
  submitBtn.style.display = 'block';
  submitBtn.classList.add('submit');

  //create two parapgraphs page
  const p1 = document.createElement('p');
  p1.textContent = 'All Done!';
  p1.style.fontSize = '25px';

  const p2 = document.createElement('p');
  p2.textContent = `Your final score is ${scores}%.`;
  p2.style.marginTop= '10px';
  p2.style.marginBottom= '10px';

  initialsInput.insertAdjacentElement("beforebegin", p2);
  p2.insertAdjacentElement("beforebegin", p1);
  






  // Add add event listener for submit
  submitBtn.addEventListener('click', function () {
    saveScore();
    //show a message to indicate successful submission.
  });

}

function upddateScore() {
  scoreEl.textContent = `Total Score: ${scores}%`;
}
  
window.addEventListener('load', function() {
  let scoresArray = JSON.parse(this.localStorage.getItem('scores')) || [];
  //sort the scores
  scoresArray.sort((a, b) => b.score - a.score);
  //Display scores in the scoreEl 
  scoresArray.forEach(scoreData => {
    const scoreItem = document.createElement('div');
    scoreItem.textContent = `${scoreData.initials}: ${scoreData.score}%`;
    scoreEl.appendChild(scoreItem);

  });
});