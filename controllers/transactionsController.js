const express = require("express");
const transactions = express.Router();

const transactionData = require('../models/transactions.js');
const { validateURL } = require("../models/validations.js")
// index Route

transactions.get("/", (req, res) => {
    // const { id } = req.params;
    res.json(transactionData);
});


// Show Route
transactions.get("/:index", (req, res) => {
    console.log(req.params);
    const { index } = req.params;
    if (transactionData[index]) {
        res.json(transactionData[index])
    } else {
        res.status(404).send("no transaction found - sorry");
    } 
});
// Create Route
transactions.post("/", validateURL, (req, res) => {
    transactionData.push(req.body);
    res.json(transactionData[transactionData.length - 1]);
});
// delete Route
transactions.delete("/:index", (req, res)=> {
    const {index} = req.params
    const deletedTransaction = transactionData.splice(index, 1)
    res.status(200).json(deletedTransaction)
});
// update Route
transactions.put("/:index", (req,res) => {
    const {index} = req.params
    transactionData[index] = req.body
    res.status(200).json(transactionData[index])
});


module.exports = transactions