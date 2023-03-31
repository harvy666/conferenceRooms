// const controller = require("./controller");

// document.querySelector(".btn-press").addEventListener("click");

//import { getStudents } from "./controller";
import { getStudents } from "./src/student/controller";

let button = document.querySelector(".btn-press");
button.addEventListener("click", () => {
  getStudents((error, students) => {
    if (error) {
      console.error(error);
      // handle the error in some way
    } else {
      // do something with the students array
      console.log(students);
    }
  });
});
