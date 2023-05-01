const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
// const submitGratitudeBtn = document.getElementById("submit-gratitude-btn");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/").then((res) => {
    const data = res.data;
    // alert(data);
    const list = document.getElementById("fortune-list");
    // var firstname = document.getElementById("firstname").value;
    const listItem = document.createElement("li");
    list.appendChild(listItem)
    listItem.appendChild(data);
    // list.appendChild(entry);
  });
};

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const gratitudeInput = document.getElementById("gratitude");
//   const gratitude = gratitudeInput.value;
//   gratitudeInput.value = "";
//   axios
//     .post("http://localhost:4000/api/gratitude", {
//       gratitude,
//       date: new Date().toLocaleString(), // send the current date with the entry
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const getGratitudeEntriesByDate = () => {
//   const dateSelect = document.getElementById("date-select");
//   const selectedDate = dateSelect.value;
//   if (!selectedDate) {
//     return;
//   }
//   axios
//     .get(`http://localhost:4000/api/gratitude/${selectedDate}`)
//     .then((res) => {
//       const data = res.data;
//       const list = document.getElementById("journal-entries");
//       list.innerHTML = "";
//       data.forEach((entry) => {
//         const item = document.createElement("li");
//         item.textContent = `${entry.date}: ${entry.entryData.gratitude}`;
//         list.appendChild(item);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const postGratitudeEntry = (e) => {
//   e.preventDefault();

//   const gratitudeInput = document.getElementById("gratitude");
//   const gratitude = gratitudeInput.value;
//   const entryData = { gratitude: gratitude };

//   const dateSelect = document.getElementById("date-select");
//   const gratitudeDate = new Date().toLocaleString().slice(0, 8)
//   if (!dateSelect.options[dateSelect.options.length - 1].value) {
//       dateSelect.options[dateSelect.options.length - 1].remove();
//     }
//   const newOption = document.createElement("option");
//   newOption.value = gratitudeDate;
//   newOption.text = gratitudeDate;
//   dateSelect.add(newOption);
//   dateSelect.value = gratitudeDate;

//   axios
//     .post("http://localhost:4000/api/gratitude", {
//       entryData,
//       date: gratitudeDate,
//     })
//     .then((res) => {
//       console.log(res.data);
//       console.log("Gratitude Entry Successfully Submitted (frontend)");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
// submitGratitudeBtn.addEventListener("click", postGratitudeEntry);
