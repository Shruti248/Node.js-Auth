const mongoose = require("mongoose");
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

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

// Mongoose hook is a special function that fires after a certian mongoose event happens. 
// Eg : a mongoose hoook that is fired after the doc is saved , deleted to db 

// fire a function after(post) the doc is saved to db
// userSchema.post('save' , function(doc , next){
//     console.log('New User was created and saved' , doc);
//     next();
// })

// fire a function before(pre) the doc is saved to db
// userSchema.pre('save' , function(next) {
//     // this : will create local instance before it is saved to db 
//     console.log('User about to be created & saved' , this);
//     next();
// })

// The pre hook is used to hash the passwords before it is saved to the db 
// Refer : https://dev.to/sahilthakur7/pre-and-post-hooks-in-mongoose-16be

// Hashing Using Bcrypt
// 2 ways 
// 1) Password --- Hashing Algorithm --- Hashed Algo
// 2) Salt + Password --- Hashing Algorithm -- Hashed algo considering the whoe string salt and the original password (More Safe)

userSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password  , salt);
    next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;
