const input = document.querySelector("#datepicker");
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);
flatpickr(input, {
  //defaultDate: 'today',
  minDate: "today",
  maxDate: maxDate,
  onChange: function (selectedDates, dateStr, instance) {
    console.log("Hello from flat");
    console.log("Selected date:", selectedDates[0]);
    console.log("Formatted date string:", dateStr);
    console.log("Flatpickr instance:", instance);
  },
});
