import mongoose from 'mongoose'

const URI = 'mongodb+srv://aasordo:MongoProjectCoder@clusterecommerceferros.askegga.mongodb.net/EcommerceFFerros?retryWrites=true&w=majority&appName=AtlasApp'

mongoose.connect(URI) 
.then(()=> console.log('Connected to DB'))
.catch((error) => console.log(error))

