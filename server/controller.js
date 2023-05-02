let gratitudeEntries = [];

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortune = [
      "Your loyalty is a virtue, but not when it’s wedded with blind stubbornness.",
      "Your mentality is alert, practical, and analytical.",
      "Your mind is creative, original and alert.",
      "Your mind is your greatest asset.",
      "Your moods signal a period of change.",
      "Your quick wits will get you out of a tough situation.",
    ];

    let randomIndex = Math.floor(Math.random() * fortune.length);
    let randomFortune = fortune[randomIndex];

    res.status(200).send(randomFortune);
  },

  postGratitude: (req, res) => {
    const entryData = req.body;
    entryData.date = new Date().toLocaleString();
    gratitudeEntries.push(entryData);
    res.status(200).send(entryData); // Send back the newly created entry
  },
  

  getGratitudeEntries: (req, res) => {
    res.status(200).send(gratitudeEntries);
  },

  putGratitudeEntry: (req, res) => {
    const id = req.params.id;
    const updatedEntry = req.body;
    gratitudeEntries = gratitudeEntries.map((entry) => {
      if (entry.id === id) {
        return {
          ...entry,
          ...updatedEntry,
        };
      }
      return entry;
    });
    res.status(200).send(updatedEntry);
  },

  deleteGratitudeEntry: (req, res) => {
    const id = req.params.id;
    gratitudeEntries = gratitudeEntries.filter((entry) => entry.id !== id);
    res.status(200).send({ message: "Entry deleted successfully" });
  },

  getGratitudeEntriesByDate: (req, res) => {
    const date = req.query.date;
    const filteredEntries = gratitudeEntries.filter((entry) => {
        const entryDate = new Date(entry.date)
        const queryDate = new Date(date)
        return(
            entryDate.getDate() === queryDate.getDate() &&
            entryDate.getMonth() === queryDate.getMonth() &&
            entryDate.getFullYear() === queryDate.getFullYear() 
        )
    })
    res.status(200).send(filteredEntries)
  }
};
