const Jobads = require("../models/jobadsModel.js");
const jwt = require("jsonwebtoken");


/****************** CREATE A JOB ADS ******************/
/* 
    This function allow a company user to create a job ads

    Checking :
        - Check if he's a company

*/
exports.jobadsCreate = async (req, res) => {
    try {
        let token = await req.headers['authorization'];

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

            req.user = payload;

            try {
                const jobads = await Jobads.create({...req.body, user_company_id: req.user.id});
                const jobadsData = {
                    id: jobads.id
                };
                const token = jwt.sign(jobadsData, process.env.JWT_KEY, { expiresIn: '10d' });
                res.status(201).json({ message: 'Votre annonce a bien été mise en ligne.', token });
            } catch (err) {
                res.status(500).json({message: "Erreur serveur."});
            }
        } else {
            res.status(403).json({message: 'Token manquant.'});
        }
    } catch (err) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}

/****************** GET A JOB ADS ******************/
/* 
    This function allow a company user to get infos of a job ads

    Checking :
        - Check if he's a company

*/
exports.jobadsGet = async (req, res) => {
    try {
        let token = await req.headers['authorizationjob'];

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

            req.user = payload;

            try {
                const jobads = await Jobads.findOne({
                    where: { id: req.user.id }
                });

                if (!jobads) {
                    return res.status(404).json({ message: 'Utilisateur non trouvé.' });
                }

                res.status(201).json({ jobads });
            } catch (err) {
                res.status(500).json({message: "Erreur serveur."});
            }
        } else {
            res.status(403).json({message: 'Token manquant.'});
        }
    } catch (err) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}

/****************** MODIFY A JOB ADS ******************/
/* 
    This function allow a company user to modify a job ads

    Checking :
        - Check if he's a company

*/
exports.jobadsModify = async (req, res) => {
    try {
        let token = await req.headers['authorizationjob'];
        console.log(token);
        if(token !== undefined) {
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                })
            });

            req.user = payload;

            try {
                const jobads = await Jobads.findOne({ where: { id: req.user.id } });

                if(!jobads){
                    return res.status(404).json({ message: 'Offre non trouvé.' });
                }
                await jobads.update({
                    title: req.body.title,
                    description: req.body.description,
                    searched_profil: req.body.searched_profil,
                    category: req.body.category,
                    why_join_us: req.body.why_join_us,
                    location: req.body.location,
                    duration: req.body.duration,
                    salary: req.body.salary,
                    remote: req.body.remote,
                    xp: req.body.xp,
                    degree: req.body.degree
                });

                res.status(201).json({ message: 'Votre annonce a bien été mise à jour.' });
            } catch (err) {
                res.status(500).json({message: "Erreur serveur."});
            }
        } else {
            res.status(403).json({message: 'Token manquant.'});
        }
    } catch (err) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}

/****************** DELETE A JOB ADS ******************/
/* 
    This function allow a company user to delete a job ads

    Checking :
        - Check if he's a company

*/
exports.jobadsDelete = async (req, res) => {
    try {
        let token = await req.headers['authorizationjob'];

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

            req.user = payload;

            try {
                const deleteJobads = await Jobads.destroy({
                    where: { id: req.user.id }
                });

                if (!deleteJobads) {
                    return res.status(404).json({ message: 'Offre non trouvé.' });
                }

                res.status(201).json({ message: 'Votre annonce a bien été supprimé.' });
            } catch (err) {
                res.status(500).json({message: "Erreur serveur."});
            }
        } else {
            res.status(403).json({message: 'Token manquant.'});
        }
    } catch (err) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}