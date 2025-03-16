const ExpenseSchema = require("../models/expenseModels");
const Transaction = require("../models/transactionModels");

// Add expense service
const addExpenseService = async (expenseData, userId) => {
  const { title, amount, category, description, date } = expenseData;
  
  // Validations
  if (!title || !category || !description || !date) {
    throw new Error('All fields are required');
  }
  
  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    user_id: userId
  });

  const transaction = new Transaction({
    title,
    amount,
    category,
    description,
    date,
    type: 'expense',
    user_id: userId,
    originalId: expense._id
  });
  
  await expense.save();
  await transaction.save();
  
  return { message: 'Expense Added' };
};

// Get expenses service
const getExpensesService = async (userId) => {
  return await ExpenseSchema.find({ user_id: userId }).sort({ createdAt: -1 });
};

// Delete expense service
const deleteExpenseService = async (id, userId) => {
  await ExpenseSchema.findOneAndDelete({ _id: id, user_id: userId });
  await Transaction.findOneAndDelete({ originalId: id, type: 'expense', user_id: userId });
  return { message: 'Expense Deleted' };
};

// Update expense service
const updateExpenseService = async (id, expenseData, userId) => {
  const { title, amount, category, description, date } = expenseData;
  
  const updatedExpense = await ExpenseSchema.findOneAndUpdate(
    { _id: id, user_id: userId },
    { title, amount, category, description, date },
    { new: true }
  );

  await Transaction.findOneAndUpdate(
    { originalId: id, type: 'expense', user_id: userId },
    { title, amount, category, description, date },
    { new: true }
  );
  
  return updatedExpense;
};

module.exports = {
  addExpenseService,
  getExpensesService,
  deleteExpenseService,
  updateExpenseService
}; 