//datepicker code
const input = document.querySelector("#datepicker");
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);

//testing date

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

//format to datepicker and Postgres style
const formattedDate = `${year}-${month}-${day}`;

let simpleDate;
flatpickr(input, {
  locale: {
    firstDayOfWeek: 1,
  },
  minDate: "today",
  maxDate: maxDate,
  onChange: function (selectedDates, dateStr, instance) {
    simpleDate = dateStr;
    console.log("Formatted date string:", simpleDate);
    //testing date in datepicker
    if (formattedDate === simpleDate) {
      console.log("Ma van!");
    } else console.log("Nem ma van :(");
  },
});

document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("roomsForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Fetch checkbox values
    let room1Cb = document.getElementById("room1Cb").checked;
    let room2Cb = document.getElementById("room2Cb").checked;
    let room3Cb = document.getElementById("room3Cb").checked;
    let room4Cb = document.getElementById("room4Cb").checked;

    const selectedDate = document.getElementById("datepicker").value;

    // Prepare the data to send
    let formData = {
      room1Cb,
      room2Cb,
      room3Cb,
      room4Cb,
      selectedDate,
    };

    // Send the form data to the server
    fetch("/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Success message from the server
      })
      .catch((error) => {
        console.error("Error saving checkbox state:", error);
      });
  });
});
