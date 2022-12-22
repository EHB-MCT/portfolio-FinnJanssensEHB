import express from "express";
import http from "http";
import getCitiesForEntity from "./routes/getCitiesForEntity";
import getDelayForCity from "./routes/getDelayForCity";

const app = express();
const server = new http.Server(app);
server.listen(3030);

console.log("APP UP AND RUNNING!");

app.get("/cities", getCitiesForEntity);
app.get("/delay", getDelayForCity);
