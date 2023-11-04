import express from 'express';
import productsRouter from './router/products.router.js'
import cartRouter from './router/cart.router.js'
import viewRouter from './router/views.router.js'
import usersRouter from './router/users.router.js' 
import { __dirname } from "./utils.js";
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { ProductsManager } from './dao/FS/ProductManagerFS.js';
import './dao/DB/db/configDB.js'
import { messagesManager } from './dao//DB/Managers/MessagesManager.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './passport.js'

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use(cookieParser())

const URI = 'mongodb+srv://aasordo:MongoProjectCoder@clusterecommerceferros.askegga.mongodb.net/EcommerceFFerros?retryWrites=true&w=majority&appName=AtlasApp'
app.use(session({
  secret: 'CoderHouse',
  cookie: {
    maxAge: 2*60*60*1000
  },
  store: new MongoStore({
    mongoUrl: URI
  })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', usersRouter)
app.use('/', viewRouter)

const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
  })

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
  console.log('Nuevo cliente en línea')
  socket.on('disconnect',() => {
    console.log('Cliente desconectado')
  })
  socket.on('addProduct', async(product) => {
    const newProduct = await ProductsManager.addProduct(product)
    socket.emit("newProduct", newProduct)
  })
  socket.on('deleteProduct', async(id) => {
    const deletedProduct = await ProductsManager.deleteProduct(+id)
    socket.emit("deletedProduct", id)
  })
  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUserBroadcast", user);
  });
 
  socket.on("message", async (info) => {
    await messagesManager.add(info); 
    const messages = await messagesManager.get()
    socketServer.emit("chat", messages);
  });
})
