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
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;

require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser to parse form data
app.use(cookieParser());
app.use(bodyParser.json());



const connection = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  port: 3306,
  database: `${process.env.DATABASE}`,
});


// Cloudinary configuration
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});


app.get("/db-init", (req, res) => {
  var sql =
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, regDate VARCHAR(15), fullName VARCHAR(255), phone VARCHAR(15), email VARCHAR(255), account VARCHAR(15), balance VARCHAR(255), dob VARCHAR(15), gender VARCHAR(15), password VARCHAR(255) )";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });

  var sql =
    "CREATE TABLE IF NOT EXISTS transactions (orderID INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(15), date VARCHAR(15), total VARCHAR(20), cart VARCHAR(65550) )  ";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });


  var sql =
    "CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), img VARCHAR(255), price VARCHAR(255), category VARCHAR(255), qty VARCHAR(255) )";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  
  // connection.end();
  res.send("Database initialization completed");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "views", "login.html");
  res.sendFile(filePath);
});

app.get("/login-to-create-session", (req, res) => {
  const filePath = path.join(__dirname, "views", "login2.html");
  res.sendFile(filePath);
});


app.get("/signup", (req, res) => {
  const filePath = path.join(__dirname, "views", "signup.html");
  res.sendFile(filePath);
});

app.post("/signup", (req, res) => {
  var { fName, phone, dob, gender, email } = req.body;
  //split full name
  var [firstN, middleN, lastN] = [...fName.split(" ")];

  //LOGIC TO HASH PASSWORD
  const hash = crypto.createHash("sha256");
  hash.update(dob);
  const hashedPassword = hash.digest("hex");

  //logic to convert date to required format
  var convertedDate = new Date(dob).toISOString();

  //logic to check if user already exists
  checkUser();
  function checkUser() {
    var sql = ORM.select("*", "users", "phone", `${phone}`);
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        generateToken();
      } else {
        res.send("User already exist! Please log in.");
      }
    });
  }

  //logic to generate password
  const generateToken = async () => {
    try {
      const payLoad = {
        clientKey: process.env.CLIENT_KEY,
        clientSecret: process.env.CLIENT_SECRET,
        clientId: process.env.CLIENT_ID,
        rememberMe: true,
      };

      const response = await axios.post(
        "http://196.46.20.83:3021/clients/v1/auth/_login",
        payLoad
      );
      generateWalletAccount(response.data.token);
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  async function generateWalletAccount(token) {
    try {
      var payLoad = {
        phoneNumber: phone,
        firstName: firstN,
        lastName: lastN,
        middleName: middleN,
        gender: gender,
        dateOfBirth: convertedDate,
        productCode: "214",
        email: email,
        type: 1,
      };

      var response = await axios.post(
        "http://196.46.20.83:3021/clients/v1/accounts",
        payLoad,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.account) {
        addUserToDatabase(response.data.account);
        console.log(response.data);
      } 
 
    } catch (err) {
      if (err) {
        res.status(500).json("failed");
        return
      }
      console.error(err);
    }
  }

  //logic to add user to DB
  async function addUserToDatabase(walletNo) {
    //get current date
    var date =
      new Date().getDate() +
      "/" +
      parseFloat(new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
    var sql = ORM.insert("users", [
      "regDate",
      "fullName",
      "phone",
      "email",
      "account",
      "balance",
      "dob",
      "gender",
      "password",
    ]);
    var value = [
      date,
      fName,
      phone,
      email,
      walletNo,
      "0.00",
      dob,
      gender,
      hashedPassword,
    ];
    connection.query(sql, value, (err, result) => {
      if (err) throw err;
      res.status(200).json("ok");
    });
  }
});



app.post("/login", (req, res) => {
  var { phone, password } = req.body; 
  var sql = ORM.select("*", "users");
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  connection.query(sql, (err, result) => {
    if (err) throw err;
    var user = result.find((each) => {
      return each.phone == phone && each.password == hashedPassword;
    });

    if (user) {
      var sql = ORM.select("*", "transactions", "user", user.phone);
      connection.query(sql, (err, result) => {
        res.render("dashboard", { user, result });
      });
    } else if (phone ==  `${process.env.ADMIN_PHONE}` && password == `${process.env.ADMIN_PASS}`) {
      res.redirect('/admin')
    } else {
      res.send("Bad credentials: Your email or password is not correct.");
    }
  });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

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
  ];

  var sql = ORM.select('*', 'products');
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  })
});

