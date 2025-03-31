import express from "express";
import { createTransaction, deleteTransaction, getAllTransactions, getTransactionById, updateTransaction } from "../controller/transaction.controller.js";


const transactionRouter = express.Router();

transactionRouter.post("/transaction/", createTransaction);
transactionRouter.get("/transaction/", getAllTransactions);
transactionRouter.get("/transaction/:id", getTransactionById);
transactionRouter.put("/transaction/:id", updateTransaction);
transactionRouter.delete("/transaction/:id", deleteTransaction);

export default transactionRouter;
