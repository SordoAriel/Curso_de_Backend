import express from 'express';
import productsRouter from './router/products.router.js'
import cartRouter from './router/cart.router.js'
import viewRouter from './router/views.router.js'
import messagesRouter from './router/messages.router.js'
import { __dirname } from "./utils.js";
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { ProductsManager } from './dao/ProductManagerFS.js';
import './db/configDB.js'
import { messagesManager } from './dao/MessagesManager.js';

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api', viewRouter)
app.use('/api/messages', messagesRouter)

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
    //await messagesManager.add(info); 
    const messages = await messagesManager.get()
    socketServer.emit("chat", messages);
  });
})
