const Service = require("../models/Service-model");

const getServices = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            return res.status(400).json({ msg: "Services Data is not found" });
        }
        res.status(200).json({ response });
    } catch (error) {
        console.error("Error from services:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { getServices };
