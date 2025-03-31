import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../services';

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/transaction')
      .then((response) => setTransactions(response.data))
      .catch((err) => console.log('Error Fetching transactions:', err));

      console.log(transactions);
  }, []);

  // Format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Group transactions by date
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const formattedDate = formatDate(transaction.date);
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(transaction);
    return acc;
  }, {});

  // Calculate balances
  const currentBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'donation') return acc + transaction.amount;
    return acc - transaction.amount;
  }, 0);

  const currentExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  console.log(transactions);
  return (
    <div className="mt-[100px] font-sans">
      {/* Hero Section */}
      <section
        className="bg-[#EEEEEE] hero bg-cover bg-center h-screen text-black flex flex-col justify-center items-center"
      
      >
        <div className="bg-opacity-50 w-full h-full flex justify-center items-center">
          <div className="text-center px-6 md:px-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Birthday Collection Site</h1>
            <p className="text-lg sm:text-xl mb-6"></p>
       
          </div>
        </div>
      </section>

      
      <section id="about-us" className="py-16 bg-[#f7f7f7]">
       
         

        {/* Donors Section */}
        <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
          
        </div>
      </section>


      {/* Expense Section */}
      <section id="expenses" className="py-16 bg-[#f7f7f7]">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">Expenses</h2>

          {/* Current Balance and Expense */}
          <div className="mb-8">
            <div className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Current Balance: ₹{currentBalance.toFixed(2)}
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Total Expense Done: ₹{currentExpense.toFixed(2)}
            </div>
          </div>

          {/* Transaction List */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Transactions</h3>
            <div className="space-y-4">
              {Object.keys(groupedTransactions).map((date) => (
                <div key={date}>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">{date}</h4>
                  {groupedTransactions[date].map((transaction) => (
                    <div
                      key={transaction.id}
                      className={`p-4 rounded-lg shadow-md ${
                        transaction.type === 'donation' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-700">
                          {transaction.type === 'donation' ? 'Donation' : 'Expense'}
                        </span>
                        <span className="text-md text-lg text-gray-600">{transaction.description}</span>
                        {transaction.type == 'donation' && (<div>  Room no: {transaction.room}</div>)}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-gray-700">Amount: ₹{transaction.amount}</span>
                        
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
