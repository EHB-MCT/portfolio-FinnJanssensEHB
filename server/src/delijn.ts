import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

import { Stop, City } from "./types";
import { calculateDelay } from "./utility";

export async function getCitiesForEntity(
  entityNumber: number
): Promise<City[]> {
  let data = await axios({
    url: `https://api.delijn.be/DLKernOpenData/v1/beta/entiteiten/${entityNumber}/gemeenten`,
    method: "get",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.DELIJN_API_KEY,
    },
  });
  let cities: City[] = data.data.gemeenten.map((city: any): City => {
    return {
      cityNumber: city.gemeentenummer,
      description: String(city.omschrijving).toLowerCase(),
    };
  });
  return cities;
}

export async function getAllStops() {
  let response = await axios({
    url: "https://api.delijn.be/DLKernOpenData/v1/beta/haltes",
    method: "get",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.DELIJN_API_KEY,
    },
  });
  if (response.status == 429) {
    console.log("RESPONSE: ", response);
  }
  let allStops: Stop[] = response.data.haltes.map((stop: any): Stop => {
    return {
      stopNumber: stop.haltenummer,
      description: stop.omschrijvingGemeente,
      entity: stop.entiteitnummer,
      cityDescription: stop.omschrijvingGemeente.toLowerCase(),
    };
  });
  return allStops;
}

export async function getDelayForStop(entity: number, stopNumber: number) {
  let delay: number = 0;
  try {
    let response = await axios({
      url: `https://api.delijn.be/DLKernOpenData/v1/beta/haltes/${entity}/${stopNumber}/real-time`,
      method: "get",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.DELIJN_API_KEY,
      },
    });
    if (response.data.halteDoorkomsten[0]?.doorkomsten) {
      // console.log(response.data.halteDoorkomsten[0]?.doorkomsten);
      response.data.halteDoorkomsten[0]?.doorkomsten.forEach((bus: any) => {
        if (bus["dienstregelingTijdstip"] && bus["real-timeTijdstip"]) {
          let currentDelay = calculateDelay(
            new Date(bus["dienstregelingTijdstip"]),
            new Date(bus["real-timeTijdstip"])
          );
          delay += currentDelay;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  return delay;
}
