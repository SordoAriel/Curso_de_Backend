import { ticketsModel } from "../models/tickets.model.js";

class TicketsManager{
    constructor(){
        this.model= ticketsModel
    }
    async createPurchase(amount, email){
        const lastTicket = await this.model.findOne().sort({ purchase_datatime: -1 });
        const lastCode = lastTicket ? parseInt(lastTicket.code) : 1000000000;
        const newCode = lastCode + 1;
        const code = newCode.toString()
        const date = new Date()
        const newTicket = await this.model.create({code: code, amount: amount, purchase_datatime: date, purchaser: email})
        return newTicket;
    }
}

export const ticketsManager = new TicketsManager()