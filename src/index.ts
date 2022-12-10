import Bull from "bull";
import express from "express";
import {
  getCitiesForEntity,
  getBussesForStop,
  getStopsForCity,
} from "./delijn.js";

const app = express();
app.get("/cities", async function (req, res) {
  if (!Number(req.query.entity)) {
    res
      .status(400)
      .send(
        `The request was not handled properly due to an invalid entity number: ${req.query.entity}`
      );
  } else {
    const cities = await getCitiesForEntity(Number(req.query.entity));
    res.json(cities);
  }
});

app.listen(3000);

// let TOTAL_DELAY: number = 0;

// const delijnApiQueue = new Bull("delijnApiQueue");

// delijnApiQueue.process(async (job, done) => {
//   getBussesForStop(4, job.data.stopNumber);
//   done();
// });

// const stopNumbers = await getStopsForCity(965);
// stopNumbers.forEach((stopNumber, i) => {
//   delijnApiQueue.add({
//     stopNumber: stopNumber,
//     jobIndex: i,
//   });
// });
