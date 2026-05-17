require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("./src/models/JobRequest");

const seeds = [
  { 
    title: "Leaking kitchen tap in Kandy", 
    description: "The main tap in the kitchen is constantly dripping. Needs a washer replacement or new tap installation.", 
    category: "Plumbing", 
    location: "Kandy", 
    contactName: "Nimal Perera", 
    contactEmail: "nimal@example.com" 
  },
  { 
    title: "Tripping trip switch & socket repair", 
    description: "Living room plug sockets are not working. Main trip switch drops when turning on the TV.", 
    category: "Electrical", 
    location: "Colombo", 
    contactName: "Sahan Silva", 
    contactEmail: "sahan@example.com" 
  },
  { 
    title: "Full house exterior painting", 
    description: "Need to apply two coats of weather shield paint for a two-story house. Around 2500 sqft wall area.", 
    category: "Painting", 
    location: "Peradeniya", 
    contactName: "Priyantha Bandara", 
    contactEmail: "priyantha@example.com" 
  },
  { 
    title: "Wooden pantry cupboard door repair", 
    description: "Two hinges of the kitchen pantry doors are broken. Need a carpenter to replace them.", 
    category: "Joinery", 
    location: "Katugastota", 
    contactName: "Anura Kumara", 
    contactEmail: "anura@example.com" 
  },
  { 
    title: "Bathroom commode leak & flush repair", 
    description: "Water is leaking from the bottom of the commode and the flush mechanism is not working properly.", 
    category: "Plumbing", 
    location: "Kandy", 
    contactName: "Ruwan Fernando", 
    contactEmail: "ruwan@example.com" 
  },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Job.deleteMany({});
  await Job.insertMany(seeds);
  console.log("Successfully seeded 5 Sri Lankan jobs!");
  process.exit(0);
}).catch(err => {
  console.error("Error seeding data: ", err);
  process.exit(1);
});