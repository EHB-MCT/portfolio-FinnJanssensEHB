import { Request, Response } from "express";
import { client } from "../db/config";
import { getCities } from "../db/queryFunctions";

export default async function getCitiesForEntity(
  request: Request,
  response: Response
) {
  console.log("Entity: ", request.query.entity);
  const entity = Number(request.query.entity);

  const cities: any[] = await getCities(entity);

  response.statusCode = 200;
  response.send(cities);
}
