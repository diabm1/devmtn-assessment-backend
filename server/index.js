const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment } = require("./controller");
const { getFortune } = require("./controller");
const { deleteItem } = require("./controller");
const { postGratitude, getGratitudeEntriesByDate } = require("./controller");

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);

// app.delete("/api/fortune/:id", deleteItem)
app.get("/api/gratitude/:date", getGratitudeEntriesByDate);
app.post("/api/gratitude", postGratitude);
app.put("/api/gratitude/:id");
app.post("/api/gratitude/:id");

app.listen(4000, () => console.log("Server running on 4000"));
