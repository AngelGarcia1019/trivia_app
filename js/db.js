class DB {
  constructor(params) {
    this.keyQuestions = "questions";
    this.keyCategory = "category";
    this.keyTypeAnswers = "typeAnswer";
    this.keyScore = "score";
    this.keyDifficultyAnswer = "difficultyAnswer";
    this.questions = this.readTrivia();
  }

  saveTrivia = (questions = []) =>
    localStorage.setItem(this.keyQuestions, JSON.stringify(questions));

  readTrivia = () =>
    JSON.parse(localStorage.getItem(this.keyQuestions) ?? "[]");

  saveCategory = (category = "") =>
    localStorage.setItem(this.keyCategory, category);

  saveTypeAnswers = (typeAnswers = "") =>
    localStorage.setItem(this.keyTypeAnswers, typeAnswers);

  saveDifficultyAnswer = (difficultyAnswer = "") =>
    localStorage.setItem(this.keyDifficultyAnswer, difficultyAnswer);

  saveScore = (score = 0) => localStorage.setItem(this.keyScore, score);

  readTypeAnswer = () => localStorage.getItem(this.keyTypeAnswers);

  readScore = () => localStorage.getItem(this.keyScore);
}

export default DB;
