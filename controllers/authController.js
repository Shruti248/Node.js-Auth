const User = require('../models/User');

// Handle Erros
const handleErros = (err) => {
    // err.code will be useful for the unique property of the email , else the value is undefined
    console.log(err.message , err.code);

    let errors = {email : '' , password : ''};

    // duplicate error.code
    if(err.code == 11000){
        errors.email = 'Email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        // console.log(err);
        // Observer the err in console first 
        // we want the err overall object , then the errors object inside the err and then we want values of the properties(Object.values)
        // We ultimately require the properties as that is what we want to print
        // console.log(Object.values(err.errors));

        // the result is array of value , therefore...
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties);
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

module.exports.signup_get = (req , res) => {
    res.render('signup');
}
module.exports.login_get = (req , res) => {
    res.render('login');
}
module.exports.signup_post = async (req , res) => {
    const {email , password} = req.body;

    try{
        const user = await User.create({
            email,password
        })
        res.status(201).json({user});
    }catch(err){
        const errors =  handleErros(err);
        res.status(400).json({errors});
    }

}
module.exports.login_post = async (req , res) => {
    const {email , password} = req.body;
    res.send('User login ')
}  