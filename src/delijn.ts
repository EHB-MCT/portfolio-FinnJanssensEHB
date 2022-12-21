import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

import { Stop, City } from "./types";

export async function getAllCities(): Promise<City[]> {
  let data = await axios({
    url: `https://api.delijn.be/DLKernOpenData/v1/beta/gemeenten`,
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

export async function getStopsForCity(cityNumber: number) {
  let data = await axios({
    url: `https://api.delijn.be/DLKernOpenData/v1/beta/gemeenten/${cityNumber}/haltes`,
    method: "get",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.DELIJN_API_KEY,
    },
  });
  let stopNumbers: number[] = data.data.haltes.map((stop: any) => {
    return Number(stop.haltenummer);
  });
  return stopNumbers;
}

export async function getBussesForStop(
  entityNumber: number,
  stopNumber: number
) {
  let data = await axios({
    url: `https://api.delijn.be/DLKernOpenData/v1/beta/haltes/${entityNumber}/${stopNumber}/real-time`,
    method: "get",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.DELIJN_API_KEY,
    },
  });
  if (data.data.halteDoorkomsten[0]?.doorkomsten != undefined) {
    data.data.halteDoorkomsten[0].doorkomsten?.map((stop: any) => {});
  }
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
