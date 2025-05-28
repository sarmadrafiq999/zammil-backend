const jwt = require("jsonwebtoken")
const User = require("../models/user-model")


// *------------------------
// creating authMiddleware
// *------------------------
const authMiddleware = async (req, res, next) => {
    const token = req.header(
        "Authorization"

    )
    console.log("Authorization Header:", req.header("Authorization"));

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized HTTP Token not provided"
        })
    }
    const jwtToken = token.replace("Bearer", "").trim()
    console.log("Token in the backend", jwtToken);
    try {
        // verification of jwt
        const isVarified = await jwt.verify(jwtToken, process.env.JWT_KEY)
        const finalData = await User.findOne({ email: isVarified.email }).select({ password: 0 })
        console.log("isVarified", isVarified);
        console.log("finalData", finalData);

        req.user = finalData
        req.token = token
        req.user.id
        next()
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(400).json({
            message: "Unauthorized HTTP, Token invalid or expired",
            error: error.message
        });
    }

}
module.exports = authMiddleware
//