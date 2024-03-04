import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })

        if (name === "" || email === "" || password === "") {
            return res.status(400).json({
                success: false,
                message: "Please Enter Valid Credentials!"
            })
        }

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist!"
            })
        }

        user = await User.create({
            name,
            email,
            password
        })

        const token = await user.generateToken()
        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly: true
        }

        res.status(200).cookie('token', token, options).json({
            success: true,
            message: "User Registered Successfully!",
            user,
            token
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password")

        if (email === "" || password === "") {
            return res.status(400).json({
                success: false,
                message: "Please Enter Valid Credentials!"
            })
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Does Not Exist"
            })
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password!"
            })
        }

        const token = await user.generateToken()

        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly: true
        }

        res.status(200).cookie('token', token, options).json({
            success: true,
            message: `Welcome Back ${user.name}`,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async(req,res)=>{
    try {
        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly: true
        }
        res.status(201).cookie('token', null, options).json({
            success: true,
            message: `Come Back Soon!`
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User Logout Failed!"
        })
    }
}

export const showProfile = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}