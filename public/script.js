const maxDate = new Date()
maxDate.setDate(maxDate.getDate() + 7)

// TODO add week selection
document.addEventListener('DOMContentLoaded', () => {
  const datePicker = flatpickr('#datepicker', {
    locale: {
      firstDayOfWeek: 1
    },
    minDate: 'today',
    maxDate,
    onChange: function (selectedDates) {
      const myDiv = document.getElementById('rooms')
      myDiv.style.display = 'block'
      console.log('Changing!!!')

      if (selectedDates.length > 0) {
        // const selectedDate = selectedDates[0].toLocaleDateString('hu-HU');
        const selectedDate = selectedDates[0].toLocaleDateString('hu-HU', { timeZone: 'Europe/Budapest' })
        console.log(selectedDate)

        fetch(`/rooms/data/?selectedDate=${selectedDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            // Update checkboxes/images based on the data received from the server
            updateCheckboxes(data)
          })
          .catch(error => {
            console.error('Error fetching data:' + error)
          })
      }

      function updateCheckboxes (data) {
        // Update checkboxes/images based on the data received from the server
        document.getElementById('room1Cb').checked = data.room1
        document.getElementById('room2Cb').checked = data.room2
        document.getElementById('room3Cb').checked = data.room3
        document.getElementById('room4Cb').checked = data.room4

        updateImages('room1Cb', 'rectangle1')
        updateImages('room2Cb', 'rectangle2')
        updateImages('room3Cb', 'rectangle3')
        updateImages('room4Cb', 'rectangle4')
      }
    }
  })

  const form = document.getElementById('roomsForm')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const room1Cb = document.getElementById('room1Cb').checked
    const room2Cb = document.getElementById('room2Cb').checked
    const room3Cb = document.getElementById('room3Cb').checked
    const room4Cb = document.getElementById('room4Cb').checked
    const selectedDate = document.getElementById('datepicker').value

    const formData = {
      room1Cb,
      room2Cb,
      room3Cb,
      room4Cb,
      selectedDate
    }

    fetch('/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).catch((error) => { console.error('Error saving checkbox state:', error) })

    // set stuff back to starting values
    document.getElementById('room1Cb').checked = false
    document.getElementById('room2Cb').checked = false
    document.getElementById('room3Cb').checked = false
    document.getElementById('room4Cb').checked = false
    // Set minDate and maxDate options again after clearing the date picker
    // datePicker.set("minDate", "today");
    // datePicker.set("maxDate", maxDate);
    datePicker.clear()
    // hide everything again
    const myDiv = document.getElementById('rooms')
    myDiv.style.display = 'none'
    resetImage()
    showDays()
  })
})

function changeImage (rectangleId, checkboxId) { // eslint-disable-line no-unused-vars
  const image = document.getElementById(rectangleId)
  const redSource = image.src.replace('green', 'red')
  const greenSource = image.src.replace('red', 'green')

  if (image.src === redSource) {
    image.src = greenSource
  } else {
    image.src = redSource
  }

  const checkbox = document.getElementById(checkboxId)
  checkbox.checked = !checkbox.checked
}

function resetImage () {
  const images = document.getElementsByClassName('rectangle');
  [...images].forEach(element => {
    element.src = element.src.replace('red', 'green')
  })
}

function updateImages (checkboxId, rectangleId) {
  const checkbox = document.getElementById(checkboxId)
  const rectangle = document.getElementById(rectangleId)

  if (checkbox.checked) {
    // If checkbox is checked, show red image
    rectangle.src = rectangle.src.replace('green', 'red')
  } else {
    // If checkbox is unchecked, show green image
    rectangle.src = rectangle.src.replace('red', 'green')
  }
}
// TODO db based coloring
// TODO fix this annoying -1 hour/-1day problem!!!!! Example  formatted_date: '2024-02-07',reservation_date: 2024-02-06T23:00:00.000Z,
async function showDays () {
  const datesContainer = document.getElementById('datesContainer')
  datesContainer.innerHTML = '' // Clear previous content

  try {
    const response = await fetch('/rooms/days/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data)

    for (let i = 0; i < 8; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      console.log('starting date  ' + date)
      const dateString = date.toISOString().split('T')[0]
      console.log('middate  ' + dateString)
      const dateElement = document.createElement('div')
      dateElement.textContent = dateString
      dateElement.className = 'dateButton' // Apply a class for styling
      const rowData = data.find(item => item.formatted_date === dateString)

      console.log(`Date: ${dateString}, Row Data:`, rowData)

      // Check if the date is in the data
      if (rowData) {
        // Check conditions for setting background color based on room values
        if (rowData.room1 && rowData.room2 && rowData.room3 && rowData.room4) {
          dateElement.style.backgroundColor = 'red'
        } else if (!rowData.room1 || !rowData.room2 || !rowData.room3 || !rowData.room4) {
          dateElement.style.backgroundColor = 'orange'
        }
      } else {
        dateElement.style.backgroundColor = 'green' // Handle the case when the date is not found in the data
      }

      datesContainer.appendChild(dateElement)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
