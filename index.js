const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const Connection = require("./models/db");
const TeamRegistration = require("./models/FormModel");

dotenv.config();
const PORT = process.env.PORT || 5000;
Connection();
const app = express();

app.use(bodyparser.json({ extended: true, limit: "100mb" }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        const teamRegistrationData = req.body;
        const newTeamRegistration = new TeamRegistration(teamRegistrationData);
        await newTeamRegistration.save();
        res.status(201).json({ message: 'Form filled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create team registration' });
    }
});

// Route for retrieving all team registrations
app.get('/registrations', async (req, res) => {
    try {
        const teamRegistrations = await TeamRegistration.find();
        res.json(teamRegistrations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve team registrations' });
    }
});

app.listen(PORT, () => {
    console.log("Server started on PORT " + PORT);
});
