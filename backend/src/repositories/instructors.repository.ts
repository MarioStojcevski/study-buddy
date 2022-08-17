import { pgsql } from "../config/db";

async function findAll(): Promise<any> {
  return await 
    pgsql("instructor")
    .select("*");
}

async function findById(id: number): Promise<any> {
  return await 
    pgsql("instructor")
    .where("id", id)
}

export default {
  findAll,
  findById
};