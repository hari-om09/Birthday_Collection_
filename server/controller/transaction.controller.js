import Transaction from "../model/transaction.model.js";


export const createTransaction = async (req, res) => {
  const { type, amount, description, date,room } = req.body;

  try {
    if (!type || !amount || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newTransaction = new Transaction({
      type,
      amount,
      description,
      date,
      room
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error. Could not create transaction.", error });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error. Could not fetch transactions.", error });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error. Could not fetch transaction.", error });
  }
};

export const updateTransaction = async (req, res) => {
  const { type, amount, description, date } = req.body;

  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;

    const updatedTransaction = await transaction.save();

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error. Could not update transaction.", error });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    await transaction.remove();

    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Could not delete transaction.", error });
  }
};
