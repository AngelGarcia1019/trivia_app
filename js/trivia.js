import DB from "./db.js";

// DB
const db = new DB();

// Const names
const SCORE_HTML = "score.html";

// Elements
const questionContainer = document.getElementById("question-container");
const questionTitle = document.getElementById("question-title");
const questionAnswers = document.getElementById("question-answers");
const questionNumber = document.getElementById("question-number");
const lblLoading = document.getElementById("loading");
const lblScore = document.getElementById("lblScore");
const lblAnswerCorrect = document.getElementById("answer-correct");
const lblAnswerIncorrect = document.getElementById("answer-incorrect");
const lblNextAnswer = document.getElementById("lblNextAnswer");

// Data
const questions = db.readTrivia();
const typeQuestion = db.readTypeAnswer();

// Variables
let currentQuestionIndex = 0;
let score = 0;
let answerCorrect = false;

function showQuestion() {
  questionNumber.textContent = `Pregunta ${currentQuestionIndex + 1} / 10`;
  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;

  questionAnswers.innerHTML = "";

  if (typeQuestion == "boolean") {
    currentQuestion.incorrect_answers.push([currentQuestion.correct_answer]);
  }

  currentQuestion.incorrect_answers.sort();

  currentQuestion.incorrect_answers.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(button);
    button.classList =
      "flex-1 bg-blue-500 rounded-sm px-1 py-1 hover:bg-green-500 text-lg";
    questionAnswers.appendChild(button);
  });

  lblScore.innerText = score;
}

const nextQuestion = async () => {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    displayGoToScore();
    displayAnswerResult();
    setTimeout(() => {
      db.saveScore(score);
      window.location = SCORE_HTML;
    }, 5000);
    return;
  }
  displayLoading();
  setTimeout(() => {
    deactivateLoading();
  }, 1000);

  showQuestion();
};

const displayGoToScore = () => {
  displayLoading();
  lblNextAnswer.textContent = "___________________________________";
};

const displayLoading = () => {
  lblLoading.style.display = "flex";
  questionContainer.style.display = "none";
  questionNumber.style.display = "none";
};

const deactivateLoading = () => {
  lblLoading.style.display = "none";
  questionContainer.style.display = "flex";
  questionNumber.style.display = "flex";
};

const checkAnswer = async (selectedOption) => {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedOption.textContent;
  answerCorrect = selectedAnswer === currentQuestion.correct_answer;
  if (answerCorrect) {
    score += 100;
  }
  displayAnswerResult();
  await nextQuestion();
};

const displayAnswerResult = () => {
  if (answerCorrect) {
    lblAnswerCorrect.style.display = "flex";
    lblAnswerIncorrect.style.display = "none";
  } else {
    lblAnswerIncorrect.style.display = "flex";
    lblAnswerCorrect.style.display = "none";
  }
};

showQuestion();
