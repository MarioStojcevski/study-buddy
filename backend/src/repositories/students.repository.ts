import { pgsql } from "../config/db";

async function findAll(): Promise<any> {
  return await 
    pgsql("student as s")
    .join("view_list_all_users as u", "u.id", "s.userid")
    .select("*");
}

async function findById(id: number): Promise<any> {
  return await 
  pgsql("student as s")
  .join("view_list_all_users as u", "u.id", "s.userid")
  .select("*")
  .where("s.id", id);
}

async function add(studentUser: any): Promise<any> {
  return await
    pgsql.raw(`call insertstudent(?, ?, ?, ?, ?, ?, ?);`, [
      studentUser.first_name,
      studentUser.last_name,
      studentUser.email,
      studentUser.password,
      studentUser.sex,
      studentUser.age,
      studentUser.points
    ]);
}

async function update(studentUser: any): Promise<any> {
  return await
    pgsql.raw(`call updatestudent(?, ?, ?, ?, ?, ?, ?, ?, ?);`, [
      studentUser.studentid,
      studentUser.userid,
      studentUser.first_name,
      studentUser.last_name,
      studentUser.email,
      studentUser.password,
      studentUser.sex,
      studentUser.age,
      studentUser.points
    ]);
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