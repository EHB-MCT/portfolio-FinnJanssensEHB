import { Request, Response } from "express";
import { client } from "../db/config";
import { dbGetStopsForCity } from "../db/queryFunctions";
import { Stop } from "../types";

export default async function getDelayForCity(
  request: Request,
  response: Response
) {
  let delay = 0;
  let stops: Stop[] = [];
  if (String(request.query.cityDescription)) {
    const cityDescription = String(request.query.cityDescription);
    stops = await dbGetStopsForCity(cityDescription);
    console.log(stops);
    response.statusCode = 200;
    response.send(stops);
  }
}
