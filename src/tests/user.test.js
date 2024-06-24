const request = require('supertest');
const app = require('../app.js');
const sequelize = require("sequelize");
const User = require("../models/userModel.js");
const Student = require("../models/studentModel.js");
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
        where: { email: "maxUUUU@gmail.com" }
    });
    await Student.destroy({ 
        where: { id: 1 }
    })
    await Company.destroy({ 
        where: { id: 1 }
    })
});

describe('All tests for user controller', () => {
  describe('POST /users/register', () => {
    it('should create a new account', async () => {
        const testItem = { id: 1, firstname: "Max", lastname: "Richet", email: "maxUUUU@gmail.com", password: "123456", post: "", phone: "0612345678", role: "", gender: "Homme" }
        const res = await request(app)
            .post('/users/register')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(201);
    });
  });

  describe('POST /users/register with email already exist in db', () => {
    it('should return an error', async () => {
        const testItem = { firstname: "Max", lastname: "Richet", email: "maxUUUU@gmail.com", password: "123456", post: "", phone: "0612345678", role: "", gender: "Homme" }
        const res = await request(app)
            .post('/users/register')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(401);
    });
  });

  describe('POST /users/register with wrong format email', () => {
    it('should return an error', async () => {
        const testItem = { firstname: "Max", lastname: "Richet", email: "testtest", password: "123456", post: "", phone: "0612345678", role: "", gender: "Homme" }
        const res = await request(app)
            .post('/users/register')
            .send(testItem)
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(409);
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

  describe('POST /users/studentRegister', () => {
    it('should create a student account', async () => {
        const testItem = { id: 1, school: 'My Digital School' }
        const res = await request(app)
            .post('/users/studentRegister')
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

        console.log(res.body);
        expect(res.statusCode).toEqual(201);
    });
  });

  describe('POST /users/login with wrong email', () => {
    it('should return an error', async () => {
        const testItem = { email: "testemail@gmail.com", password: "123456" }
        const res = await request(app)
            .post('/users/login')
            .send(testItem)
            .set('Accept', 'application/json');

        console.log(res.body);
        expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /users/login with wrong password', () => {
    it('should return an error', async () => {
        const testItem = { email: "maxUUUU@gmail.com", password: "123maxUU" }
        const res = await request(app)
            .post('/users/login')
            .send(testItem)
            .set('Accept', 'application/json');

        console.log(res.body);
        expect(res.statusCode).toEqual(401);
    });
  });

});
