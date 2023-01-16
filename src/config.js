import { config } from "dotenv";

config();

export const MONGODB__URL = process.env.MONGODB__URL;
export const PORT = process.env.PORT || 4000;
