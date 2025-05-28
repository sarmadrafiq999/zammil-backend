const { Schema, model } = require("mongoose")
// const { required } = require("./login-validator")


const ServiceSchema = new Schema({
    title: String,
    description: String,
    category: String,
    price: String,
    img: String,
})

const Service = new model("Service", ServiceSchema)
module.exports = Service