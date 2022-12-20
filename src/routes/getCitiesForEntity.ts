import { Request, Response } from "express";
import { client } from "../db/config";
import { getCities } from "../db/queryFunctions";

export default async function getCitiesForEntity(
  request: Request,
  response: Response
) {
  let cities: any[] = [];

  if (Number(request.query.entity)) {
    console.log("Entity: ", request.query.entity);
    const entity = Number(request.query.entity);

    cities = await getCities(entity);
  } else {
    cities = await getCities();
  }

  response.statusCode = 200;
  response.send(cities);
}
