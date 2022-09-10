const express = require("express");
const app = express();
const api = require("./models/transactions.js")
const cors = require("cors");

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log("Budgeting app is rendering");
    next();
});
const transactionsController = require("./controllers/transactionsController");
app.get("/", (req, res) => {
    res.send("Welcome to Luke's budgeting App")
});

app.use("/transactions", transactionsController);

app.get("*", (req, res) => {
    res.status(404).json({error: "page not found"})
})
module.exports = app;