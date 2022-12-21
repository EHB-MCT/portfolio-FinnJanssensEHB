import { Stop } from "../types";
import { client } from "./config";

export async function dbGetCitiesForEntity(entity?: number) {
  const cities: any[] = [];
  try {
    console.log("Connecting to client...");

    const filter = entity ? { entity: entity } : {};

    await client.connect();
    const cursor = client
      .db("Cluster0")
      .collection("Cities")
      .find(filter, { sort: { description: 1 } });
    await cursor.forEach((city: any) => {
      cities.push(city);
    });
  } finally {
    console.log("Closing client...");

    await client.close();
  }

  return cities;
}
export async function dbGetStopsForCity(cityDescription: string) {
  console.log("dbGetStopsForCity");

  const stops: any[] = [];
  try {
    console.log("Connecting to client...");

    const filter = { cityDescription: cityDescription };

    await client.connect();
    const cursor = client
      .db("Cluster0")
      .collection("Stops")
      .find(filter, { sort: { description: 1 } });
    console.log(cursor);

    await cursor.forEach((stop: any) => {
      stops.push(stop);
    });
  } finally {
    console.log("Closing client...");

    await client.close();
  }

  return stops;
}
