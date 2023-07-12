//datepicker code
let simpleDate;
const input = document.querySelector("#datepicker");
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);

document.addEventListener("DOMContentLoaded", () => {
  flatpickr(input, {
    locale: {
      firstDayOfWeek: 1,
    },
    minDate: "today",
    maxDate: maxDate,
    onChange: function (selectedDates, dateStr, instance) {
      simpleDate = dateStr;
    },
  });

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
