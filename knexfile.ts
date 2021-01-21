import path from 'path';
module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "social_media",
    port: 3306,
  },
  migrations:{
    directory:path.resolve(__dirname,'src','database','migrations'),
  },
  useNullAsDefault:true,
};
