//Import statements
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './config/connection.js';
import router from './routes/router.js';

//Creations
const app = express();
dotenv.config();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/',router);

//Data Base Connection
connect();

//Server Running Port
app.listen(process.env.PORT, () => {
    console.log("Server is Running at PORT :" + process.env.PORT);
});