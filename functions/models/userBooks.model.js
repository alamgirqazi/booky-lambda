const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserBookSchema = new Schema({
  title: {
    type: String,
  },
  user_id: {
    type: String,
  },
  author: {
    type: String,
  },
  goodreads_id: {
    type: String,
  },
  goodreads_average_rating: {
    type: String,
  },
  image_url: {
    type: String,
  },
  small_image_url: {
    type: String,
  },
  published: {
    type: Object,
  },

  is_deleted: {
    type: Boolean,
    default: false,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

var UserBook;

if (mongoose.models.UserBook) {
  User = mongoose.model("UserBook");
} else {
  User = mongoose.model("UserBook", UserBookSchema);
}

module.exports = UserBook;
