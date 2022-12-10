import Bull from "bull";
import {
  getCitiesForEntity,
  getBussesForStop,
  getStopsForCity,
} from "./delijn.js";

const cities = await getCitiesForEntity(4);

console.log(cities);

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
