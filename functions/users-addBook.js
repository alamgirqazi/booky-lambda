// connection to mongoose
const mongoose = require("mongoose");
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

const mongoCon = process.env.mongoCon;

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

    const result = await Users.findOne({ id: user_id });
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
    }
  } catch (ex) {
    return {
      statusCode: 401,
      headers: headers,
      body: JSON.stringify(ex),
    };
  }
};
