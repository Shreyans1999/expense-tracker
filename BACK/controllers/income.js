// controllers/income.js

const { 
  addIncomeService, 
  getIncomesService, 
  deleteIncomeService, 
  updateIncomeService 
} = require('../services/incomeService');
const asyncHandler = require('../utilities/asyncHandler');

// Add income controller
const addIncome = asyncHandler(async (req, res) => {
  const result = await addIncomeService(req.body, req.user._id);
  res.status(200).json(result);
});

// Get incomes controller
const getIncomes = asyncHandler(async (req, res) => {
  const incomes = await getIncomesService(req.user._id);
  res.status(200).json(incomes);
});

// Delete income controller
const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteIncomeService(id, req.user._id);
  res.status(200).json(result);
});

// Update income controller
const updateIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await updateIncomeService(id, req.body, req.user._id);
  res.status(200).json(result);
});

module.exports = { addIncome, getIncomes, deleteIncome, updateIncome };