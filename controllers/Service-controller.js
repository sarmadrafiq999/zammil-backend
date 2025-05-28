const Service = require("../models/Service-model")

const services = async (req,res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(400).json({
                msg: "Services Data is not found",
            })
            return;
        }
        res.status(200).json({
            response
        })
    } catch (error) {
        console.log("Error From the services", error);
    }
}
module.exports = services