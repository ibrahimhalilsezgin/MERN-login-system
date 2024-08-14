import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import morgan from 'morgan'
import { configDotenv } from "dotenv";
import AuthRouter from "./Routers/Auth.router.js";


import "./Database/connect.js";
import UserSchema from "./Database/Schemas/User.Schema.js";
configDotenv();


const app = express();


app.use(morgan('dev'))
app.use(cors({
    
}))
app.use(bodyParser.urlencoded({
    extended: true,
    limit:'30mb'
}));
app.use(bodyParser.json({
    limit:'30mb'
}));

app.get('/', async (req,res) => {
    const users = await UserSchema.find({})
    res.json(users)
})
app.use('/', AuthRouter);


const PORT = process.env.PORT || 6000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})