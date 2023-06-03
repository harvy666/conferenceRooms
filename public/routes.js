//controller réteg ami meghívja a service réteget? (a controller.js-t)

const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getRooms);
// router.post("/", controller.addStudent);
// router.get("/:id", controller.getStudentById);
// router.delete("/:id", controller.removeStudent);
// router.put(":/id", controller.updateStudent);

module.exports = router;
