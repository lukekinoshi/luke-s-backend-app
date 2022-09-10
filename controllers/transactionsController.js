const express = require("express");
const transactions = express.Router();

const transactionData = require('../models/transactions.js');
const { validateURL } = require("../models/validations.js")
// index Route

transactions.get("/", (req, res) => {
    res.json(transactionData);
});
// Show Route
transactions.get("/:arrayIndex", (req, res) => {
    console.log(req.params);
    const { arrayIndex } = req.params;
    if (transactionData[arrayIndex]) {
        res.json(transactionData[arrayIndex])
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
transactions.delete("/:arrayIndex", (req, res)=> {
    const {arrayIndex} = req.params
    const deletedtransaction = transactionData.splice(arrayIndex, 1)
    res.status(200).json(deletedtransaction)
});
// update Route
transactions.put("/:arrayIndex", (req,res) => {
    const {arrayIndex} = req.params
    transactionData[arrayIndex] = req.body
    res.status(200).json(transactionData[arrayIndex])
});


module.exports = transactions