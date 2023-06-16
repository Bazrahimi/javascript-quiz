// DOM Elements
const startBtn = document.getElementById('start-button');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const initialsInput = document.getElementById('initials');
const submitBtn = document.getElementById('submit-button');
const highScoreEl = document.getElementById('highscore');

// Quiz Variables
let currentQuestionIndex = 0;
let time = 40;
let timeInterval;
let scores = 0;

// Quiz Questions
const questions = [
  {
    question: 'What is JavaScript?',
    choices: ['A script code editor', 'A style sheet language', 'A markup language', 'A programming language'],
    answer: 3 // Represents the index of the correct answer
  },
  {
    question: 'What does DOM stand for?',
    choices: ['Display Object Module', 'Data Object Model', 'Domain Object Model', 'Document Object Model'],
    answer: 3 // Represents the index of the correct answer
  },
  {
    question: 'Which keyword is used to declare a variable in JavaScript?',
    choices: ['const', 'var', 'let', 'all of the above'],
    answer: 3
  },
  {
    question: 'Which of the following is NOT a JavaScript data type?',
    choices: ['String', 'Float', 'Number', 'Boolean'],
    answer: 1 // Represents the index of the correct answer
  },
  {
    question: 'What is the purpose of the "if" statement in JavaScript?',
    choices: ['To make decisions based on conditions', 'To declare variables', 'To iterate over an array', 'To perform mathematical calculations'],
    answer: 0
  }
];

// Event listener for start button + function to start the Quiz
startBtn.addEventListener('click', function startQuiz() {
  // Hide start button
  startBtn.style.display = 'none';

  // Start the timer
  startTimer();

  // Display the first question
  showQuestion();
});


function startTimer() {
  timeInterval = setInterval(function() {
    time--;
    timerEl.textContent = 'Time: ' + time;
    if (time <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to display questions
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

// Function to handle a user quiz attempt
function handleChoice(event) {
  const selectedChoiceIndex = parseInt(event.target.getAttribute('data-index'));
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedChoiceIndex === currentQuestion.answer) {
    feedbackEl.textContent = 'Correct!';
    feedbackEl.classList.remove('incorrect-feedback');
    feedbackEl.classList.add('correct-feedback');
    scores += 20;
    
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
}

// Function to save scores and initials
function saveScore() {
  const initials = initialsInput.value.trim();
  const scoreData = {
    initials: initials,
    score: scores
  };

  // Save new scores to localStorage
  let scoresArray = JSON.parse(localStorage.getItem('scores')) || [];
  scoresArray.push(scoreData);
  localStorage.setItem('scores', JSON.stringify(scoresArray));
}

function endQuiz() {
  clearInterval(timeInterval);
  timerEl.textContent = 'Time: ' + time;

  // Hide start button, question, multiple choice, and feedback elements
  startBtn.style.display = 'none';
  questionEl.style.display = 'none';
  choicesEl.style.display = 'none';
  feedbackEl.style.display = 'none';

  // Display initials input and submit button
  initialsInput.style.display = 'block';
  submitBtn.style.display = 'block';
  submitBtn.classList.add('submit');

  // Create two paragraphs
  const p1 = document.createElement('p');
  p1.textContent = 'All Done!';
  p1.style.fontSize = '25px';

  const p2 = document.createElement('p');
  p2.textContent = `Your final score is ${scores}%.`;
  p2.style.marginTop = '10px';
  p2.style.marginBottom = '10px';

  initialsInput.insertAdjacentElement('beforebegin', p2);
  p2.insertAdjacentElement('beforebegin', p1);

  // Add event listener for submit button
  submitBtn.addEventListener('click', function() {
    if (initialsInput.value.trim() === '') {
      alert('Please enter your initials.');
    } else {
      saveScore();

      window.location.href = './assets/html/scores.html';
   
    }
  });
}

//display the highest scores when the page loads.
window.addEventListener('load', function() {
 let scoresArray =  JSON.parse(localStorage.getItem('scores')) || [];
 scoresArray.sort((a, b) => b.score - a.score);
 if (scoresArray.length > 0) {
  const highestScore = scoresArray[0].score;
  highScoreEl.innerHTML = `Highest Score: <a href="./assets/html/scores.html">${highestScore}%</a>`;
 } else { 
  highScoreEl.textContent = 'No High Scores';
  

 }

});

