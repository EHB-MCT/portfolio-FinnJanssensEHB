import { client } from "./config";
import { getCitiesForEntity } from "../delijn";

const citiesCollection = client.db("Cluster0").collection("Cities");

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
    await sleep(5000);
  }

  client.close();
  console.log("Succesfully seeded cities");
}

seedCities();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
