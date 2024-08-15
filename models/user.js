const mongoose = require("mongoose");

const applicatonSchema = new mongoose.Schema(
  {
    comapny: { type: String, required: true },
    title: String,
    status: {
      type: String,
      enum: ["interested", "applied", "interviewing", "rejected", "accepted"],
    },
    data: Date,
    notes: String,
    postingLink: String,
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicatonSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
