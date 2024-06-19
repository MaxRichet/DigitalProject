const Userapp = require('../models/userappModel.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/****************** CREATE A USER APPLICATION ******************/
/* 
    This function allow a student to create an application

    Checking :
        - Check if he's a student

*/
exports.userappCreate = async (req, res) => {
    try {
        let token = await req.headers['authorizationuserapp'];
        if(token !== undefined) {
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            })
            req.job = payload;

            try {
                await Userapp.create({...req.body, user_student_id: req.user.id, job_ad_id: req.job.id});
                res.status(201).json({ message: 'Candidature envoyé avec succès.' });
            } catch (err) {
                res.status(500).json({message: "Erreur serveur.", err});
            }
        } else {
            res.status(403).json({message: 'Token manquant.'});
        }
    } catch (err) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}

/****************** GET ALL USER APPLICATION ******************/
/* 
    This function allow a student to get all his user applications by his id

    Checking :
        - Check if he has a user application

*/
exports.userappGetAllStudent = async (req, res) => {
    try{
        const userapp = await Userapp.findAll({ where: { user_student_id: req.user.id } });

        if(!userapp) {
            return res.status(404).json({ message: 'Aucune candidature trouvée.' });
        }

        res.status(201).json(userapp);

    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du traitement des donnnées.' });
    }
}

/****************** GET ALL USER APPLICATION ******************/
/* 
    This function allow a company to get all his user applications by his job ad id

    Checking :
        - Check if he has a user application

*/
exports.userappGetAllCompany = async (req, res) => {
    try{
        const userapp = await Userapp.findAll({ where: { job_ad_id: req.params.idjobad } });

        if(!userapp) {
            return res.status(404).json({ message: 'Aucune candidature trouvée.' });
        }

        res.status(201).json(userapp);

    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du traitement des donnnées.' });
    }
}

/****************** MODIFY USER APPLICATION ******************/
/* 
    This function allow a student to modify his user application

    Checking :
        - Check if he has a user application

*/
exports.userappPut = async (req, res) => {
    try{
        const userapp = await Userapp.findOne({ where: { id: req.params.iduserapp } });

        if(!userapp) {
            return res.status(404).json({ message: 'Aucune candidature trouvée.' });
        }

        await userapp.update({
            cv: req.body.cv,
            portfolio: req.body.portfolio
        });

        res.status(201).json({ message: 'Informations mises à jour avec succès.' });

    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du traitement des donnnées.' });
    }
}

exports.userappDelete = async (req, res) => {
    try{
        const userapp = await Userapp.destroy({ where: { id: req.params.iduserapp } });

        if (!userapp) {
            return res.status(404).json({ message: 'Candidature non trouvée.' });
        }

        res.status(201).json({ message: 'Votre annonce a bien été supprimé.' });
    } catch (err) {

    }
}