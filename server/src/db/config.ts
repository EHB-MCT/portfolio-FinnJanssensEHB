import * as dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

export const uri = `mongodb+srv://devapp:${process.env.MONGODB_PASSWORD}@cluster0.3erzbmv.mongodb.net/?retryWrites=true`;
