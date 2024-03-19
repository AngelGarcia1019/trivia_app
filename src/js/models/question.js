class Question {
  constructor({
    type = "",
    difficulty = "",
    category = "",
    question = "",
    correct_answer = "",
    incorrect_answers = [],
  }) {
    this.type = type;
    this.difficulty = difficulty;
    this.category = category;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
    this.points = 100;
  }

  static fromJson(json) {
    return new Question({
      type: json["type"],
      difficulty: json["difficulty"],
      category: json["category"],
      question: json["question"],
      correct_answer: json["correct_answer"],
      incorrect_answers: json["incorrect_answers"],
    });
  }
}

export default Question;
