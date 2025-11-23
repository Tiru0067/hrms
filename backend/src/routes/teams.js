const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getTeams,
  getTeamEmployees,
  createTeam,
  updateTeam,
  deleteTeam,
  assignEmployee,
  unassignEmployee,
} = require("../controllers/teamController");

router.use(auth);

router.route("/").get(getTeams).post(createTeam);
router.route("/:id").put(updateTeam).delete(deleteTeam);
router.get("/:id/employees", getTeamEmployees);
router.post("/:id/assign", assignEmployee);
router.delete("/:id/unassign", unassignEmployee);

module.exports = router;
