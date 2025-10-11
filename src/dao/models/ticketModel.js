import mongoose from "mongoose";
import { nanoid } from "nanoid";

const ticketCollection = "tickets";

const TicketSchema = new mongoose.Schema({
  code: { type: String, unique: true, default: () => nanoid(10) },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }, // email del usuario
});

const ticketModel = mongoose.model(ticketCollection, TicketSchema);

export default ticketModel;
