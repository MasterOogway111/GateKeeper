import   'dotenv/config';
 import express from "express";    
 import cors from "cors"; // to connect frontend and backend 

 import cookieParser from "cookie-parser";
 import connectDB from "./config/mongodb.js";
 import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

 const app = express();
 const port = process.env.PORT  || 4000  ; // if port no is defined in  env variable then it will be using that otherwise 4000


connectDB();
 
const allowedOrigins = ['http://localhost:5173']

 app.use(express.json()); //all the request will be parsed using json 
 app.use(cookieParser());
 app.use(cors({origin: allowedOrigins,credentials:true})); // to send cookies in the response from the express app
 // api endpoints
 app.get('/',(req,res)=>res.send("Api working"));
 app.use('/api/auth',authRouter)
 app.use('/api/user',userRouter)


 app.listen(port, ()=> console.log(`Server start on PORT:${port}`)); // display the msg in terminal 

//   connectDB();