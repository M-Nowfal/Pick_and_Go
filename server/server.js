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

dotenv.config();

const app = express();

// ✅ Updated CORS Configuration
const corsOptions = {
    origin: "https://pick-and-go-lovat.vercel.app", // Allow only your frontend
    methods: "GET, HEAD, PUT, DELETE, POST, PATCH",
    credentials: true // Allow cookies/auth headers if needed
};

app.use(cors(corsOptions));
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
