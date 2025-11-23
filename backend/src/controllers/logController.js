const Log = require("../models/log");

exports.getLogs = async (req, res, next) => {
  try {
    const logs = await Log.findAll({
      where: { organisation_id: req.organisationId },
      order: [["timestamp", "DESC"]], // most recent first
    });

    res.json(logs);
  } catch (err) {
    next(err);
  }
};
