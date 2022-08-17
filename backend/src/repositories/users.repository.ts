import { pgsql } from "../config/db";

async function findAll(): Promise<any> {
  return await 
    pgsql("user")
    .select("*");
}

async function findById(id: number): Promise<any> {
  return await 
    pgsql("user")
    .where("id", id)
}

export default {
  findAll,
  findById
};