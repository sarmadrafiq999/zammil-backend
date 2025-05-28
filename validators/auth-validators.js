const z = require("zod")

// LoginSchema
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Inavalid Email address" })
        .trim()
        .min(15, { message: "Mail must be more then 15 characters" })
        .max(200, { message: "mail must be less then 200 characters" }),
    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(4, { message: "password must be more then 4 characters" })
        .max(1024, { message: "password must be less then 1024 characters" }),
})

// singupSchema
const singupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be more then three characters" })
        .max(200, { message: "Name must be less then 200 characters" }),

    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be more then 10 characters" })
        .max(20, { message: "Phone must be less then 20 characters" })
        .regex(/^\d+$/, { message: "Phone must contain only digits" }),


})
module.exports = { singupSchema, loginSchema }