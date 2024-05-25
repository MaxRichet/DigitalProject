const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();

/****************** REGISTER A USER ******************/
/* 
    This function allow a user to create an account

    Checking :
        - Check if the email isn't already in db

*/

exports.userRegister = async (req, res) => {
    try {
        console.log('1');
        const checkEmail = await User.findOne({ where : { email: req.body.email } });
        console.log('2');
        if(checkEmail)
            return res.status(409).json({ message : 'Cet email existe déjà.' });
        console.log('3');
        let newUser = await User.create(req.body);

        res.status(201).json({ message : `Votre compte a bien été créé.` });
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de votre compte.', err })
    }
}
