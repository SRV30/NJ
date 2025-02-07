import ContactUs from "../models/contact";

export const Contact = async (req, res) => { 
    if(!req.body.name || !req.body.email || !req.body.message){
        return res.status(400).json({
            message: "All fields are required",
            error: true,
            success: false
        });
    }
    try{
        const contact = new ContactUs(req.body);
        await contact.save();
        return res.status(201).json({
            message: "Contact added successfully",
            error: false,
            success: true,
            data: contact
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }                                       
}
export const getContact = async (req, res) => {                         

    try{
        const contact = await ContactUs.find();
        return res.status(200).json({
            message: "Contact fetched successfully",
            error: false,
            success: true,
            data: contact
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }                                       
}
