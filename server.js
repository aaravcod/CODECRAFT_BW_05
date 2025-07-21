import express from 'express';
import dotenv from 'dotenv';

import { swaggerUi, swaggerSpec } from './swagger.js';

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();



app.use(express.json());
app.use("/api/user",authRoutes);
app.use("/api/room",roomRoutes)
app.use("/api/booking", bookingRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server Listening at Port - ${process.env.PORT}`);
});
