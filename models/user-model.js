const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//! userSchema**********
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    console.log("pre dtat", this);
    const user = this
    if (!user.isModified("password")) {
        next()
    }
    try {
        const saltRound = await bcrypt.genSalt(10)
        const hashing = await bcrypt.hash(user.password, saltRound)
        user.password = hashing
    } catch (error) {
        console.log("error from User model", error);
    }
})
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
            process.env.JWT_KEY,
            {
                expiresIn: "10d"
            }
        )
    } catch (error) {
        console.log("JWT error", error);
    }
}


const User = new mongoose.model("User", userSchema)
module.exports=User