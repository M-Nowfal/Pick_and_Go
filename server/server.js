// Import statements
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './config/connection.js';
import router from './routes/router.js';

dotenv.config();

const app = express();

// const corsOptions = {
//     origin: "https://pick-and-go-lovat.vercel.app", // Allow only your frontend
//     methods: "GET, HEAD, PUT, DELETE, POST, PATCH",
//     credentials: true // Allow cookies/auth headers if needed
// };
// app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://pick-and-go-lovat.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, PUT, DELETE, POST, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    
    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    
    next();
});

// app.use(cors());

app.use(express.json());

// Routes
app.use('/api/v1/', router);

// Database Connection
connect();

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running at PORT: ${PORT}`);
});
