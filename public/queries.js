//repo réteg?

const getRooms = "Select * from rooms";
const getRoomByDate = "Select * from rooms where reservation_date=$1";

module.exports = {
  getRooms,
  getRoomByDate,
};
