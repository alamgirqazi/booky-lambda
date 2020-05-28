// added default because otherwise It wouldn't work
// connection to mongoose
const mongoose = require("mongoose");

const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Users = require("./models/users.model.js");
const bcrypt = require("bcryptjs");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
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
      body: JSON.stringify(message),
    };
  } catch (ex) {
    console.log("ex", ex);
    if (ex.code === 11000) {
      const error = "This email has been registered already";
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify(ex),
      };
    }
  }
};
