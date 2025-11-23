const Employee = require("../models/employee");
const Log = require("../models/log");
const throwError = require("../helpers/throwError");

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      where: { organisation_id: req.organisationId },
    });

    res.json(employees);
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findOne({
      where: { id, organisation_id: req.organisationId },
    });

    if (!employee) throwError(404, "Employee not found.");

    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { first_name, email, phone } = req.body;

    if (!first_name || !email) {
      throwError(400, "first_name and email are required.");
    }

    const existing = await Employee.findOne({
      where: {
        email,
        organisation_id: req.organisationId,
      },
    });

    if (existing) throwError(400, "Employee with this email already exists.");

    if (phone) {
      const existingPhone = await Employee.findOne({
        where: {
          phone,
          organisation_id: req.organisationId,
        },
      });

      if (existingPhone) {
        throwError(400, "Employee with this phone number already exists.");
      }
    }

    const employee = await Employee.create({
      ...req.body,
      organisation_id: req.organisationId,
    });

    await Log.create({
      organisation_id: req.organisationId,
      user_id: req.userId,
      action: "employee_created",
      meta: { employeeId: employee.id },
    });

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findOne({
      where: { id, organisation_id: req.organisationId },
    });

    if (!employee) throwError(404, "Employee not found.");

    await employee.update(req.body);

    await Log.create({
      organisation_id: req.organisationId,
      user_id: req.userId,
      action: "employee_updated",
      meta: { employeeId: id },
    });

    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: { id: req.params.id, organisation_id: req.organisationId },
    });

    if (!employee) throwError(404, "Employee not found.");

    await employee.destroy();

    await Log.create({
      organisation_id: req.organisationId,
      user_id: req.userId,
      action: "employee_deleted",
      meta: { employeeId: req.params.id },
    });

    res.json({ message: "Employee deleted." });
  } catch (err) {
    next(err);
  }
};
