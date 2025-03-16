// controllers/transactions.js

const { getTransactionsService } = require('../services/transactionService');
const asyncHandler = require('../utilities/asyncHandler');

// Get transactions controller
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await getTransactionsService(req.user._id);
  res.status(200).json(transactions);
});

module.exports = { getTransactions };