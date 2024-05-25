const express = require('express');
const sequelize = require("sequelize");
require('dotenv').config();

const app = express();
const port = 3000;

// Connexion à la base de donnée
const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || "8889"
});

// Test de connexion à la base de donnée
db.authenticate()
    .then(() => {
        console.log("Connecté à la base de données MySQL!");
    })
    .catch(err => {
        console.error("Impossible de se connecter à la base de données:", err);
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Exemple app listening on port ${port}`)
});