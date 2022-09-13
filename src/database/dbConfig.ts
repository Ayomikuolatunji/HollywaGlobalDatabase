import dotenv from "dotenv"

dotenv.config()

const config={
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB:process.env.DB_NAME,
  dialect:"mysql",
  pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000
  }
}

export default config;


// mysql://b881a8411f0503:11a77d9b@us-cdbr-east-06.cleardb.net/heroku_6951c5b574624ec?reconnect=true