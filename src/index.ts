import express from "express";
import http from "http";

const app = express();
const server = new http.Server(app);
server.listen(3030);
