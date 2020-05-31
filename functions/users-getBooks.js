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

  if (event.httpMethod !== "GET") {
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
    const UserBook = require("./models/userBooks.model.js");

    const user_id = event.queryStringParameters.user_id;

    const result = await UserBook.find({
      user_id: user_id,
    });
    const response = {
      message: "Success",
      code: 200,
      data: result,
    };
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(response),
    };
  } catch (ex) {
    console.log("ex", ex);
    return {
      statusCode: 401,
      headers: headers,
      body: JSON.stringify(ex),
    };
  }
};
