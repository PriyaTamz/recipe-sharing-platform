const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require("body-parser");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(cors({
    //origin: 'https://heroic-faloodeh-f3be09.netlify.app',
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(cookieParser());

app.use("/api/recipes", recipeRoutes);

module.exports = app;