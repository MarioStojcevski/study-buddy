import { pgsql } from "../config/db";

async function findAll(): Promise<any> {
  return await 
    pgsql("instructor as i")
    .join("view_list_all_users as u", "u.id", "i.userid")
    .select("*");
}

async function findById(id: number): Promise<any> {
  return await 
  pgsql("instructor as i")
  .join("view_list_all_users as u", "u.id", "i.userid")
  .select("*")
  .where("i.id", id);
}

async function add(instructorUser: any): Promise<any> {
  return await
    pgsql.raw(`call insertinstructor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [
      instructorUser.first_name,
      instructorUser.last_name,
      instructorUser.email,
      instructorUser.password,
      instructorUser.sex,
      instructorUser.age,
      instructorUser.created_by_admin,
      instructorUser.salary,
      instructorUser.title,
      instructorUser.description
    ]);
}

async function update(instructorUser: any): Promise<any> {
  return await
    pgsql.raw(`call updateinstructor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [
      instructorUser.instructorid,
      instructorUser.userid,
      instructorUser.first_name,
      instructorUser.last_name,
      instructorUser.email,
      instructorUser.password,
      instructorUser.sex,
      instructorUser.age,
      instructorUser.salary,
      instructorUser.title,
      instructorUser.description
    ]);
}

async function _delete(id: number): Promise<any> {
  return await
    pgsql("instructor")
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