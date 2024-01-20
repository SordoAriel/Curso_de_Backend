import supertest from "supertest";
import { expect } from "chai";
import "../src/dao/DB/db/configDB.js"
import { productsManager } from "../src/dao/DB/Managers/ProductsManager.js";

const requester = supertest('http://localhost:8080');

describe("Agregado de productos al carrito", () => {
    it("El producto se añade al carrito", async () => {
        const cid = "65a1a82b3dfaf658b71fa7cd"
        const product = {
            _id: "65a944a2267669319a791941",
            quantity: 2
        }
        const req = {
            user: {
                email: "jjalonso@mail.com",
                role: "user"
            }    
        }

        const result = await requester.post(`/api/carts/${cid}/product/${product._id}`).send(req, product)
        console.log('RESULTADO', result)
        expect(result).to.be.an('object')
        expect(result.quantity).to.not.equal(0)
    })
    it("El producto, sin cantidad, no se añade al carrito", async () => {
        const cid = "65a1a82b3dfaf658b71fa7cd"
        const product = {
            _id: "65a944a2267669319a791941",
            quantity: 0
        }
        try {
            const result = await requester.post(`/api/carts/${cid}/product/${product._id}`).send(product)
        } catch (error) {
            expect(error).to.be.an('Error')
        }
    })
    it("La cantidad no puede ser mayor al stock", async function () {
        this.timeout(10000)
        const pid = "65a944a2267669319a791941"
        const product = await productsManager.getById(pid);
        const stock = product.stock
        let quantity = 1000
        expect(stock).to.be.above(quantity)
        quantity = 2001
        expect (stock).to.be.below(quantity)
    })
})

describe("Eliminar un producto en el carrito", () => {
    it("El producto se elimina correctamente", async function() {
        const cid = "65a1a82b3dfaf658b71fa7cd"
        const pid = "65a944a2267669319a791941"
        const productAdded = await requester.post(`/api/carts/${cid}/product/${pid}`)
        //console.log(productAdded)
        expect('productAdded',productAdded).to.be.ok
        const productDeleted = await requester.delete(`/api/carts/${cid}/product/${pid}`)
        //console.log('productDeleted', productDeleted)
        const cart = await requester.get(`/api/carts/${cid}`)
        //console.log('cart',cart._body.cart)
        expect(cart).to.not.include(productDeleted)

    })
})

describe("Finalización de la compra", function(){
    it("La compra finaliza correctamente", async () => {
        const cid = "657f7f8b96eca57b9780667d"
        const result = await (await requester.post(`/api/carts/${cid}/purchase`)).send()
        expect(result).to.be.an('object')
    })
})
