const User = require("../models/user-model")

const home = async (req, res) => {
    try {
        res.status(200).send("welcome to home page")
    } catch (error) {
        console.log("home backend", error);
    }
}
// Regestration
const register = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body
        console.log("data from the front end", req.body);
        const userExsisted = await User.findOne({ email })
        if (userExsisted) {
            return res.status(400).json({ message: "Please use the different email" })
        }
        // Creating User
        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        })
        const token = await userCreated.genrateToken()
        res.status(201).json({
            message: "user creatd successfully",
            token,
            userId: userCreated._id.toString()
        })


    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userExsisted = await User.findOne({ email })

        if (!userExsisted) {
            return res.status(400).json({ message: "Invalid Email" });

        }
        const passwordCheck = await userExsisted.comparePassword(password)
        const token = await userExsisted.genrateToken()
        if (passwordCheck) {
            res.status(200).json({
                message: "Login Successfully",
                token,
                userId: userExsisted._id.toString()
            });
        } else {
            return res.status(404).json({ message: "Invalid  Password" });
        }


    } catch (error) {
        next(error)
    }
}
const user = async (req, res, next) => {
    try {
        const userData = req.user
        console.log("that is the dta from the user route", userData);
        return res.status(200).json({
            user: userData,
        })
    } catch (error) {
        console.log(`error due to server ${error}`);
    }
}



module.exports = { home, register, login, user }