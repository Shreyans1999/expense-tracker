const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        required: true // Ensure type is required
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    user_id:{
        type: String,
        required: true,
    },
    originalId: { // Add this field
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'type' // This can be used to reference either Income or Expense
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
