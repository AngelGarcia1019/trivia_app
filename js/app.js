import {
  getCategories,
  getDifficultiesAnswers,
  getTypesAnswers,
  generateTrivia,
} from "./api.js";
import DB from "./db.js";

const myForm = document.getElementById("form");
const selectionCategories = document.getElementById("categories");
const selectionTypeAnswers = document.getElementById("typeAnswers");
const selectionDifficultiesAnswers = document.getElementById(
  "difficultiesAnswers"
);
const btnGenerate = document.getElementById("btn-generate");

// Get data API
const categories = await getCategories();
const typeAnswers = getTypesAnswers();
const difficultiesAnswers = getDifficultiesAnswers();

// DB
const db = new DB();

// Load option categories
const htmlOptionCategories = categories.reduce((htmlActual, category) => {
  const optionHtml = `<option label='${category.name}' value='${category.id}'></option>`;
  return htmlActual + optionHtml;
}, `<option value='' selected> Selecciona una categoría </option>`);

selectionCategories.innerHTML = htmlOptionCategories;

// Load options type answers
const htmlOptionTypeAnswers = typeAnswers.reduce((htmlActual, typeAnswer) => {
  const optionHtml = `<option label='${typeAnswer.name}' value='${typeAnswer.value}'></option>`;
  return htmlActual + optionHtml;
}, `<option value='' selected> Selecciona tipo de pregunta </option>`);

selectionTypeAnswers.innerHTML = htmlOptionTypeAnswers;

// Load options difficulty
const htmlOptionDifficultyAnswers = difficultiesAnswers.reduce(
  (htmlActual, difficultyAnswer) => {
    const optionHtml = `<option label='${difficultyAnswer.name}' value='${difficultyAnswer.value}'></option>`;
    return htmlActual + optionHtml;
  },
  `<option value='' selected> Selecciona una dificultad </option>`
);

selectionDifficultiesAnswers.innerHTML = htmlOptionDifficultyAnswers;

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { category, typeAnswer, difficultyAnswer } = getDataForm();

  console.log(category);
  console.log(typeAnswer);
  console.log(difficultyAnswer);

  if (category == "" || typeAnswer == "" || difficultyAnswer == "") {
    alert("Por favor, selecciona correctamente las opciones :)");
    return;
  }

  disableButton();

  const questions = await getDataTogenerateTrivia({
    category,
    difficultyAnswer,
    typeAnswer,
  });
  console.log(questions);
  db.saveTrivia(questions);

  // Save data options
  const firstQuestion = questions[0];
  db.saveCategory(firstQuestion.category);
  db.saveTypeAnswers(firstQuestion.type);
  db.saveDifficultyAnswer(firstQuestion.difficulty);

  enableButton();

  window.location = "trivia.html";
});

const disableButton = () => {
  btnGenerate.innerText = "Generando...";
  btnGenerate.disabled = true;
};

const enableButton = () => {
  btnGenerate.innerText = "Generar";
  btnGenerate.disabled = false;
};

const getDataForm = () => {
  let data = {};
  for (let el of myForm.elements) {
    if (el.name.length > 0) {
      data[el.name] = el.value;
    }
  }
  return data;
};

const getDataTogenerateTrivia = async ({
  category,
  typeAnswer,
  difficultyAnswer,
}) => {
  return await generateTrivia({ category, typeAnswer, difficultyAnswer });
};
