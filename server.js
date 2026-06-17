import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/events", async (req, res) => {
  const url = `https://developer.nps.gov/api/v1/events?parkCode=${req.query.parkCode}&api_key=YOUR_KEY`;
  const data = await fetch(url).then((r) => r.json());
  res.json(data);
});

app.listen(3000);
