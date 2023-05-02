const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {
  postGratitude,
  getGratitudeEntries,
  putGratitudeEntry,
  deleteGratitudeEntry,
  getGratitudeEntriesByDate,
  getCompliment,
  getFortune,
} = require("./controller");

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);

app.post("/api/gratitude", postGratitude);
app.get("/api/gratitude/", getGratitudeEntries);
// app.get("/api/gratitude/date", getGratitudeEntriesByDate);
app.put("/api/gratitude/:id", putGratitudeEntry);
app.delete("/api/gratitude/:id", deleteGratitudeEntry);

app.listen(4004, () => console.log("Server running on 4004"));
