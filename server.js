const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');

const app=express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));





app.use(cors());

app.use("/v1",router)





app.listen(8080, () => {
    console.log("Server is running on port 8080");
})