app.post("/transaction-history", (req, res) => {
  var userId = req.body.userId;
  var sql = ORM.select("*", "transactions", "user", userId);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});



app.post("/get-user-balance", (req, res) => {
  var { userId } = req.body;
  // var cookieOptions = {
  //   maxAge: 900000,
  //   httpOnly: true,
  // };
  // res.cookie("userIdCookie", userId, cookieOptions);
  var sql = ORM.select("balance", "users", "phone", userId);
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.status(200).json(result[0]);
  });
});



app.post("/checkout", (req, res) => {
  // var userIdCookie = req.cookies.userIdCookie;
  var {cart, id} = req.body;  
  var date =
      new Date().getDate() +
      "/" +
      parseFloat(new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
  var total = calcTotal();
  function calcTotal() {
    var total = 0;
    cart.forEach(({ price, qty }) => {
      var subTotal = price * qty;
      total = total + subTotal;
    });
    total < 0 ? (total = 0) : total;
    return total;
  }

  //debit user
  var sql = ORM.select('balance', 'users', 'phone', id)
  connection.query(sql, (err, result) => {
    if (err) throw err;

    //check if balance is enough
    if (parseFloat(result[0].balance) < parseFloat(total)) {
      res.status(402).json("insufficient funds");
      return
    }else{
      var newBalance = parseFloat(result[0].balance) - parseFloat(total)
      var sql = ORM.update('users', 'balance', newBalance, 'phone', id)
      connection.query(sql, (err, result) => {
        if (err) throw err;
      });
      addToTransactionHistory()
    }
  });

  //Add to transactions list/history
  function addToTransactionHistory() {
    cart = JSON.stringify(cart); 
    var columns = ['user', 'date', 'total', 'cart']
    var values = [id, date, total, cart]
    sql = ORM.insert('transactions', columns )
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
    });
    res.status(200).json("ok");
  }
  
});


app.post("/create-checkout-session", (req, res) => {
  var { phone, password } = req.body;
  var sql = ORM.select("*", "users");
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  
  connection.query(sql, (err, result) => {
    if (err) throw err;
    var user = result.find((each) => {
      return each.phone == phone && each.password == hashedPassword;
    });
    if (user) {
      var userId = user.phone
      res.render('checkout', {userId})
    }else {
      res.send("Bad credentials: Your email or password is not correct.");
    }
  })

  
});


//admin routes
app.get('/admin', (req, res) => {
  var allTransactions = [];
  var sql = ORM.select('*','transactions')
  connection.query(sql, (err, result) => {
    if (err) throw err;
    allTransactions = result
    var sql = ORM.select('*','users')
   connection.query(sql, (err, result2) => {
    var users = result2
    if (err) throw err;
    res.render('admin', {allTransactions, users})
   })
  })
})


app.post('/add-product', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).send('Internal Server Error (formidable)');
      return;
    }
  
    try {
      const result = await cloudinary.uploader.upload(files.productImage.filepath, {
        fetch_format: 'auto',
        folder: 'cranshaw',
        quality: 'auto'
      });

      var productImageUrl = result.secure_url;
      var { productName, price, category, qty } = fields;
      var sql = ORM.insert('products', ['Name', 'img', 'price', 'category', 'qty'])
      connection.query(sql, [productName, productImageUrl, price, category, qty ], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.sendStatus(200);
      })

      // The optimized image URL will be available in result.secure_url
      console.log('Uploaded image URL:', result.secure_url);
      // Handle other form fields as needed
      console.log('Other form fields:', fields);

    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      res.status(500).send('Internal Server Error (Cloudinary)');
    }
  });
});








var uni = "\u{1F680}";
app.listen(3306, () => {
  console.log(`Cranshaw at port 5000...${uni}`);
});
