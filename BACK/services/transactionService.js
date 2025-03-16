const Transaction = require("../models/transactionModels");

// Get transactions service
const getTransactionsService = async (userId) => {
  return await Transaction.find({ user_id: userId }).sort({ createdAt: -1 });
};

module.exports = {
  getTransactionsService
}; 