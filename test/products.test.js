import supertest from "supertest";
import { expect } from "chai";
import "../src/dao/DB/db/configDB.js"
import { productsManager } from "../src/dao/DB/Managers/ProductsManager.js";
import { newProduct } from "../src/controllers/products.controller.js"; 

const requester = supertest('http://localhost:8080');

describe("Creación de productos", () => {
    it("Funionamiento de la base de datos", async function(){
        this.timeout(10000)
        const completeProduct = {
            title: "Rotomartillo",
            description: "DeWalt 950W encastre SDS plus",
            code: "DWRM950W",
            price: 1000,
            stock: 20,
            category: "Máquinas",
            thumbnail: ["https://http2.mlstatic.com/D_NQ_NP_2X_902361-MLA45153958226_032021-F.webp"]
        }
        const newProduct = await productsManager.add(completeProduct)
        expect(newProduct).to.have.property("_id")
        expect(newProduct).to.be.an("object")
        await productsManager.delete(newProduct._id)
    })
    it("Funionamiento del controller - producto sin description", async function(){
        this.timeout(10000)
        const body = {
            title: "Rotomartillo",
            code: "DWRM950W",
            price: 1000,
            stock: 20,
            category: "Máquinas",
            thumbnail: ["https://http2.mlstatic.com/D_NQ_NP_2X_902361-MLA45153958226_032021-F.webp"]
        }
        try {
            const createProduct = await newProduct({body})
            console.log('lala',createProduct)
        } catch (error) {
            expect(error).to.be.an("Error")
        }
    })
})

describe("Buscar producto por id", () => {
    it("Producto encontrado", async () => {
        const pid = "65282a432b5dc891e24797ae"
        const result = await requester.get(`/api/products/${pid}`)
        expect(result._body.productSearch).to.have.property("thumbnail")
    })
})

describe("Actualizar producto", () =>{
    it("Actualización correcta de productos", async () => {
        const completeProduct = {
            title: "Rotomartillo",
            description: "DeWalt 950W encastre SDS plus",
            code: "DWRM950W",
            price: 1000,
            stock: 20,
            category: "Máquinas",
            thumbnail: ["https://http2.mlstatic.com/D_NQ_NP_2X_902361-MLA45153958226_032021-F.webp"]
        }
        const body = {
            price: 1500,
            stock: 45,
        }
        const product = await productsManager.add(completeProduct);
        const result = await requester.put(`/api/products/${product._id}`).send({body})
        expect(result).to.be.ok
        await productsManager.delete(product._id)
    })
})
