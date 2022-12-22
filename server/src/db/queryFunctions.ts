/**This file contains all function that access the MongoDB database */

import { MongoClient } from "mongodb";
import { uri } from "./config";

const client = new MongoClient(uri);

//Connect to Mongo Database
async function MongoConnect() {
  await client.connect();
}

//Close connection to Mongo Database
async function MongoClose() {
  await client.close();
}

//Get the cities for a desired entity (province, 1-5)
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

//Get all the busstops for a certain city
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
