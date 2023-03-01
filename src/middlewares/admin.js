const User = require("../models/userModel");

const checkAdmin = async (req, res, next) => {
    const currUser = await User.findById(req.user._id);
    
    if (req.user && currUser.role === "admin") {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as an admin" });
    }
}

module.exports = checkAdmin;