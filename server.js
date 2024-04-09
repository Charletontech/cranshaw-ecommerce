const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const crypto = require("crypto");
const http = require("http");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const ORM = require("./CharlieDB");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser to parse form data
app.use(cookieParser());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "cranshaw",
});

app.get("/db-init", (req, res) => {
  var sql = 
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, regDate VARCHAR(15), fullName VARCHAR(255), phone VARCHAR(15), email VARCHAR(255), account VARCHAR(15), balance VARCHAR(255), dob VARCHAR(15), gender VARCHAR(15), password VARCHAR(255) )";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });

  connection.end();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "views", "login.html");
  res.sendFile(filePath);
});

app.get("/signup", (req, res) => {
  const filePath = path.join(__dirname, "views", "signup.html");
  res.sendFile(filePath);
});

app.post("/signup", (req, res) => {
  var { fName, phone, dob, gender, email, password } = req.body 
 
  //split full name
  var [firstN, middleN, lastN] = [...fName.split(' ')]

  //LOGIC TO HASH PASSWORD
  const hash = crypto.createHash('sha256');
  hash.update(dob);
  const hashedPassword = hash.digest('hex');

   //logic to convert date to required format
  dob = new Date(dob).toISOString();

  //logic to check if user already exists
  checkUser() 
  function checkUser() {
    var sql = ORM.select('*', 'users', 'phone', `${phone}`)
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        generateToken();
      } else {
        req.send('User already exist! Please log in.')
      }
    })
  }

  //logic to generate password
  const generateToken = async () => {
    try {
      const payLoad = {
        clientKey: process.env.CLIENT_KEY,
        clientSecret: process.env.CLIENT_SECRET,
        clientId: process.env.CLIENT_ID,
        rememberMe: true
      };
  
      const response = await axios.post('http://196.46.20.83:3021/clients/v1/auth/_login', payLoad);
      //console.log(response.data);
      generateWalletAccount(response.data.token)
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };
  
  async function  generateWalletAccount(token) {
    try {
      var payLoad = {
        phoneNumber:  phone,
        firstName:  firstN,
        lastName: lastN ,
        middleName: middleN ,
        gender: gender ,
        dateOfBirth: dob,
        productCode: 214,
        email: email,
        type: 1
      }

      var response = await axios.post('http://196.46.20.83:3021/clients/v1/accounts')
      console.log(response.data);
      addUserToDatabase(response.data.account)
    } catch (err) {
      console.error(err);
    }
  }

  //logic to add user to DB
  async function addUserToDatabase(walletNo) {
    //get current date
    var date = new Date().getDate() + '/'  + parseFloat(new Date().getMonth() + 1) + '/' + new Date().getFullYear()
    var sql = ORM.insert('users', ['regDate', 'fullName', 'phone', 'email', 'account', 'balance', 'dob', 'gender', 'password'])
    var value = [date, fName, phone, email, walletNo, '0.00', dob, gender, hashedPassword]
    connection.query( sql, value, (err, result) => {
      if (err) throw err
      console.log(result);
    })
  }

  res.status(200).json("ok")

});


app.post('/login', (req,res) => {
  var {phone, password} = req.body;
  var sql = ORM.select('*', 'users');
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  connection.query(sql, (err, result) => {
    var user = result.find(each => {
      return each.phone == phone && each.password == each.hashedPassword
    }) 

    if (user) {
      //res.render('dashboard', {user})
      res.send(user)
    } else {
      res.send('Bad credentials: Your email or password is not correct.')
    }
   })
})


app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})


app.get("/get-all-products", (req, res) => {
  const products = [
    {
      id: 1,
      Name: "Nike Air",
      img: "img/Screenshot_20240324-140030.jpg",
      price: "N 10,000",
      category: "Shoes",
      qty: 1,
    },
    {
      id: 2,
      Name: "Headphone Pro",
      img: "img/Screenshot_20240324-135928.jpg",
      price: "N 15,000",
      category: "Gadgets",
      qty: 1,
    },
    {
      id: 3,
      Name: "Headphone Max",
      img: "img/Screenshot_20240324-135928.jpg",
      price: "N 20,000",
      category: "Gadgets",
      qty: 1,
    },
  ];

  res.json(products);
});

var uni = "\u{1F680}";
app.listen(5000, () => {
  console.log(`Cranshaw at port 5000...${uni}`);
});
