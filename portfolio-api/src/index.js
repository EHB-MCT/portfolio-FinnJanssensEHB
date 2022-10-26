require("dotenv").config();
const axios = require("axios");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 7000;
app.use(cors());

// const { MongoClient } = require("mongodb");

// const url = process.env.MONGODB_URI;
// const client = new MongoClient(url);

// const dbName = process.env.MONGODB_DATABASE;

// async function mongo() {
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   const collection = db.collection(process.env.MONGODB_COLLECTION);
// }

app.get("/delijn", async (req, res) => {
  let data = [];
  axios
    .get(
      "https://api.delijn.be/DLKernOpenData/v1/beta/haltes/3/303020/real-time",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.DELIJN_API_KEY,
        },
      }
    )
    .then(function (response) {
      response.data.halteDoorkomsten[0].doorkomsten.forEach((doorkomst) => {
        if (
          doorkomst["dienstregelingTijdstip"] != undefined &&
          doorkomst["real-timeTijdstip"] != undefined
        ) {
          let dTijd = Date.parse(doorkomst["dienstregelingTijdstip"]);
          let rtTijd = Date.parse(doorkomst["real-timeTijdstip"]);
          let delay = Math.abs(dTijd - rtTijd);
          data.push(
            `${Math.floor(delay / 1000 / 60)}:${Math.floor(
              (delay / 1000) % 60
            )}`
          );
        }
      });
      res.send(data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
