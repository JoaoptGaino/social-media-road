import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("reactions", (table) => {
    table.increments("id").primary();
    table
      .integer("post_id")
      .notNullable()
      .references("id")
      .inTable("posts")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("reactions");
}
