const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://suryawebdev23:yamaha8215@cluster0.9f3tgtl.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);
const account = mongoose.model("Account", accountSchema);
module.exports = {
  user,
  account,
};
