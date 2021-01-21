import knex from "knex";
import {database,password} from "../config";
const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: password,
    database: database,
    port: 3306,
  },
  useNullAsDefault: true,
});

export default db;
