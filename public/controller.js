//service réteg business logiccal? (even tho its called controller...)

const pool = require("../db");
const queries = require("./queries");

function getRooms(req, res) {
  pool.query(queries.getRooms, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

// const getRoombByDate = (req, res) => {
//   const id = parseInt(req.params.id);
//   pool.query(queries.getStudentById, [id], (error, results) => {
//     if (error) throw error;
//     res.status(200).json(results.rows);
//   });
// };

module.exports = {
  getRooms,
};
