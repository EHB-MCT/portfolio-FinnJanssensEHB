import { MongoClient } from "mongodb";
import { Stop } from "../types";
import { uri } from "./config";

const client = new MongoClient(uri, {
  minPoolSize: 30,
});

async function MongoConnect() {
  await client.connect();
}
async function MongoClose() {
  await client.close();
}

export async function dbGetCitiesForEntity(entity?: number) {
  const cities: any[] = [];
  try {
    await MongoConnect();
    console.log("Connecting to client...");

    const filter = entity ? { entity: entity } : {};

    const cursor = client
      .db("Cluster0")
      .collection("Cities")
      .find(filter, { sort: { description: 1 } });
    await cursor.forEach((city: any) => {
      cities.push(city);
    });
    console.log("Done iterating");
  } finally {
    console.log("Closing client...");

    await MongoClose();
  }

  return cities;
}

export async function dbGetStopsForCity(cityDescription: string) {
  const stops: any[] = [];
  try {
    await MongoConnect();
    console.log("Connecting to client...");

    const filter = { cityDescription: cityDescription };

    const cursor = client
      .db("Cluster0")
      .collection("Stops")
      .find(filter, { sort: { description: 1 } });

    await cursor.forEach((stop: any) => {
      stops.push(stop);
    });
    console.log("Done iterating");
  } finally {
    console.log("Closing client...");

    await MongoClose();
  }

  return stops;
}
