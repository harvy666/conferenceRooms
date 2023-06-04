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
  console.log(result);
  console.log("-------------end of  all rooms query------------------");
  res.render("rooms", { rooms: result.rows });
});
