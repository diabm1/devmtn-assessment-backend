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
    gratitudeEntries.push(entryData)
    res.status(200).send("Gratitude entry added successfully");
  },

  getGratitudeEntriesByDate: (req, res) => {
    const date = req.params.date;
    const entries = gratitudeEntries.filter((entry) => {
        entry.date === date
    })
    res.status(200).send(entries);
  },

};
