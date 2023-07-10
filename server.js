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
  const checkbox1 = req.body.room1Cb;
  const checkbox2 = req.body.room2Cb;
  const checkbox3 = req.body.room3Cb;
  const checkbox4 = req.body.room4Cb;

  console.log("1es cb");
  console.log(res.body);
  console.log("1es cb vége-----------------------------------------");

  //hogy mukodik ez a pool.query, mi kell a szögletes zarojelbe ha kell e egyaltalan...
  pool.query(
    "INSERT INTO rooms (room1,room2,room3,room4) VALUES ($1,$2,$3,$4)",
    [checkbox1, checkbox2, checkbox3, checkbox4],
    (error, results) => {
      if (error) {
        console.error("Error saving checkbox state:", error);
        res.status(500).send("Error saving checkbox state");
      } else {
        res.send("Checkbox state saved successfully");
      }
    }
  );

  console.log("THE END");
  console.log(res.body);
  console.log("THE END");
});
