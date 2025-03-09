const express = require('express');
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const { getTransactions } = require('../controllers/transactions');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Apply requireAuth middleware only to protected routes
router.get('/get-incomes', requireAuth, getIncomes);
router.post('/add-income', requireAuth, addIncome);
router.delete('/delete-income/:id', requireAuth, deleteIncome);
router.put('/update-income/:id', requireAuth, updateIncome); // Route for updating an income

router.get('/get-expenses', requireAuth, getExpenses);
router.post('/add-expense', requireAuth, addExpense);
router.delete('/delete-expense/:id', requireAuth, deleteExpense);
router.put('/update-expense/:id', requireAuth, updateExpense); // Route for updating an expense

router.get('/get-transactions', requireAuth, getTransactions); // New route to get all transactions


module.exports = router;
