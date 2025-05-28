require('dotenv').config();

const Contact = require("../models/contact-model")
const nodeMailer = require("nodemailer")

const contactForm = async function (req, res, next) {
    const { username, email, message } = req.body
    if (!username || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Setup Nodemailer transporter
        const transporter = nodeMailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.OWNER_EMAIL,
                pass: process.env.OWNER_EMAIL_PASSWORD,
            }
        })
        // Email to Website Owner
        const ownerMail = {
            from: email,
            to: process.env.OWNER_EMAIL,
            subject: `New contact form is subbmitted from solar energy by ${username}`,
            html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${username}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          `,
        }

        // Confirmation Email to User

        const userMail = {
            from: process.env.OWNER_EMAIL,
            to: email,
            subject: "Thank you for contacting us!",
            html: `
            <p>Hi ${username},</p>
            <p>We have received your message:</p>
            <blockquote>${message}</blockquote>
            <p>We'll get back to you shortly.</p>
            <br/>
            <p>Best regards,<br/>Website Team</p>
          `,
        }
        console.log("Sending confirmation to user:", email);
        await transporter.sendMail(ownerMail);
        await transporter.sendMail(userMail);
        await transporter.sendMail(userMail)
            .then(() => console.log("✅ Confirmation email sent to user!"))
            .catch((err) => console.error("❌ Failed to send user email:", err));


        await Contact.create({ username, email, message })

        res.status(200).json({ message: "Message sent and emails delivered!" });
        // return res.status(200).json({ message: "contatced user created" })
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ message: "Message not sent", extraDetails: error.message });
        next(error)

    }
}

module.exports = contactForm