const config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "Ayoscript222@",
  DB: process.env.DB_NAME || "carStores",
  dialect: "mysql",
  port:process.env.DB_PORT|| "3306",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default config;
