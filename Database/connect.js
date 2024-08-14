import mongoose from "mongoose";
import chalk from "chalk"
import { configDotenv } from "dotenv";

configDotenv()
mongoose.connect(process.env.MONGODB).then(() => {
    console.log(chalk.bgGreenBright('MongoDB connection Successfully'));
}).catch(() => {
    console.log(chalk.bgRedBright('MongoDB connection failed'));
})