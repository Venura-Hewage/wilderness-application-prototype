import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// allow your frontend origin
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

app.get("/events", async (req, res) => {
  const url = ` https://developer.nps.gov/api/v1/events?parkCode=${req.query.parkCode}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`;
  console.log("FINAL URL:", url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("EVENT RESPONSE:", data);

  res.json(data);
});

app.listen(3000);
