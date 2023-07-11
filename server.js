//controller feletti réteg?

const express = require("express");
const studentRoutes = require("./public/routes");
const path = require("path");
const pool = require("./db");
const queries = require("./public/queries");

const app = express();
const port = 3000;

app.use(express.json());
//add static files
app.use(express.static(path.join(__dirname, "public")));

// add path to index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));

//////////////
//prints all rooms from Postgres to /rooms endpoint (using a PUG in views folder)

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//give all rooms to the PUG so I can search in them later with the selected date on the datepicker
app.get("/rooms", async (req, res) => {
  const result = await pool.query(queries.getRooms);
  // console.log(result);
  // console.log("-------------end of  all rooms query------------------");
  res.render("rooms", { rooms: result.rows });
});

//saving the checkboxes?

app.post("/rooms", (req, res) => {
  const { room1Cb, room2Cb, room3Cb, room4Cb } = req.body;

  console.log("Room1");
  console.log(room1Cb);

  const currentDate = Date.now();

  // Get the current timestamp using Date.now()
  const timestamp = Date.now();

  // Convert the timestamp to a PostgreSQL timestamp value
  const postgresTimestamp = new Date(timestamp);
  const postgresTimestampString = postgresTimestamp.toISOString();

  // Extract only the date part from the timestamp value
  const postgresDate = postgresTimestampString.substring(0, 10);
  const [year, month, day] = postgresDate.split("-");
  const postgresDateExpression = `to_date('${year}-${month}-${day}', 'YYYY-MM-DD')`;

  const sqlQuery = `INSERT INTO rooms (reservation_date,room1,room2,room3,room4) VALUES (${postgresDateExpression},$1,$2,$3,$4)`;

  console.log(postgresDate); // Output: YYYY-MM-DD

  pool.query(
    sqlQuery,
    [room1Cb, room2Cb, room3Cb, room4Cb],
    (error, results) => {
      if (error) {
        console.error("Error saving checkbox state:", error);
        res.status(500).send("Error saving checkbox state");
      } else {
        res.send("Checkbox state saved successfully");
      }
    }
  );
});
