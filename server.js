// Set up express server
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// This will hold our transactions
let transactions = [];

// Create Transaction Route
app.post("/transactions", (req, res) => {
  const { amount, type, description } = req.body; // Extracting data from request body
  const newTransaction = {
    id: transactions.length + 1, // Simple way to generate unique ID
    amount,
    type,
    description,
    createdAt: new Date(),
  };
  transactions.push(newTransaction);
  res.status(201).send(newTransaction);
});

// List Transactions Route
app.get("/transactions", (req, res) => {
  res.status(200).send(transactions);
});

// Edit Transaction Route
app.put("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { amount, type, description } = req.body;
  const transaction = transactions.find((t) => t.id === parseInt(id));
  if (transaction) {
    transaction.amount = amount;
    transaction.type = type;
    transaction.description = description;
    res.status(200).send(transaction);
  } else {
    res.status(404).send({ message: "Transaction not found" });
  }
});

// Delete Transaction Route
app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactions.findIndex((t) => t.id === parseInt(id));
  if (transactionIndex > -1) {
    transactions.splice(transactionIndex, 1);
    res.status(200).send({ message: "Transaction deleted" });
  } else {
    res.status(404).send({ message: "Transaction not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
