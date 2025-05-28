const { Schema, model, models } = require("mongoose");

const contactSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

// Fix: Check if model already exists before defining it
const Contact = models.Contact || model("Contact", contactSchema);

module.exports = Contact;
