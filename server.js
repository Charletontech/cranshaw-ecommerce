const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const crypto = require('crypto');
const http = require('http');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser to parse form data
app.use(cookieParser());
app.use(bodyParser.json());

// app.use(session({
//   secret: 'mysecret', 
//   resave: false, 
//   saveUninitialized: true ,
//   cookie: {
//     sameSite:'lax'
//   }
// }));

// const connection = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: "",
//       port: 3306,
//       database: "mobcare"
//     });


app.get('/', (req, res) => {
    res.render('index')
})


app.listen(5000, () => {
    console.log('Cranshaw at port 5000...');
})