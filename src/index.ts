import express from "express";
import http from "http";
import getCitiesForEntity from "./routes/getCitiesForEntity";

const app = express();
const server = new http.Server(app);
server.listen(3030);

app.get("/cities", getCitiesForEntity);
