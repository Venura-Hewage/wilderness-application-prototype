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

app.get("/places", async (req, res) => {
  const url = ` https://developer.nps.gov/api/v1/places?parkCode=${req.query.parkCode}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`;
  console.log("FINAL URL:", url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("EVENT RESPONSE:", data);

  res.json(data);
});

app.get("/campgrounds", async (req, res) => {
  try {
    const url = `https://developer.nps.gov/api/v1/campgrounds?parkCode=${req.query.parkCode}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "wilderness-app/1.0",
        Accept: "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    const text = await response.text();

    console.log("STATUS:", response.status);

    console.log("FINAL URL =>", JSON.stringify(url));

    if (!contentType || !contentType.includes("application/json")) {
      return res.status(500).json({
        error: "NPS did not return JSON",
        rawPreview: text.slice(0, 200),
      });
    }

    const data = JSON.parse(text);

    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/thingstodo", async (req, res) => {
  try {
    const url = `https://developer.nps.gov/api/v1/thingstodo?parkCode=${req.query.parkCode}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "wilderness-app/1.0",
        Accept: "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    const text = await response.text();

    console.log("STATUS:", response.status);

    console.log("FINAL URL =>", JSON.stringify(url));

    if (!contentType || !contentType.includes("application/json")) {
      return res.status(500).json({
        error: "NPS did not return JSON",
        rawPreview: text.slice(0, 200),
      });
    }

    const data = JSON.parse(text);

    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/amenities", async (req, res) => {
  try {
    const url = `https://developer.nps.gov/api/v1/amenities/parksplaces?parkCode=${req.query.parkCode}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`;

    console.log("FINAL URL:", url);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "wilderness-app/1.0",
        Accept: "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    const text = await response.text();

    console.log("STATUS:", response.status);

    console.log("FINAL URL =>", JSON.stringify(url));

    if (!contentType || !contentType.includes("application/json")) {
      return res.status(500).json({
        error: "NPS did not return JSON",
        rawPreview: text.slice(0, 200),
      });
    }

    const data = JSON.parse(text);

    console.log("EVENT RESPONSE:", data);

    res.json(data); // ✅ send ONLY once
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
app.listen(3000);
