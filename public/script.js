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
  //defaultDate: 'today',

  locale: {
    firstDayOfWeek: 1,
  },
  minDate: "today",
  maxDate: maxDate,
  onChange: function (selectedDates, dateStr, instance) {
    console.log("Hello from flat");
    console.log("Selected date:", selectedDates[0]);
    simpleDate = dateStr;
    console.log("Formatted date string:", simpleDate);
    //testing date in datepicker
    if (formattedDate === simpleDate) {
      console.log("Ma van!");
    } else console.log("Nem ma van :(");
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("roomsForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Fetch checkbox values
    const room1Cb = document.getElementById("room1Cb").checked;
    const room2Cb = document.getElementById("room2Cb").checked;
    const room3Cb = document.getElementById("room3Cb").checked;
    const room4Cb = document.getElementById("room4Cb").checked;

    // Prepare the data to send
    const formData = {
      room1Cb,
      room2Cb,
      room3Cb,
      room4Cb,
    };

    console.log(formData);

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

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("roomsForm");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent default form submission
//     console.log("Form works----------");

//     // Fetch checkbox values
//     const room1Cb = document.getElementById("room1Cb").checked;
//     const room2Cb = document.getElementById("room2Cb").checked;
//     const room3Cb = document.getElementById("room3Cb").checked;
//     const room4Cb = document.getElementById("room4Cb").checked;

//     // Prepare the data to send
//     const formData = {
//       room1Cb,
//       room2Cb,
//       room3Cb,
//       room4Cb,
//     };

//     console.log(formData);
//   });
// });
