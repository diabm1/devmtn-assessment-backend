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

  // deleteItem: (req, res) => {
  //   const index = req.params.id - 1; // Subtract 1 to get the array index
  //   if (index < 0 || index >= fortune.length) {
  //     return res.status(404).send("Fortune not found");
  //   }

  //   fortune.splice(index, 1);
  //   res.status(200).send("Fortune deleted successfully");
  // },

  postGratitude: (req, res) => {
    const entryData = req.body;
    entryData.date = new Date().toLocaleString();
    gratitudeEntries.push(entryData);
    console.log(gratitudeEntries)
    res.status(200).send("Gratitude Entry Added Successfully");
  },

  getGratitudeEntriesByDate: (req, res) => {
    const date = req.params.date;
    const entries = gratitudeEntries.filter((entry) => {
      entry.date === date;
    });
    res.status(200).send(entries);
  },
};
