const mongoose = require("mongoose");
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // Custom error Messages for the different conditions
    // required : [if true , else print error message]
    required: [true, "Please enter an email"],
    // unique: [true , "Email is already taken"], 
    // cannot do this customer validation like other fields , therefire handle error code
    unique:true,
    lowercase: true,
    // custom validation using regExp or third party validation package(using validator package)
    validate: [isEmail , "Please enter a valid Email"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Minimum password length is 6 characters"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
