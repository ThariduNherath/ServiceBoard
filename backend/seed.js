require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("./src/models/JobRequest");

const seeds = [
  { title: "Leaking kitchen tap", description: "Dripping tap in kitchen, needs new washer.", category: "Plumbing",   location: "Glasgow",   contactName: "Alice Brown",  contactEmail: "alice@example.com" },
  { title: "Rewire garage sockets", description: "Three sockets not working after fuse box upgrade.", category: "Electrical", location: "Edinburgh", contactName: "Bob Smith",   contactEmail: "bob@example.com" },
  { title: "Paint living room",    description: "Two coats on ceiling and walls, approx 20 sqm.",   category: "Painting",   location: "London",    contactName: "Carol Davis", contactEmail: "carol@example.com" },
  { title: "Fix garden fence",     description: "Three panels down after last storm.",               category: "Joinery",    location: "Manchester", contactName: "Dan Lee",    contactEmail: "dan@example.com" },
  { title: "Boiler service",       description: "Annual boiler service due, Worcester combi.",      category: "Plumbing",   location: "Glasgow",   contactName: "Eve Wilson",  contactEmail: "eve@example.com" },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Job.deleteMany({});
  await Job.insertMany(seeds);
  console.log("Seeded 5 jobs");
  process.exit(0);
});