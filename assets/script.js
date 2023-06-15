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

//function to handle a user-choice selection 
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

// Function to end the quiz
function endQuiz() {
  clearInterval(timeInterval);
  timerEl.textContent = 'Time: ' + time;

  //

  submitBtn.classList.add('.submit');
  submitBtn.classList.remove('#submit-button');



  // Add your logic for ending the quiz and displaying the score input form here
}
//function to update the scores
function upddateScore() {
  scoreEl.textContent = `Total Score:      ${scores}%`;
}
  




