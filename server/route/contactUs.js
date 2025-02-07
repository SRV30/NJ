import express from "express";
import { Contact, getContact } from "../controllers/contactController";
const contactUs = express.Router();
contactUs.post("/contact", Contact);
contactUs.get("/getcontact", getContact);
export default contactUs;