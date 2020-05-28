const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },

  public_visible: {
    type: Boolean,
    default: false,
  },

  is_deleted: {
    type: Boolean,
    default: false,
  },
});

// User.plugin(mongoosePaginate);

User.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = users = mongoose.model("User", User);
