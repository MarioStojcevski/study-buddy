import { pgsql } from "../config/db";

async function findAll(): Promise<any> {
  return await 
    pgsql("student")
    .select("*");
}

async function findById(id: number): Promise<any> {
  return await 
    pgsql("student")
    .where("id", id)
}

export default {
  findAll,
  findById
};