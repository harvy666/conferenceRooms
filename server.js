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

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));

//////////////
//prints all students from Postgres to /students endpoint (using a PUG in views folder)

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/students", async (req, res) => {
  const result = await pool.query(queries.getStudents);
  res.render("students", { students: result.rows });
});

app.get("/users", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(queries.getStudents);
    const users = result.rows;
    client.release(); // release the client back to the pool
    res.render("users", { users });
  } catch (err) {
    console.error(err);
    res.render("error", { error: err });
  }
});
