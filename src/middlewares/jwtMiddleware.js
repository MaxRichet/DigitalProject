const jwt = require('jsonwebtoken');
require('dotenv').config();

//fonction pour vérifier le token d'un utilisateur
exports.verifyTokenUser = async(req, res, next) =>{
    try {
        let token = req.headers['authorization'];
        if(token != undefined){
            
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) =>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;
            next();
        }else{
            res.status(403).json({message: "Accès interdit: token manquant"});
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Accès interdit: token invalide"});
    }
}

//fonction pour vérifier le token d'une startup
exports.verifyTokenCompany = async(req, res, next) =>{
    try {
        let token = req.headers['authorization'];
        if(token != undefined){
            
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) =>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;
            // Vérification du rôle company
            if (payload && payload.role && payload.role === 'company') {
                next(); // Si l'utilisateur est company, continuer
            } else {
                res.status(403).json({ message: "Accès interdit." });
            }
        }else{
            res.status(403).json({message: "Accès interdit: token manquant"});
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Accès interdit: token invalide"});
    }
}

//fonction pour vérifier le token d'un étudiant
exports.verifyTokenStudent = async(req, res, next) =>{
    try {
        let token = req.headers['authorization'];
        if(token != undefined){
            
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) =>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;
            // Vérification du rôle student
            if (payload && payload.role && payload.role === 'student') {
                next(); // Si l'utilisateur est student, continuer
            } else {
                res.status(403).json({ message: "Accès interdit." });
            }
        }else{
            res.status(403).json({message: "Accès interdit: token manquant"});
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Accès interdit: token invalide"});
    }
}