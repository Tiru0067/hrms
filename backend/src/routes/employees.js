const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.use(auth);

router.route("/").get(getEmployees).post(createEmployee);
router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
