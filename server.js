console.log("Starting server...");
require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const cors = require("cors");

const authRouter = require("./routes/router");
const contactRouter = require("./routes/contact-route");
const serviceRouter = require("./routes/service-route");
const AdminRouter = require("./routes/admin-route");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://zammil-solar.vercel.app",
        "https://mern-frontend-for-zammil-sola-git-2fb282-sarmad-rafiqs-projects.vercel.app",
        "https://zammil-solar-qwhsyr1e7-sarmad-rafiqs-projects.vercel.app/"
    ],
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true
};

app.use(cors(corsOptions));              // ✅ Valid
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.use("/api/auth", authRouter);
    app.use("/api/contact", contactRouter);
    // app.use("/api/auth", authRouter);  // ✅ Moved out of /auth
    app.use("/api", serviceRouter);
    app.use("/api/admin", AdminRouter);
    app.use(errorMiddleware);

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server responding at ${PORT}`);
    });
});


//  // enable preflight for all routes

// console.log("Starting server...");
// require("dotenv").config();
// const express = require("express");
// const connectDb = require("./utils/db");
// const authRouter = require("./routes/router");
// const cors = require("cors");
// const errorMiddleware = require("./middlewares/error-middleware");
// const AdminRouter = require("./routes/admin-route");
// const serviceRouter = require("./routes/service-route");
// const contactRouter = require("./routes/contact-route");

// const app = express();


// // CORS options
// const corsOptions = {
//     origin: [
//         "http://localhost:5173", // for local dev
//         "https://zammil-frontend.vercel.app", // old deployment
//         "https://mern-frontend-for-zammil-solar-azxu.vercel.app" // current working deployment
//     ],
//     methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
//     credentials: true
// };

// app.use(cors(corsOptions));
//  app.use(express.json());
// //  app.options('*', cors(corsOptions));

// // Use environment PORT or fallback to 5000
// const PORT = process.env.PORT || 5000;

// connectDb().then(() => {
//     // All API routes
//     app.use("/api/auth", authRouter); // register/login
//     app.use("/api/auth", contactRouter); // contact-us
//     app.use("/api", serviceRouter); // service list
//     app.use("/api/admin", AdminRouter);
//     app.use(errorMiddleware);

//     app.listen(PORT, '0.0.0.0', () => {
//         console.log(`Server responding at ${PORT}`);
//     });
// });

