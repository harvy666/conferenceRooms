//datepicker code
//let simpleDate;
//TODO delete everything unnecessary
const input = document.querySelector("#datepicker");
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);


document.addEventListener("DOMContentLoaded", () => {
  let datePicker = flatpickr("#datepicker", {
    locale: {
      firstDayOfWeek: 1,
    },
    minDate: "today",
    maxDate: maxDate,
    onChange: function (selectedDates, dateStr, instance) {
      var myDiv = document.getElementById("rooms");
      myDiv.style.display = "block";
    },
  });

  let form = document.getElementById("roomsForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let room1Cb = document.getElementById("room1Cb").checked;
    let room2Cb = document.getElementById("room2Cb").checked;
    let room3Cb = document.getElementById("room3Cb").checked;
    let room4Cb = document.getElementById("room4Cb").checked;

    const selectedDate = document.getElementById("datepicker").value;

    let formData = {
      room1Cb,
      room2Cb,
      room3Cb,
      room4Cb,
      selectedDate,
    };

    fetch("/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        console.log("I was script!")
      })
      .catch((error) => {
        console.error("Error saving checkbox state:", error);
      });

    document.getElementById("room1Cb").checked = false;
    document.getElementById("room2Cb").checked = false;
    document.getElementById("room3Cb").checked = false;
    document.getElementById("room4Cb").checked = false;

    // Set minDate and maxDate options again after clearing the date picker
    datePicker.set("minDate", "today");
    datePicker.set("maxDate", maxDate);
    datePicker.clear();

    var myDiv = document.getElementById("rooms");
      myDiv.style.display = "none";

  });
});

function changeImage(rectangleId, checkboxId) {
  var image = document.getElementById(rectangleId);
  var redSource = image.src.replace("green", "red");
  var greenSource = image.src.replace("red", "green");

  if (image.src === redSource) {
    image.src = greenSource;
  } else {
    image.src = redSource;
  }

  var checkbox = document.getElementById(checkboxId);
  checkbox.checked = !checkbox.checked;
}
