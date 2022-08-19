class Course {
  id: number;
  name: string;
  points: number;
  description: string;
  price: number;

  constructor(id: number, name: string, points: number, description: string, price: number) {
    this.id = id;
    this.name = name;
    this.points = points;
    this.description = description;
    this.price = price;
  }
}

export default Course;