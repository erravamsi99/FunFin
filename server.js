// server.js (Node.js/Express Backend)
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// routes.js (Express Routes)
const express = require('express');
const { getTransactions, addTransaction, deleteTransaction } = require('./controllers/transactionsController');

const router = express.Router();

router.get('/transactions', getTransactions);
router.post('/transactions', addTransaction);
router.delete('/transactions/:id', deleteTransaction);

module.exports = router;

// transactionsController.js (Express Controller)
const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    await transaction.remove();
    res.status(200).json({ msg: 'Transaction removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

