const IncomeSchema = require("../models/incomeModels");
const Transaction = require("../models/transactionModels");

// Add income service
const addIncomeService = async (incomeData, userId) => {
  const { title, amount, category, description, date } = incomeData;
  
  // Validations
  if (!title || !category || !description || !date) {
    throw new Error('All fields are required');
  }
  
  const income = new IncomeSchema({
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
    type: 'income',
    user_id: userId,
    originalId: income._id
  });
  
  await income.save();
  await transaction.save();
  
  return { message: 'Income Added' };
};

// Get incomes service
const getIncomesService = async (userId) => {
  return await IncomeSchema.find({ user_id: userId }).sort({ createdAt: -1 });
};

// Delete income service
const deleteIncomeService = async (id, userId) => {
  await IncomeSchema.findOneAndDelete({ _id: id, user_id: userId });
  await Transaction.findOneAndDelete({ originalId: id, type: 'income', user_id: userId });
  return { message: 'Income Deleted' };
};

// Update income service
const updateIncomeService = async (id, incomeData, userId) => {
  const { title, amount, category, description, date } = incomeData;
  
  const updatedIncome = await IncomeSchema.findOneAndUpdate(
    { _id: id, user_id: userId },
    { title, amount, category, description, date },
    { new: true }
  );

  await Transaction.findOneAndUpdate(
    { originalId: id, type: 'income', user_id: userId },
    { title, amount, category, description, date },
    { new: true }
  );
  
  return updatedIncome;
};

module.exports = {
  addIncomeService,
  getIncomesService,
  deleteIncomeService,
  updateIncomeService
}; 