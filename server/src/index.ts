import express from "express";
import http from "http";
import getCitiesForEntity from "./routes/getCitiesForEntity";
import getDelayForCity from "./routes/getDelayForCity";

const app = express();
const server = new http.Server(app);
server.listen(5000);

console.log("APP UP AND RUNNING!");

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Server is up and running");
});
app.get("/cities", getCitiesForEntity);
app.get("/delay", getDelayForCity);
