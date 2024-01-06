Buenas profe! 
Hay dos cosas con las que no he podido:

- Con respecto a la opción de reestablecer contraseña, no pude determinar la caducidad del link. 
Intenté con jsw, dejé comentados mis intentos para que pueda verlos y decirme si estuve cerca, muy lejos de lograrlo,
y en cualquier caso, cómo solucionarlo. 

- Con respecto a la eliminación de productos, la lógica funciona, pero no logro que la respuesta se reciba en el navegador.
No entiendo bien por qué, pero sé que sé muy poco del uso de fetch, así que no me extrañaría que tenga que ver con eso, más cómo estoy manejando del lado del cliente. 
Debe ser por ahí, tengo que mejorar eso. Si me puede dar una idea de cómo solucionarlo, bárbaro! 

______________°________________
Para el testeo:

- La creación y eliminación de productos, se prueba desde la ruta localhost:8080/manageProducts (es necesario loguearse previamente)
- Todas las contraseñas de los usuarios son 123456
- pperez@mail.com es admin, a.a.sordo@gmail.com es premium y pvalderrama@mail.com es user.

Variables de entorno (Estoy usando las mismas claves en los tres entornos):

MONGO_URI = mongodb+srv://aasordo:MongoProjectCoder@clusterecommerceferros.askegga.mongodb.net/EcommerceFFerros?retryWrites=true&w=majority&appName=AtlasApp
GOOGLE_CLIENT_ID = 1025928913555-6idq9f1pabalngbqv265fijvfikgsnr1.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = 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
GOOGLE_CALLBACK_URL = http://localhost:8080/api/sessions/auth/google/callback
GMAIL_USER =a.a.sordo@gmail.com
GMAIL_PASS =vcjyijknfduhdalk
JWT_SECRET_KEY = 123456

