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

export default {
  findAll,
  findById
};