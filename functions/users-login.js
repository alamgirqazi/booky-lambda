// connection to mongoose
const mongoose = require("mongoose");
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

const mongoCon = process.env.mongoCon;

const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

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
      // useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    const Users = require("./models/users.model.js");

    const body = JSON.parse(event.body);

    const email = body.email;

    // lets check if email exists

    const result = await Users.findOne({ email: email });
    if (!result) {
      // this means result is null
      const response = {
        message: "This user doesnot exists. Please signup first",
        code: 401,
      };

      return {
        statusCode: 401,
        headers: headers,
        body: JSON.stringify(response),
      };
    } else {
      // email did exist
      // so lets match password

      if (bcrypt.compareSync(body.password, result.password)) {
        // great, allow this user access

        result.password = undefined;

        const token = jsonwebtoken.sign(
          {
            data: result,
            role: "User",
          },
          process.env.JWT_KEY,
          { expiresIn: "7d" }
        );

        const response = {
          token: token,
          message: "Success",
          code: 200,
        };
        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify(response),
        };
      } else {
        const response = {
          message: "Email or Password do not match",
          code: 401,
        };
        return {
          statusCode: 401,
          headers: headers,
          body: JSON.stringify(response),
        };
      }
    }
  } catch (ex) {
    return {
      statusCode: 401,
      headers: headers,
      body: JSON.stringify(ex),
    };
  }
};
