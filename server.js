const express = require('express');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;

// db config
const dbConfig = require('./config/database');

// DB connection
mongoose.connect(dbConfig.url,{useCreateIndex: true,useNewUrlParser: true});
const db = mongoose.connection;
// On connection
mongoose.connection.on('connected', () => {
    console.log("Database connected successfully "+dbConfig.url);  
})
// On Error
mongoose.connection.on('error', (err) => {
    console.log("Database Error "+err);   
})

const app = express();

// CORS INIT
app.use(cors());

// body-parser
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// set Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use("/resume/", express.static(__dirname + '/uploads/resumes'));

const fileUploadSrv = require('./routes/fileUpload.service');
const routes = require('./routes/routes');

app.get('/',(req, res) => {
    res.send("Invalid route");
})

app.use('/api',routes);
app.use('/api/profile',fileUploadSrv);

// Start Server
app.listen(PORT, () => {
    console.log("Server Started on Port: ",PORT);
    
})