//controller feletti réteg?

const express = require("express");
const studentRoutes = require("./src/student/routes");
const path = require("path");

const app = express();
const port = 3000;

//console.log(express);
//console.log(typeof express);

app.use(express.json());
app.use(express.static(path.join(__dirname, "src", "student")));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
