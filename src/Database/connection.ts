import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "social_media",
    port: 3306,
  },
  useNullAsDefault: true,
});

export default db;
