const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next()
    } catch (error) {
        next(error)
    }

}

module.exports = { adminMiddleware }