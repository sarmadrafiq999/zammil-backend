require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const authRouter = require("./routes/router");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error-middleware")
const AdminRouter = require("./routes/admin-route")
const serviceRouter = require("./routes/service-route");
// const contactForm = require("./controllers/contact-form");
const contactRouter = require("./routes/contact-route")

const app = express();
// cors options
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://192.168.110.14:5173"
        // "https://your-frontend-deploy-url.vercel.app"
//
    ],
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true
};

app.use(cors(corsOptions))


const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDb().then(() => {
    // All API routes
    app.use("/api/auth", authRouter); // for register/login
    app.use("/api/auth", contactRouter); // for contact-us
    app.use("/api", serviceRouter);   // for service list
    app.use("/api/admin", AdminRouter)
    app.use(errorMiddleware)
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server responding at ${PORT}`);
    });
});
