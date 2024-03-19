import DB from "./db.js";

// DB
const db = new DB();

// Elements
const table = document.getElementById("table-results");
const lblScore = document.getElementById("lblScore");

// Data
const questions = db.readTrivia();

// Variables
let index = 1;

const htmlQuestions = questions.reduce((data, question) => {
  data += `<tr>
          <th class='text-center text-white py-2'>${index}</th>
          <td class='text-center text-white py-2'>${question.question}</td>
          <td class='text-center text-white py-2'>${
            question.correct_answer
          }</td>
          <td class='text-center text-white py-2'>${question.your_answer}</td>
          <th class='text-center text-white py-2'>${
            question.is_correct ? "✅" : "❌"
          }</th>
      </tr>`;
  index++;
  return data;
}, table.innerHTML);

table.innerHTML = htmlQuestions;

lblScore.textContent = db.readScore();
