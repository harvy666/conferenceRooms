//controller feletti réteg?

const express = require("express");
const studentRoutes = require("./public/routes");
const path = require("path");

const app = express();
const port = 3000;

//console.log(express);
//console.log(typeof express);

app.use(express.json());
//add static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "src", "student")));

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// add path to index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
