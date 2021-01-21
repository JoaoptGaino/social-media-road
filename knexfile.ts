import path from 'path';
import {database,password} from "./src/config";
module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: password,
    database: database,
    port: 3306,
  },
  migrations:{
    directory:path.resolve(__dirname,'src','Database','migrations'),
  },
  useNullAsDefault:true,
};
