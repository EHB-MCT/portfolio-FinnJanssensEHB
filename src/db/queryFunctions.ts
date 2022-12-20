import { client } from "./config";

export async function getCities(entity?: number) {
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
