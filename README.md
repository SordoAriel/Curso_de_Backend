Este es el proyecto desarrollado a lo largo del Curso de Desarrollo Backend de CoderHouse.

Utilizamos el entorno de NodeJS, y para la construcción del servidor, aplicamos el framework de Express.JS.

El servidor está diagramado según el modelo API REST. 

Asimismo, se utilizó una arquitectura por capas para la organización interna del servidor.

Para la creación de las vistas, el requisito del curso era la utilización del motor de plantillas Handlebars, sin la necesidad de incorporar estilados.

El servicio de almacenamiento utilizado fue MongoDB.

Para el manejo de sesiones, utilicé el método de express de sessions. La autenticación de los usuarios se realiza mediante Passport, con el cual se incluye también un método de autenticación por terceros mediante Google.

Aplicamos mailing para enviar notificaciones a los usuarios. Se incluye la utilización de JsonWebToken para la caducidad del mail de cambio de contraseña.

También llevé a cabo diferentes tests unitarios, utilizando Mocha y Chai, y tests de integración, estos últimos con la librería Supertest.

Se documentó el servidor utilizando Swagger.

Finalmente, realicé el deploy de nuestro servidor a través de railway.app
