const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// const { getCompliment } = require("./controller");
// const { getFortune } = require("./controller");
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
app.get("/api/gratitude/date", getGratitudeEntriesByDate);
app.put("/api/gratitude/:id", putGratitudeEntry);
app.delete("/api/gratitude/:id", deleteGratitudeEntry);

// app.post('/entries', (req, res) => {
//   const newEntry = req.body;
//   entries.push(newEntry);
//   res.json(newEntry);
// });

// app.get('/entries', (req, res) => {
//   res.json(entries);
// });

// app.put('/entries/:id', (req, res) => {
//   const id = req.params.id;
//   const updatedEntry = req.body;
//   entries = entries.map((entry) => {
//     if (entry.id === id) {
//       return {
//         ...entry,
//         ...updatedEntry,
//       };
//     }
//     return entry;
//   });
//   res.json(updatedEntry);
// });

// app.delete('/entries/:id', (req, res) => {
//   const id = req.params.id;
//   entries = entries.filter((entry) => entry.id !== id);
//   res.json({ message: 'Entry deleted successfully' });
// });

app.listen(4004, () => console.log("Server running on 4004"));
