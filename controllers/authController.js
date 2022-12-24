const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Handle Erros
const handleErros = (err) => {
  // err.code will be useful for the unique property of the email , else the value is undefined
  console.log(err.message, err.code);

  let errors = { email: "", password: "" };

  //   incorrect error
  if(err.message === 'Incorrect Email'){
    errors.email = 'Email is not registered';
  }

//   incorrect password 
  if(err.message === 'Incorrect Password'){
    errors.password = 'Incorrect password';
  }

  // duplicate error.code
  if (err.code == 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    // Observer the err in console first
    // we want the err overall object , then the errors object inside the err and then we want values of the properties(Object.values)
    // We ultimately require the properties as that is what we want to print
    // console.log(Object.values(err.errors));

    // the result is array of value , therefore...
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; //3 days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email,
      password,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge /**in seconds */ * 1000 /**cookies are in ms */,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErros(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge /**in seconds */ * 1000 /**cookies are in ms */,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErros(err);
    res.status(400).json({errors});
  }
};


module.exports.logout_get = (req , res) => {
  //delete the jwt cookie to log out -- this cannot be done
  // therefore -- replace it with the blank cookie and very short expiry date

  res.cookie('jwt' , '' , {maxAge:1/** ms */})
  // redirectto home page , once it is logged out
  res.redirect('/');
}