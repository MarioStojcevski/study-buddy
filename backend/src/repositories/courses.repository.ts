import { pgsql } from "../config/db";

async function selectAllCourses() {
  return await pgsql("course")
    .select("*");
}

export default {
  selectAllCourses
};