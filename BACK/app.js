const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { db } = require('./db'); 

const app = express();

const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(cors());
app.use(express.json());

const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/user');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/transaction', transactionRoutes);

// Server setup
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Listening to Port:', PORT);
    });
};
server();
