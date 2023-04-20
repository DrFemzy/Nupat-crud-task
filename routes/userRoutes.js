const express = require("express");
const userController = require("../controllers/userController")
const router = express.Router()

const { authenticateToken } = require("../middlewares")

router.post("/create", userController.createUser)
router.get("/:id", userController.getUser)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)
router.get("/getusers/all", userController.getUsers)
router.get("/getusers/male",authenticateToken, userController.getMaleUsers)

module.exports = router