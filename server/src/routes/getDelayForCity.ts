import { Request, Response } from "express";
import { dbGetStopsForCity } from "../db/queryFunctions";
import { getDelayForStop } from "../delijn";
import { Stop } from "../types";
import { convertMsToTime, sleep } from "../utility";

export default async function getDelayForCity(
  request: Request,
  response: Response
) {
  let delay = 0;
  let stops: Stop[] = [];
  if (request.query.city) {
    const cityDescription = String(request.query.city);
    stops = await dbGetStopsForCity(cityDescription);

    if (stops.length === 0) {
      response.statusCode = 412;
      response.send("Error 412: invalid city");
    } else {
      for (const stop of stops) {
        let delayForStop: number = await getDelayForStop(
          stop.entity,
          stop.stopNumber
        );
        console.log(`Delay for stop #${stop.stopNumber} :`, delayForStop);

        delay += delayForStop;
        console.log("Total delay: ", delay);

        await sleep(1000);
      }
      console.log("Done getting delay for stops");
      console.log(convertMsToTime(delay));

      response.statusCode = 200;
      response.send({
        city: cityDescription,
        time: new Date(),
        delay: convertMsToTime(delay),
      });
    }
  } else {
    response.statusCode = 412;
    response.send("Error 412: no city specified");
  }
}
