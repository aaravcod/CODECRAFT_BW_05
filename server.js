import express from 'express';
import dotenv from 'dotenv';

import { swaggerUi, swaggerSpec } from './swagger.js';

import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();



app.use(express.json());
app.use("/api/auth",authRoutes);


app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server Listening at Port - ${process.env.PORT}`);
});
