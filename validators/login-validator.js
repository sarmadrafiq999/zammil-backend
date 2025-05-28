const z = require("zod")
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid Email address" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(4, { message: "Password must be at least 4 characters long" }),
});

module.exports = loginSchema;
