const router = require("express").Router();
const Job = require("../models/JobRequest");

// GET /api/jobs
router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status)   filter.status   = req.query.status;
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { next(err); }
});

// GET /api/jobs/:id
router.get("/:id", async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) { next(err); }
});

// POST /api/jobs
router.post("/", async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;
    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "title and description are required" });
    }
    const job = await Job.create({ title, description, category, location, contactName, contactEmail });
    res.status(201).json(job);
  } catch (err) { next(err); }
});

// PATCH /api/jobs/:id  — status only
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ["Open", "In Progress", "Closed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const job = await Job.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) { next(err); }
});

// DELETE /api/jobs/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
});

module.exports = router;