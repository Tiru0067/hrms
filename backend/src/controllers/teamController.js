const Team = require("../models/team");
const Employee = require("../models/employee");
const EmployeeTeam = require("../models/employeeTeam");
const Log = require("../models/log");
const throwError = require("../helpers/throwError");

// Get all teams for an organisation
exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.findAll({
      where: { organisation_id: req.organisationId },
    });

    res.json(teams);
  } catch (err) {
    next(err);
  }
};

// Get employees of a team
exports.getTeamEmployees = async (req, res, next) => {
  try {
    const teamId = req.params.id;

    // Find team (with organisation ownership check)
    const team = await Team.findOne({
      where: { id: teamId, organisation_id: req.organisationId },
      include: [
        {
          model: Employee,
          through: { attributes: [] }, // hide join table fields
        },
      ],
    });

    if (!team) throwError(404, "Team not found");

    res.json(team.Employees);
  } catch (err) {
    next(err);
  }
};

// Create a team
exports.createTeam = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) throwError(400, "Team name is required.");

    const existing = await Team.findOne({
      where: {
        name,
        organisation_id: req.organisationId,
      },
    });

    if (existing)
      throwError(400, "Team name already exists in your organisation.");

    const team = await Team.create({
      name,
      description,
      organisation_id: req.organisationId,
    });

    await Log.create({
      organisation_id: req.organisationId,
      user_id: req.userId,
      action: "team_created",
      meta: { teamId: team.id },
    });

    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

// Update a team
exports.updateTeam = async (req, res, next) => {
  try {
    const id = req.params.id;

    const team = await Team.findOne({
      where: { id, organisation_id: req.organisationId },
    });

    if (!team) throwError(404, "Not found");

    await team.update(req.body);

    await Log.create({
      organisation_id: req.organisationId,
      user_id: req.userId,
      action: "team_updated",
      meta: { teamId: id },
    });

    res.json(team);
  } catch (err) {
    next(err);
  }
};

// Delete team
exports.deleteTeam = async (req, res, next) => {
  try {
    const id = req.params.id;

    const team = await Team.findOne({
      where: { id, organisation_id: req.organisationId },
    });

    if (!team) throwError(404, "Team Not found");

    await team.destroy();

    await Log.create({
      organisation_id: req.organisationId,
      user_id: req.userId,
      action: "team_deleted",
      meta: { teamId: id },
    });

    res.json({ message: "Team deleted" });
  } catch (err) {
    next(err);
  }
};

// Assign employee to team
exports.assignEmployee = async (req, res, next) => {
  try {
    const teamId = req.params.id;
    const { employee_id } = req.body;

    if (!employee_id) throwError(400, "employee_id is required.");

    // Check team exists
    const team = await Team.findOne({
      where: { id: teamId, organisation_id: req.organisationId },
    });
    if (!team) throwError(404, "Team not found");

    // Check employee exists in same org
    const employee = await Employee.findOne({
      where: { id: employee_id, organisation_id: req.organisationId },
    });

    if (!employee) throwError(404, "Employee not found");

    // Assign
    await EmployeeTeam.create({
      employee_id,
      team_id: teamId,
    });

    await Log.create({
      organisation_id: req.organisationId,
      user_id: req.userId,
      action: "employee_assigned_to_team",
      meta: { employee_id, teamId },
    });

    res.json({ message: "Employee assigned to team" });
  } catch (err) {
    next(err);
  }
};

// Unassign employee from team
exports.unassignEmployee = async (req, res, next) => {
  try {
    const teamId = req.params.id;
    const { employee_id } = req.body;

    // Check team exists
    const team = await Team.findOne({
      where: { id: teamId, organisation_id: req.organisationId },
    });
    if (!team) throwError(404, "Team not found");

    // Check employee exists in org
    const employee = await Employee.findOne({
      where: { id: employee_id, organisation_id: req.organisationId },
    });
    if (!employee) throwError(404, "Employee not found");

    // Remove from join table
    const removed = await EmployeeTeam.destroy({
      where: {
        employee_id,
        team_id: teamId,
      },
    });

    if (!removed) throwError(400, "Employee is not assigned to this team");

    // Log action
    await Log.create({
      organisation_id: req.organisationId,
      user_id: req.userId,
      action: "employee_unassigned_from_team",
      meta: { employee_id, teamId },
    });

    res.json({ message: "Employee unassigned from team" });
  } catch (err) {
    next(err);
  }
};
