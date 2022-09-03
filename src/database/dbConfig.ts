const config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Ayoscript222@",
  DB: "carStores",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default config;
