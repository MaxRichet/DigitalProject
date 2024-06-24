const User = require("../models/userModel.js");
const Student = require("../models/studentModel.js");
const Company = require("../models/companyModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10;

/****************** REGISTER A USER ******************/
/* 
    This function allow a user to create an account

    Checking :
        - Check if the email isn't already in db
        - The user can choice if he create a company account or student account

*/

exports.userRegister = async (req, res) => {
    try {
        const checkEmail = await User.findOne({ where : { email: req.body.email } });
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const hashPass = await bcrypt.hash(req.body.password, saltRounds);
        if(!regex.test(req.body.email)) {
            return res.status(409).json({ message : "L'email n'a pas le bon format." })
        }

        if(checkEmail == null){
            await User.create({...req.body, password: hashPass, exist: true});
            res.status(201).json({message: 'Votre compte a bien été créé.'});
        } else {
            res.status(401).json({message: "Un compte est déjà lié à cet email."});
        }
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de votre compte.', err });
    }
}

exports.companyRegister = async (req, res) => {
    try {
        const checkCompany = await Company.findOne({ where : { name: req.body.name } });
        const user = await User.findOne({ where: { id: req.body.id } });
        if(checkCompany){
            await user.update({
                company_id: checkCompany.id,
                role: 'company'
            });
        } else {
            let newCompany = await Company.create(req.body);
            await user.update({
                company_id: newCompany.id,
                role: 'company'
            });
        }
        res.status(201).json('Votre compte a bien été créé.');
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de votre compte.', err });
    }
}

exports.studentRegister = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.body.id } });
        let newStudent = await Student.create(req.body);
        await user.update({
            student_id: newStudent.id,
            role: 'student'
        });
        res.status(201).json('Votre compte a bien été créé.');
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de votre compte.', err });
    }
}

/****************** CONNECT A USER ******************/
/* 
    This function allow a user to connect him to his account

    Checking :
        - Check if the email and password is in db

*/
exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if(!user)
            return res.status(404).json({ message: 'Aucun compte ne correspond à cet email.' });
        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if(user.email === req.body.email && comparePass) {
            const userData = {
                id: user.id,
                role: user.role,
                student_id: user.student_id,
                company_id: user.company_id
            }
            const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: '10d' });
            res.status(201).json({ message: 'Connecté.', token });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du traitement des données.', err });
    }
}

/****************** GET A USER ******************/
/* 
    This function allow a user to get his informations

    Checking :
        - Check if the user exist

*/
exports.userGet = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable.' });
        }
        if(user.company_id == null){
            const student = await Student.findOne({ where: { id: req.user.student_id } });
            res.status(201).json({user, student});
        } else {
            const company = await Company.findOne({ where: { id: req.user.company_id } });
            res.status(201).json({user, company});
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du traitement des données.', err });
    }
}

/****************** MODIFY A USER ******************/
/* 
    This function allow a user to modify his informations

    Checking :
        - Check if the user exist
        - Check if the user is a student or a company for update the right informations

*/
exports.userModify = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if(!user){
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        if(user.role == "company") {
            const company = await Company.findOne({ where: { id: req.user.company_id } });
            await user.update({ 
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                post: req.body.post,
                phone: req.body.phone,
                gender: req.body.gender
            });
            await company.update({ 
                name: req.body.name,
                size: req.body.size,
                siret: req.body.siret
            });
        } else if(user.role == "student") {
            const student = await Student.findOne({ where: { id: req.user.student_id } });
            await user.update({ 
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                gender: req.body.gender
            });
            await student.update({
                school: req.body.school,
                social: req.body.social,
                portfolio: req.body.portfolio
            });
        }

        
        res.status(201).json({ message: 'Vos informations ont bien été mises à jour.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};

/****************** DELETE A USER ******************/
/* 
    This function allow a user to delete his account

    Checking :
        - Check if the user exist

*/
exports.userDelete = async (req, res) => {
    try {
        const deleteUser = await User.destroy({ 
            where: { id: req.user.id } 
        });

        if(!deleteUser) {
            return res.status(404).json({ message: 'Utilisateur introuvable.' });
        }
        res.status(201).json({ message: 'Votre compte a bien été supprimé.' });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors du traitement des données." });
    }
}