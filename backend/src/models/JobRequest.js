const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    title:        { type: String, required: true },
    description:  { type: String, required: true },
    category:     { type: String, default: "" },
    location:     { type: String, default: "" },
    contactName:  { type: String, default: "" },
    contactEmail: {
      type: String,
      default: "",
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Text index for bonus keyword search
jobSchema.index({ title: "text", description: "text" });

module.exports = model("JobRequest", jobSchema);