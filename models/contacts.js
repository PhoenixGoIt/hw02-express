import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
const contactShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  }
}, {versionKey:false, timestamps:true})
contactShema.post("save", handleSaveError)
const Contact = model("contact", contactShema)
export default Contact;
