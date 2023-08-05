import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
const contactShema = new Schema(  {
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  }
}, {versionKey:false, timestamps:true})
contactShema.post("save", handleSaveError)
contactShema.post("findByIdAndUpdate", handleSaveError)
const Contact = model("contact", contactShema)
export default Contact;
