const Lead = require("../models/Lead");

const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Lead.countDocuments(filter);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      leads,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateLead = async (req, res) => {
  try {

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(lead);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

exports.deleteLead = async (req, res) => {

  try {

    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lead deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

