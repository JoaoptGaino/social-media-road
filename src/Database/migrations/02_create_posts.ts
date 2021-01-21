import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("post").notNullable();
    table.integer("user_id").unsigned().references("id").inTable("users")
    table
      .timestamp("created")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("posts");
}
