import path from 'path';
import config from "./src/config/config";
module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: config.password,
    database: config.database,
    port: 3306,
  },
  migrations:{
    directory:path.resolve(__dirname,'src','Database','migrations'),
  },
  useNullAsDefault:true,
};
