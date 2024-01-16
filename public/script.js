//datepicker code
//let simpleDate;

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
      console.log("Changing!!!")


      if (selectedDates.length > 0) {
        //const selectedDate = selectedDates[0].toISOString().split('T')[0];
        const selectedDate = selectedDates[0].toLocaleDateString('hu-HU');
        console.log(selectedDate)
    
        //TODO MAIN put the fetch in a try catch/somehow deal with when there is no data with that date in the DB already 

        fetch(`/rooms/data/?selectedDate=${selectedDate}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(response => response.json())
          .then(data => {
            // Update checkboxes/images based on the data received from the server
            updateCheckboxes(data);
          })
          .catch(error => {
            console.error("Error fetching data:");
          });
      }
        
    function updateCheckboxes(data) {
    // Update checkboxes/images based on the data received from the server
    document.getElementById("room1Cb").checked = data.room1;
    document.getElementById("room2Cb").checked = data.room2;
    document.getElementById("room3Cb").checked = data.room3;
    document.getElementById("room4Cb").checked = data.room4;
    }

      //TODO  IF selecteddate not equal 0 then read in the corresponding value from the DB and set checkboxes/images
    },
  });

  

// Rest of your code...


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
    }).catch((error) => {console.error("Error saving checkbox state:", error);});

    //set stuff back to starting values
    document.getElementById("room1Cb").checked = false;
    document.getElementById("room2Cb").checked = false;
    document.getElementById("room3Cb").checked = false;
    document.getElementById("room4Cb").checked = false;
    // Set minDate and maxDate options again after clearing the date picker
    datePicker.set("minDate", "today");
    datePicker.set("maxDate", maxDate);
    datePicker.clear();
    //hide everything again
    var myDiv = document.getElementById("rooms");
    myDiv.style.display = "none";
    resetImage();
    
    //TODO reset selectedDate (if it exists here at all) so the onChange it does not fire again
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

function resetImage() {
  let images = document.getElementsByClassName("rectangle");
  [...images].forEach(element => {
    // Assuming the original source contains "green", replace it with "red"
    element.src = element.src.replace("red", "green");
  });
}
