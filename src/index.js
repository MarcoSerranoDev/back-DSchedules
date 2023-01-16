import app from "./app";
import { Server as websocketServer } from "socket.io";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { PORT } from "./config";

import sockets from "./sockets";
import { connectDB } from "./db";

connectDB();

const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log(`Server run on port ${PORT}`);

app.use(cors());
app.use(morgan("dev"));

const io = new websocketServer(httpServer, {
  cors: {
    origin: "*",
  },
});
sockets(io);
