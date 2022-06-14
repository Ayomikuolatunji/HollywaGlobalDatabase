const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const api = require('./services/v1Api');

const app=express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));





app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use('/api/',api)



app.use((error, req, res, next) => {
    console.log(error.message);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message ,status});
});




app.listen(8080, () => {    
        sequelize.authenticate().then(()=>{
            console.log('Connection has been established successfully.');
        })
        .catch(err=>{
            console.error('Unable to connect to the database:',err.message);
        })
    console.log("Server is running on port 8080");
})