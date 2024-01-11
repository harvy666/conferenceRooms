//datepicker code
//let simpleDate;
const input = document.querySelector("#datepicker");
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);

//TODO Try to send it to a different page like /form (does not exist currently?)

//FIXME After saving the first room, the week long limit disappers with the cleanup
document.addEventListener("DOMContentLoaded", () => {
  flatpickr(input, {
    locale: {
      firstDayOfWeek: 1,
    },
    minDate: "today",
    maxDate: maxDate,
    onChange: function (selectedDates, dateStr, instance) {
      //simpleDate = dateStr;

      console.log("DateStr");
      console.log(dateStr);
      var myDiv = document.getElementById("rooms");
      myDiv.style.display = "block";
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

    document.getElementById("room1Cb").checked = false;
    document.getElementById("room2Cb").checked = false;
    document.getElementById("room3Cb").checked = false;
    document.getElementById("room4Cb").checked = false;
    var datePicker = flatpickr("#datePicker");
    datePicker.clear();

  });
});

function changeImage(rectangleId,checkboxId) {
  var image = document.getElementById(rectangleId);
  var redSource = image.src.replace('green', 'red');
  var greenSource = image.src.replace('red', 'green');

  if (image.src === redSource) {
    image.src = greenSource;
  } else {
    image.src = redSource;
  }
  // document.getElementById("room1Cb").checked = true
  var checkbox = document.getElementById(checkboxId);
        checkbox.checked = !checkbox.checked; 
}