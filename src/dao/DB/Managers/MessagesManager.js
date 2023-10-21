import { messagesModel } from "../models/messages.model.js";
import BasicManager from "./BasicManager.js";

class MessagesManager extends BasicManager {
  constructor() {
    super(messagesModel);
  }
}

export const messagesManager = new MessagesManager();
