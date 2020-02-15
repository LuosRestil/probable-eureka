require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

var corsOptions = {
  origin: "https://brian-smith-portfolio.herokuapp.com",
  optionsSuccessStatus: 200
};

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

app.post("/email", cors(corsOptions), (req, res) => {
  var mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: req.body.subject,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send(info);
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
