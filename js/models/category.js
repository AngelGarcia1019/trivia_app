class Category {
  constructor({ id = 0, name = "" }) {
    this.id = id;
    this.name = name;
  }

  static fromJson(json) {
    return new Category({ id: json["id"], name: json["name"] });
  }
}

export default Category;
