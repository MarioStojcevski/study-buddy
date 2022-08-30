import { pgsql } from "../config/db";

async function findAll(): Promise<any> {
  return await 
    pgsql("category")
    .select("*");
}

async function findById(id: number): Promise<any> {
  return await 
    pgsql("category")
    .where("id", id)
}

async function add(category: any): Promise<any> {
  return await
    pgsql("category")
    .insert({
      parent_category_id: category.parent_category_id,
      name: category.name,
      description: category.description
    })
    .returning("*");
}

async function update(category: any): Promise<any> {
  return await
    pgsql("category")
    .where("id", category.id)
    .update({
      parent_category_id: category.parent_category_id,
      name: category.name,
      description: category.description
    })
    .returning("*");
}

async function _delete(id: number): Promise<any> {
  return await
    pgsql("category")
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