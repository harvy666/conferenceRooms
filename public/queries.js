//repo réteg?

const getRooms = "Select * from rooms";
const getRoombByDate = "Select * from students where reservation_date=$1";
// const checkEmailExists = "Select s from students s where s.email=$1";
// const addStudent =
//   "Insert into students (name,email,age,dob) VALUES ($1,$2,$3,$4)";

// const removeStudent = "Delete from students where id=$1";
// const updateStudent = "Update students SET name=$1 where id=$2";

module.exports = {
  getRooms,
  getRoombByDate,
  // getStudents,
  // getStudentById,
  // checkEmailExists,
  // addStudent,
  // removeStudent,
  // updateStudent,
};
