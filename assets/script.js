//DOM Elements
const startBtn = document.getElementById('start-button');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const initialsInput = document.getElementById('initials');
const submitBtn = document.getElementById('submit-button');

//Quiz Variables 
let currentQuestionIndex = 0;
let time = 40;
let timeInterval;

//Quiz Questions
const questions = [
  {
    question: 'Question 1: What is JavaScript?',
    choices: ['A script code editor', 'A style sheet language', 'A markup language', 'A programming language'],
    //represent the index of correct answer
    answer: 3
  },
  {
    question: 'Question 2: What does DOM stand for___?',
    choices: ['Display Object Module', 'Data Object Model', 'Domain Object Model', 'Document Object Model'],
    //represent the index of correct answer
    answer: 3
  },
  {
    question: 'Question 3: Which keyword is used to declare a variable in JavaScript___?',
    choices: ['const', 'var', 'Let', 'all of the above'],
    answer: 3
  },
  {
    question: 'Question 4: Which of the following is NOT a JavaScript data type___?',
    choices: ['String', 'Float', 'Number', 'Boolean'],
    //represent the index of correct answer
    answer: 1
  },
  {
    question: 'Question 5: What is the purpose of the "if" statement in JavaScript___?',
    choices: ['To make decisions based on conditions', 'To declare variables', 'To iterate over an array', 'To perform mathematical calculations'],
    answer: 0
  }
];

//event listener for start button + function to start the Quiz
startBtn.addEventListener('click', function startQuiz() {
  //Hide start button + initial input
  startBtn.style.display = 'none';
  initialsInput.style.dislay = 'none';

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

//function to display a question
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;
  choicesEl.innerHTML = '';
  for (let i = 0; i < question.choices.length; i++) {
    const choice = document.createElement('button');
    choice.textContent = (i + 1) + '. ' + question.choices[i];
    choice.setAttribute('data-index', i);
    choice.addEventListener('click', handleChoice);
    choicesEl.appendChild(document.createElement('br'));// Add Numbeing and line break for options. 
  }
}

//function to handle a choice selection 
function handleChoice(event) {
  const selectedChoiceIndex = parseInt(event.target.getAttribute('data-index'));

  if (selectedChoiceIndex === questions.answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = 'Wrong!';
    time -= 10;
    if (time < 0) {
      time=0;
    }
    timerEl.textContent = 'Time: ' + time;
  }
}

