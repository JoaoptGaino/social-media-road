import knex from "knex";
import config from "../config/config";
const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: config.password,
    database: config.database,
    port: 3306,
  },
  useNullAsDefault: true,
});

export default db;
