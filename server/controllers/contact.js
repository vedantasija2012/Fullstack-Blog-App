import Contact from "../models/Contact.js";

export const querySent = async(req, res)=>{
    try {
        const {name, email, query} = req.body;

        if(name==="" || email==="" || query===""){
            return res.status(400).json({
                success: false,
                message:"Enter Valid Credentails!"
            })
        }

        const queryRec = await Contact.create({
            name,
            email,
            query
        })

        res.status(200).json({
            success: true,
            message: "Message Sent Successfully!",
            queryRec
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}