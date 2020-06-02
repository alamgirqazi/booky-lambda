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
    const UserBook = require("./models/userBooks.model.js");

    const body = JSON.parse(event.body);

    const goodreads_id = body.goodreads_id;
    const user_id = body.user_id;

    const result = await UserBook.findOne({
      user_id: user_id,
      goodreads_id: goodreads_id,
    });
    let finalDate = null;
    if (body.reading_status === "read") {
      finalDate = body.reading_finish_date;
    }

    if (!result) {
      const timeline = {
        status: body.reading_status,
        date: finalDate,
      };
      body.timeline = [];
      body.timeline.push(timeline);
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
      const timeline = result["timeline"];

      const timelineObj = {
        status: body.reading_status,
        date: finalDate,
      };
      timeline.push(timelineObj);
      const updates = {
        reading_status: body.reading_status,
        timeline,
      };

      // this means the book already exist so just update
      const finalresult = await UserBook.updateOne(
        {
          user_id: user_id,
          goodreads_id: goodreads_id,
        },
        {
          $set: updates,
          // $push: {
          //   timeline: timelineObj,
          // },
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
