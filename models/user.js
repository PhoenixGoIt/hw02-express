import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
  const UserShema = new Schema(  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
  }, {versionKey:false, timestamps:true})
  UserShema.post("save", handleSaveError)
  const User = model("user", UserShema)
  export default User