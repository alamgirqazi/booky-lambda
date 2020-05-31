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
  console.log("nicee");
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
    const UserBook = require("./models/userBooks.model.js");

    const body = JSON.parse(event.body);

    const goodreads_id = body.goodreads_id;
    const user_id = body.user_id;

    const result = await UserBook.findOne({
      user_id: user_id,
      goodreads_id: goodreads_id,
    });
    console.log(result);

    if (!result) {
      const userBook = new UserBook(body);
      const saved = await userBook.save();
      const response = {
        message: "Success",
        code: 200,
      };

      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(response),
      };
    } else {
      const updates = {
        reading_status: body.reading_status,
      };
      // this means the book already exist so just update
      console.log("iska kuch krte");
      const result = await UserBook.updateOne(
        {
          user_id: user_id,
          goodreads_id: goodreads_id,
        },
        {
          $set: updates,
        },
        {
          upsert: true,
          runValidators: true,
        }
      );
      const response = {
        message: "Success",
        code: 200,
      };
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(response),
      };
    }
  } catch (ex) {
    console.log("ex", ex);
    return {
      statusCode: 401,
      headers: headers,
      body: JSON.stringify(ex),
    };
  }
};
