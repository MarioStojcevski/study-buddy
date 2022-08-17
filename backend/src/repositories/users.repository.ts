import { pgsql } from "../config/db";

async function findAll(): Promise<any> {
  return await 
    pgsql("user")
    .select("*");
}

async function findAllAdmins(): Promise<any> {
  return await 
    pgsql("admin as a")
    .select("*")
    .join("user as u", "a.userid", "u.id");
}

async function findById(id: number): Promise<any> {
  return await 
    pgsql("user")
    .where("id", id)
}

async function add(user: any): Promise<any> {
  return await
    pgsql("user")
    .insert({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      sex: user.sex,
      age: user.age
    })
    .returning("*");
}

async function update(user: any): Promise<any> {
  return await
    pgsql("user")
    .where("id", user.id)
    .update({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      sex: user.sex,
      age: user.age
    })
    .returning("*");
}

async function _delete(id: number): Promise<any> {
  return await
    pgsql("user")
    .where("id", id)
    .delete()
    .returning("*")
}

export default {
  findAll,
  findAllAdmins,
  findById,
  add,
  update,
  _delete
};