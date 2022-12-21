import { Request, Response } from "express";
import { client } from "../db/config";
import { dbGetCitiesForEntity } from "../db/queryFunctions";

export default async function getCitiesForEntity(
  request: Request,
  response: Response
) {
  let cities: any[] = [];

  if (Number(request.query.entity) > 0 && Number(request.query.entity) < 6) {
    console.log("Entity: ", request.query.entity);
    const entity = Number(request.query.entity);

    cities = await dbGetCitiesForEntity(entity);

    response.statusCode = 200;
    response.send(cities);
  } else {
    response.statusCode = 412;
    response.send("Error: invalid entity");
  }
}
