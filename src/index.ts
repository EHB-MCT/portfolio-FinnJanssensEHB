import axios from "axios";
import Bull from "bull";

let TOTAL_DELAY: number = 0;

const delijnApiQueue = new Bull("delijnApiQueue");

delijnApiQueue.process(async (job, done) => {
  getBussesForStop(job.data.stopNumber);
  done();
});

async function getStopsForCity(cityNumber: number) {
  let data = await axios({
    url: `https://api.delijn.be/DLKernOpenData/v1/beta/gemeenten/${cityNumber}/haltes`,
    method: "get",
    headers: {
      "Ocp-Apim-Subscription-Key": "775579080ca74a49864c6ad57c06a305",
    },
  });
  let stopNumbers: number[] = data.data.haltes.map((stop) => {
    return Number(stop.haltenummer);
  });
  return stopNumbers;
}

async function getBussesForStop(stopNumber: number) {
  let data = await axios({
    url: `https://api.delijn.be/DLKernOpenData/v1/beta/haltes/4/${stopNumber}/real-time`,
    method: "get",
    headers: {
      "Ocp-Apim-Subscription-Key": "775579080ca74a49864c6ad57c06a305",
    },
  });
  if (data.data.halteDoorkomsten[0]?.doorkomsten != undefined) {
    data.data.halteDoorkomsten[0].doorkomsten?.map((stop) => {
      if (stop["dienstregelingTijdstip"] && stop["real-timeTijdstip"]) {
        const delay: number = calculateDelay(
          new Date(stop["dienstregelingTijdstip"]),
          new Date(stop["real-timeTijdstip"])
        );
        if (delay > 0) {
          TOTAL_DELAY += delay;
          console.log(stop.ritnummer, convertMsToTime(delay));
          console.log("TOTAL: ", convertMsToTime(TOTAL_DELAY));
        }
      }
    });
  }
}

const stopNumbers = await getStopsForCity(965);
stopNumbers.forEach((stopNumber, i) => {
  delijnApiQueue.add({
    stopNumber: stopNumber,
    jobIndex: i,
  });
});

function calculateDelay(plannedTime: Date, realTime: Date) {
  return Math.abs(realTime.getTime() - plannedTime.getTime());
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}
