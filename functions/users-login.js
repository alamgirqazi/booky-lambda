// added default because otherwise It wouldn't work
// connection to mongoose
const mongoose = require("mongoose");

const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: false,
});

const Users = require("./models/users.model.js");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);

    const email = body.email;

    // lets check if email exists

    const result = await Users.findOne({ email: email });
    if (!result) {
      // this means result is null
      const error = "This user doesnot exists. Please signup first";
      return {
        statusCode: 401,
        body: JSON.stringify(error),
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

        // res.send({ message: "Successfully Logged in", token: token });
        return {
          statusCode: 200,
          body: JSON.stringify("response"),
        };
      } else {
        console.log("password doesnot match");

        // res.status(401).send({ message: "Wrong email or Password" });

        return {
          statusCode: 401,
          body: JSON.stringify("response"),
        };
      }
    }
  } catch (ex) {
    console.log("ex", ex);
  }
};
