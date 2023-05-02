const form = document.querySelector("form");
const gratitudeInput = document.getElementById("gratitude");
const entriesList = document.getElementById("journal-entries");
const dateSelect = document.getElementById("date-select");
const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");

let entries = [];

// Get random compliment from server
const getCompliment = () => {
  axios.get("http://localhost:4004/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

// Get random fortune from server
const getFortune = () => {
  axios.get("http://localhost:4004/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

// Renders gratitude entries on page
const renderEntries = () => {
  console.log("Rendering entries: ", entries);
  entriesList.innerHTML = "";
  entries.forEach((entry) => {
    const li = document.createElement("li");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteGratitudeEntry(entry.id));
    li.appendChild(deleteBtn);
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editGratitudeEntry(entry.id));
    li.appendChild(editBtn);

    const entryTextSpan = document.createElement("span"); // Create a span element for entry text

    if (entry.date) {
      const date = new Date(entry.date).toLocaleDateString(); // Convert the date to a readable format
      entryTextSpan.textContent = `${date}: ${entry.gratitude}`; // Display both the date and the gratitude text
    } else {
      entryTextSpan.textContent = entry.gratitude;
    }
    li.appendChild(entryTextSpan); // Append the span element to the li element
    entriesList.appendChild(li);
  });
};

// Edit a gratitude entry and update it on server
const editGratitudeEntry = (id) => {
  const entryToUpdate = entries.find((entry) => entry.id === id);
  const updateGratitude = prompt(
    "Update your gratitude entry:",
    entryToUpdate.gratitude
  );
  let updatedEntry;
  if (updateGratitude) {
    updatedEntry = {
      ...entryToUpdate,
      gratitude: updateGratitude,
    };
    putGratitudeEntry(id, updatedEntry);
  }
};

// Gets all gratitude entries from server
const getGratitudeEntries = () => {
  axios
    .get("http://localhost:4004/api/gratitude")
    .then((res) => {
      entries = res.data;
      renderEntries();
      populateDateSelect();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Populates the date selection dropdown with unique dates
const populateDateSelect = () => {
  const uniqueDates = new Set();
  // Adds today's date to the uniqueDates set
  const today = new Date().toLocaleDateString();
  uniqueDates.add(today);
  entries.forEach((entry) => {
    const entryDate = new Date(entry.date).toLocaleDateString();
    uniqueDates.add(entryDate);
  });

  dateSelect.innerHTML = '<option value="">Select a date</option>';
  uniqueDates.forEach((date) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    dateSelect.appendChild(option);
  });
};

let id = 1;

// Adds a new gratitude entry and send it to the server
const postGratitude = (e) => {
  e.preventDefault();
  const gratitudeText = gratitudeInput.value.trim();
  if (gratitudeText === "") {
    alert("Please enter a gratitude entry before submitting.");
    return;
  }

  const newEntry = {
    id: new Date().getTime(),
    gratitude: gratitudeInput.value,
    date: new Date().toISOString(), // Add the current date to the new entry
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

// Updates an existing gratitude entry on the server
const putGratitudeEntry = (id, updatedEntry) => {
  axios
    .put(`http://localhost:4004/api/gratitude/${id}`, updatedEntry)
    .then((res) => {
      console.log("updating entry");
      getGratitudeEntries();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Deletes a gratitude entry from the server
const deleteGratitudeEntry = (id) => {
  const confirmed = confirm("Are you sure you want to delete this entry?");
  if (confirmed) {
    axios
      .delete(`http://localhost:4004/api/gratitude/${id}`)
      .then((res) => {
        console.log("deleting entry");
        getGratitudeEntries();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Gets a gratitude entry by a specific date
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
    entries = []; // Clear the entries array
    renderEntries(); // Call renderEntries to clear the displayed entries
  }
};

// Event listeners
form.addEventListener("submit", postGratitude);
dateSelect.addEventListener("change", getGratitudeEntriesByDate);
complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
// submitGratitudeBtn.addEventListener("click", postGratitudeEntry);

// Gets and renders gratitude entries 
getGratitudeEntries();
