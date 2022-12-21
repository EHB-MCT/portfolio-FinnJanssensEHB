import { uri } from "./config";
import { getAllStops, getCitiesForEntity } from "../delijn";
import { Stop, City } from "../types";
import { MongoClient } from "mongodb";

const client = new MongoClient(uri);

const citiesCollection = client.db("Cluster0").collection("Cities");
const stopsCollection = client.db("Cluster0").collection("Stops");

async function seedCities() {
  const result = await citiesCollection.deleteMany({});
  console.log(result);

  for (let i = 1; i < 6; i++) {
    console.log("Getting cities for entity: ", i);

    let cities = await getCitiesForEntity(i);

    cities.forEach((city) => {
      city.entity = i;
    });
    const result = await citiesCollection.insertMany(cities);
    await sleep(6000);
  }

  console.log("Succesfully seeded cities");
}

async function seedStops() {
  const result = await stopsCollection.deleteMany({});
  console.log(result);
  console.log("Getting all stops... This might take a while.");

  let allStops: Stop[] = await getAllStops();

  await stopsCollection.insertMany(allStops);
}

async function seed() {
  await client.connect();
  // await seedCities();
  await seedStops();
  await client.close();
}

seed();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
