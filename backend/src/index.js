import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'


const app = express();
app.use(express.json()); //allows to extract json data from the request body
app.use(cookieParser());

app.use("/api/auth", authRoutes);



app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
  connectDB();
})