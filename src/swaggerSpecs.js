import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "./utils.js";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ferretería Ferros API',
            version: '1.0.0',
            description: 'Documentación del servidor para el ecommerce de Ferretería Ferros'
        }
    },
    apis: [`${__dirname}/documentation/*.yaml`]
}
export const swaggerSetup = swaggerJSDoc(swaggerOptions);
