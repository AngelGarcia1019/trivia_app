import Category from "./models/category.js";
import DifficultyAnswer from "./models/difficulty_answer.js";
import TypeAnswer from "./models/type_answer.js";
import Question from "./models/question.js";

const BASE = "https://opentdb.com";

const getCategories = async () => {
  try {
    const response = await fetch(`${BASE}/api_category.php`);
    const data = await response.json();
    const categories = data["trivia_categories"].map((category) =>
      Category.fromJson(category)
    );
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getDifficultiesAnswers = () => {
  return [
    new DifficultyAnswer({
      value: "easy",
      name: "Fácil",
    }),
    new DifficultyAnswer({
      value: "medium",
      name: "Intermedio",
    }),
    new DifficultyAnswer({
      value: "hard",
      name: "Díficil",
    }),
  ];
};

const getTypesAnswers = () => {
  return [
    new TypeAnswer({
      value: "multiple",
      name: "Elección multiple",
    }),
    new TypeAnswer({
      value: "boolean",
      name: "Verdadero / Falso",
    }),
  ];
};

const generateTrivia = async ({
  category = null,
  typeAnswer = null,
  difficultyAnswer = null,
}) => {
  try {
    const amount = 10;

    const response = await fetch(
      `${BASE}/api.php?amount=${amount}&category=${category}&type=${typeAnswer}&difficulty=${difficultyAnswer}`
    );

    const data = await response.json();
    const questions = data["results"].map((question) =>
      Question.fromJson(question)
    );

    return questions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {
  getCategories,
  getDifficultiesAnswers,
  getTypesAnswers,
  generateTrivia,
};
