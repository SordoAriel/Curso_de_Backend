import { ticketsManager } from "../dao/DB/Managers/TicketsManager.js"

export const newTicket = async(amount, email) => {
    const newPurchase = ticketsManager.createPurchase(amount, email)
    return newPurchase
}