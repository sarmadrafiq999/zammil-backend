const z = require("zod")


const contactSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be more then three characters" })
        .max(200, { message: "Name must be less then 200 characters" }),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Inavalid Email address" })
        .trim()
        .min(13, { message: "Mail must be more then 13 characters" })
        .max(200, { message: "mail must be less then 200 characters" }),
    message: z
        .string({ required_error: "Message is required" })
        .trim()
        .min(10, { message: "Message must be more than 10 characters" })
        .max(3000, { message: "Message must be less than 3000 characters" }),

})

module.exports = contactSchema