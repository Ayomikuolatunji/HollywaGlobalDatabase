const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');
const { sequelize } = require('./models');

const app=express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));





app.use(cors());






app.listen(8001, () => {
    sequelize.authenticate().then(()=>{
        console.log('Connection has been established successfully.');
    })
    .catch(err=>{
        console.error('Unable to connect to the database:',err.message);
    })
    
    console.log("Server is running on port 8080");
})