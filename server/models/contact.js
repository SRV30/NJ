import mongoose from "mongoose";

const contact = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email:{
      type: String,
      required: [true, "Please provide a email"],
      trim: true,
    },
      
    message: {
      type: String,
      required: [true, "Please provide a messgae"],
      trim: true,
    },
  
  },
  {
    timestamps: true,
  }
);



const ContactUs = mongoose.model("contact", contact);

export default ContactUs;
