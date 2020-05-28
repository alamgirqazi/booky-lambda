const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

var User;

if (mongoose.models.User) {
  User = mongoose.model("User");
} else {
  User = mongoose.model("User", UserSchema);
}

module.exports = User;

// module.exports = users = mongoose.model("User", UserSchema);
