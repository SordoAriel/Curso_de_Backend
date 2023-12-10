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
        const purchase_datatime = new Date(date.getTime() + (3 * 60 * 60 * 1000));
        const newTicket = await this.model.create({code: code, amount: amount, purchase_datatime: purchase_datatime, purchaser: email})
        return newTicket;
    }
}

export const ticketsManager = new TicketsManager()