const { 
  addExpenseService, 
  getExpensesService, 
  deleteExpenseService, 
  updateExpenseService 
} = require('../services/expenseService');
const asyncHandler = require('../utilities/asyncHandler');

// Add expense controller
const addExpense = asyncHandler(async (req, res) => {
  const result = await addExpenseService(req.body, req.user._id);
  res.status(200).json(result);
});

// Get expenses controller
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await getExpensesService(req.user._id);
  res.status(200).json(expenses);
});

// Delete expense controller
const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteExpenseService(id, req.user._id);
  res.status(200).json(result);
});

// Update expense controller
const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await updateExpenseService(id, req.body, req.user._id);
  res.status(200).json(result);
});

module.exports = { addExpense, getExpenses, deleteExpense, updateExpense };