const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "wewantya",
            version: "0.1.0",
            description:
                "This is an API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },  
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    
    apis: ["./docs/swagger/*.js"],
  };


module.exports = swaggerJsdoc(options);