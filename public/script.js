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
