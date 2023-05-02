const form = document.querySelector("form");
const gratitudeInput = document.getElementById("gratitude");
const entriesList = document.getElementById("journal-entries");
const dateSelect = document.getElementById("date-select");
const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");

let entries = [];

const getCompliment = () => {
  axios.get("http://localhost:4004/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4004/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const renderEntries = () => {
  console.log("Rendering entries: ", entries);
    entriesList.innerHTML = "";
    entries.forEach((entry) => {
      const li = document.createElement("li");
      if (entry.date) {
        const date = new Date(entry.date).toLocaleDateString(); // Convert the date to a readable format
        li.textContent = `${date}: ${entry.gratitude}`; // Display both the date and the gratitude text
      } else {
        li.textContent = entry.gratitude;
      }
      entriesList.appendChild(li);
    });
  };
  

const getGratitudeEntries = () => {
  axios
    .get("http://localhost:4004/api/gratitude")
    .then((res) => {
      entries = res.data;
      renderEntries();
    })
    .catch((err) => {
      console.log(err);
    });
};

const postGratitude = (e) => {
  e.preventDefault();
  const newEntry = {
    gratitude: gratitudeInput.value,
  };
  console.log("Submitting gratitude entry: ", newEntry);
  axios
    .post("http://localhost:4004/api/gratitude", newEntry)
    .then((res) => {
      console.log("Server response: ", res);
      entries.push(res.data);
      gratitudeInput.value = "";
      renderEntries();
    })
    .catch((err) => {
      console.log(err);
    });
};
const putGratitudeEntry = (id, updatedEntry) => {
  axios
    .put(`http://localhost:4004/api/gratitude/${id}`, updatedEntry)
    .then((res) => {
      console.log("updating entry");
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteGratitudeEntry = (id) => {
  axios
    .delete(`http://localhost:4004/api/gratitude/${id}`)
    .then((res) => {
      console.log("deleting entry");
    })
    .catch((err) => {
      console.log(err);
    });
};
const getGratitudeEntriesByDate = () => {

  const date = dateSelect.value;
  if (date) {
    axios
      .get(`http://localhost:4004/api/gratitude?date=${date}`)
      .then((res) => {
        entries = res.data;
        renderEntries();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    getGratitudeEntries();
  }
};

form.addEventListener("submit", postGratitude);
dateSelect.addEventListener("change", getGratitudeEntriesByDate);
complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
// submitGratitudeBtn.addEventListener("click", postGratitudeEntry);

// getEntries();
