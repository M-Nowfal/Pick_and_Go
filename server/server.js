// Import statements
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './config/connection.js';
import router from './routes/router.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: "https://pick-and-go-lovat.vercel.app", // Allow only your frontend
    methods: "GET, HEAD, PUT, DELETE, POST, PATCH",
    credentials: true // Allow cookies/auth headers if needed
};
app.use(cors(corsOptions));

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
