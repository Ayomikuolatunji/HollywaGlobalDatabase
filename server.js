const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));





app.use(cors());





app.listen(8080, () => {
    console.log("Server is running on port 8080");
})