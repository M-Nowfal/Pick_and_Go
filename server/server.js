// //Import statements
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connect from './config/connection.js';
// import router from './routes/router.js';

// const corsOptions = {
//     origin: "*",
//     methods: "GET, HEAD, PUT, DELETE, POST, PATCH"
// };

// //Creations
// const app = express();
// dotenv.config();

// //Middlewares
// app.use(cors(corsOptions));
// app.use(express.json());

// //Routes
// app.use('/api/v1/',router);

// //Data Base Connection
// connect();

// //Server Running Port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is Running at PORT : ${PORT}`);
// });

// Import statements
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './config/connection.js';
import router from './routes/router.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS options
const corsOptions = {
    origin: "*",
    methods: "GET, HEAD, PUT, DELETE, POST, PATCH"
};

app.use(cors(corsOptions));
app.use(express.json());

// Root route to check if the server is running
app.get("/", (req, res) => {
    res.send("✅ API is working!");
});

// Routes
app.use('/api/v1/', router);

// Database Connection
connect();

// Server Running Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is Running at PORT: ${PORT}`);
}).on("error", (err) => {
    console.error("❌ Server startup error:", err);
});
