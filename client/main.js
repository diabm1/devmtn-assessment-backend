const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const submitGratitudeBtn = document.getElementById("submit-gratitude-btn");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getGratitudeEntriesByDate = () => {
  axios
    .get("http://localhost:4000/api/gratitude/:date")
    .then((res) => {
      const data = res.data;
      const list = document.getElementById("journal-entries");
      list.innerHTML = "";
      data.forEach((entry) => {
        const item = document.createElement("li");
        item.textContent = `${entry.data}: ${entry.gratitude}`;
        list.appendChild(item);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postGratitudeEntry = (e) => {
  e.preventDefault();

  const gratitudeInput = document.getElementById("gratitude");
  const gratitude = gratitudeInput.value;
  const entryData = { gratitude: gratitude };

  axios
    .post("http://localhost:4000/api/gratitude", entryData)
    .then((res) => {
      console.log(res.data);
      console.log("Gratitude Entry Successfully Submitted");
    })
    .catch((err) => {
      console.log(err);
    });
};

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
submitGratitudeBtn.addEventListener("click", postGratitudeEntry);
