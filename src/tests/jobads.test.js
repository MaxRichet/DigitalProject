const request = require('supertest');
const app = require('../app.js');
const sequelize = require("sequelize");
const User = require("../models/userModel.js");
const Jobads = require("../models/jobadsModel.js");
const Company = require("../models/companyModel.js");

beforeAll(async () => {
    new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        port: process.env.DB_PORT || "8889"
    });
});

afterAll(async () => {
    await User.destroy({ 
        where: { email: "maxUUUUU@gmail.com" }
    });
    await Jobads.destroy({ 
        where: { id: 1 }
    })
    await Company.destroy({ 
        where: { id: 1 }
    })
});

/* Création d'un compte qui sera supprimé après l'exécution des tests pour récupérer un token valide pour tester toutes les méthodes du ../controllers/jobadsController.js */

let token = '';
let tokenJobads = '';
describe('All tests for user controller', () => {
  describe('POST /users/register', () => {
    it('should create a new account', async () => {
        const testItem = { id: 1, firstname: "Max", lastname: "Richet", email: "maxUUUUU@gmail.com", password: "123456", post: "", phone: "0612345678", role: "", gender: "Homme" }
        const res = await request(app)
            .post('/users/register')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
    });
});

describe('POST /users/companyRegister', () => {
    it('should create a company account', async () => {
        const testItem = { id: 1, name: "Microsoft", size: 20, siret: 98765434567890 }
        const res = await request(app)
            .post('/users/companyRegister')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
    });
  });

describe('POST /users/login', () => {
    it('should connect to an account', async () => {
        const testItem = { email: "maxUUUU@gmail.com", password: "123456" }
        const res = await request(app)
            .post('/users/login')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
        token = res.body.token;
    });
});


describe('POST /jobads/', () => {
    it('should create a new job ads', async () => {
        const testItem = { 
            id: 1, 
            title: "Concepteur développeur web Javascript", 
            description: "Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet.", 
            searched_profil: "Nous recherchons un jeune de 22 ans qui a validé le CDA concepteur développeur d'application.", 
            category: "Développement web" 
        }
        const res = await request(app)
            .post('/jobads/')
            .send(testItem)
            .set('authorization', token)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
        tokenJobads = res.body.token;
    });
});

describe('POST /jobads/ without token', () => {
    it('should return an error', async () => {
        const testItem = { 
            id: 1, 
            title: "Concepteur développeur web Javascript", 
            description: "Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet.", 
            searched_profil: "Nous recherchons un jeune de 22 ans qui a validé le CDA concepteur développeur d'application.", 
            category: "Développement web" 
        }
        const res = await request(app)
            .post('/jobads/')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(403);
    });
});

describe('GET /jobads/', () => {
    it('should get informations of a job ads', async () => {
        const res = await request(app)
            .get('/jobads/')
            .set('authorization', token)
            .set('authorizationjob', tokenJobads)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
    });
});

describe('GET /jobads/ without job ads token', () => {
    it('should return an error', async () => {
        const res = await request(app)
            .get('/jobads/')
            .set('authorization', token)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(403);
    });
});

describe('PUT /jobads/', () => {
    it('should create a new job ads', async () => {
        const testItem = { 
            id: 1, 
            title: "Concepteur développeur web PHP", 
            description: "Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet.", 
            searched_profil: "Nous recherchons un jeune de 22 ans qui a validé le CDA concepteur développeur d'application.", 
            category: "Développement web" 
        }
        const res = await request(app)
            .put('/jobads/')
            .send(testItem)
            .set('authorization', token)
            .set('authorizationjob', tokenJobads)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
    });
});

describe('PUT /jobads/ without job ads token', () => {
    it('should return an error', async () => {
        const testItem = { 
            id: 1, 
            title: "Concepteur développeur web PHP", 
            description: "Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet. Lorem ipsum sit amet.", 
            searched_profil: "Nous recherchons un jeune de 22 ans qui a validé le CDA concepteur développeur d'application.", 
            category: "Développement web" 
        }
        const res = await request(app)
            .put('/jobads/')
            .send(testItem)
            .set('authorization', token)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
    });
});

describe('DELETE /jobads/', () => {
    it('should return an error', async () => {
        const res = await request(app)
            .delete('/jobads/')
            .set('authorization', token)
            .set('authorizationjob', tokenJobads)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
    });
});

describe('DELETE /jobads/ without job ads token', () => {
    it('should return an error', async () => {
        const res = await request(app)
            .delete('/jobads/')
            .set('authorization', token)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(403);
    });
});

});