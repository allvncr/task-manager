const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const {
  getTasks,
  getOneTasks,
  createTasks,
  updateTasks,
  deleteTasks,
} = require("../controllers/index");

router.use(bodyParser.json());

router.get("/", getTasks);
router.route("/:id").get(getOneTasks).delete(deleteTasks);
router.post("/", upload.array(), createTasks);
router.patch("/:id", upload.array(), updateTasks);

module.exports = router;
