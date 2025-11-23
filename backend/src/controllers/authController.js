const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Organisation = require("../models/organisation");
const User = require("../models/user");
const Log = require("../models/log");
const throwError = require("../helpers/throwError");

exports.register = async (req, res, next) => {
  try {
    const { orgName, name, email, password } = req.body;

    if (!orgName || !email || !password) {
      throwError(400, "orgName, email, and password are required.");
    }

    // Create organisation
    const organisation = await Organisation.create({ name: orgName });

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      organisation_id: organisation.id,
      name,
      email,
      password_hash: hash,
    });

    // Log creation
    await Log.create({
      organisation_id: organisation.id,
      user_id: user.id,
      action: "organisation_created",
      meta: { organisationId: organisation.id, userId: user.id },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, organisationId: organisation.id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, user });
    //
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throwError(400, "email and password are required.");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) throwError(400, "Invalid credentials.");

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throwError(400, "Invalid credentials.");

    const token = jwt.sign(
      {
        userId: user.id,
        organisationId: user.organisation_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    await Log.create({
      organisation_id: user.organisation_id,
      user_id: user.id,
      action: "user_login",
    });

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};
