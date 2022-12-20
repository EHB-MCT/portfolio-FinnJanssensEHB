import { Request, Response } from "express";
import { client } from "../db/config";

export default async function getCitiesForEntity(
  request: Request,
  response: Response
) {
  console.log(request.query.entity);
  const entity = Number(request.query.entity);

  const cities: any[] = [];

  try {
    console.log("Connecting to client...");

    await client.connect();
    const cursor = client
      .db("Cluster0")
      .collection("Cities")
      .find({ entity: entity }, { sort: { description: 1 } });
    await cursor.forEach((city: any) => {
      cities.push(city);
    });
  } finally {
    console.log("Closing client...");

    await client.close();
  }

  response.statusCode = 200;
  response.send(cities);
}
