// added default because otherwise It wouldn't work
// connection to mongoose
const mongoose = require("mongoose");

const mongoCon = process.env.mongoCon;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

const Users = require("./models/users.model.js");
const bcrypt = require("bcryptjs");

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
      headers: headers,
      body: "This was a preflight call!",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: headers, body: "Method Not Allowed" };
  }

  try {
    mongoose.connect(mongoCon, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    const body = JSON.parse(event.body);

    // there must be a password in body

    // we follow these 2 steps

    const password = body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    body.password = hash;
    const user = new Users(body);

    const result = await user.save();
    const message = "Signup successful";
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(message),
    };
  } catch (ex) {
    console.log("ex", ex);
    if (ex.code === 11000) {
      const error = "This email has been registered already";
      return {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify(error),
      };
    } else {
      return {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify(ex),
      };
    }
  }
};
