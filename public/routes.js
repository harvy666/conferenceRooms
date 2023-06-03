//controller réteg ami meghívja a service réteget? (a controller.js-t)

const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getRooms);

module.exports = router;
