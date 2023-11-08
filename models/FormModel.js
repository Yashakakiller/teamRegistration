const mongoose = require("mongoose");

// Define the schema for a single member
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

// Define the schema for the team registration
const teamRegistrationSchema = new mongoose.Schema({
  leaderName: { type: String, required: true },
  members: [memberSchema], // An array of member documents
});

// Create a Mongoose model based on the team registration schema
const TeamRegistration = mongoose.model("TeamRegistration", teamRegistrationSchema);

module.exports = TeamRegistration;
