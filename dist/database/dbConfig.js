"use strict";
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Ayoscript222@",
    DB: "crud",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
