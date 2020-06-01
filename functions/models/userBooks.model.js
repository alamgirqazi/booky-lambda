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
  reading_status: {
    type: String,
  },
  reading_finish_date: {
    type: Date,
  },
  published: {
    type: Object,
  },
  timeline: {
    type: [{}],
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
  UserBook = mongoose.model("UserBook");
} else {
  UserBook = mongoose.model("UserBook", UserBookSchema);
}

module.exports = UserBook;
