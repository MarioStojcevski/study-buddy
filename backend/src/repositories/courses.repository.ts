import { pgsql } from "../config/db";

async function findAll(): Promise<any> {
  return await 
    pgsql("course")
    .select("*");
}

async function findById(id: number): Promise<any> {
  return await 
    pgsql("course")
    .where("id", id)
}

async function add(course: any): Promise<any> {
  return await
    pgsql("course")
    .insert({
      name: course.name,
      points: course.points,
      description: course.description,
      price: course.price
    })
    .returning("*");
}

async function update(course: any): Promise<any> {
  return await
    pgsql("course")
    .where("id", course.id)
    .update({
      name: course.name,
      points: course.points,
      description: course.description,
      price: course.price
    })
    .returning("*");
}

async function _delete(id: number): Promise<any> {
  return await
    pgsql("course")
    .where("id", id)
    .delete()
    .returning("*")
}

export default {
  findAll,
  findById,
  add,
  update,
  _delete
};