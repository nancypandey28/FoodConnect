const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");

dotenv.config();          // Load environment variables from .env file


const app = express();



app.use(cors());                 // Allows frontend to talk to backend
app.use(express.json());        //middleware //Allows us to read JSON data from requests
app.use("/api/auth", authRoutes);
app.use("/api/food-listings", foodRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Foodconnect'
    });
});

module.exports = app;           //exports the app so server.js can use it.