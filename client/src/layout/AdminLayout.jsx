import React, { useEffect, useState } from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import axiosInstance from '../services';
import { toast } from 'react-toastify';

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState({
    description: "",
    room: "",
    amount: "",
    type: "donation", // Default type set to donation
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/transaction", member, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      // Show success notification
      toast.success("Transaction Added Successfully!");

      // Reset form to default values
      setMember({
        description: "",
        room: "",
        amount: "",
        type: "donation",
      });
    } catch (error) {
      setLoading(false);
      console.error("Error adding transaction:", error);

      // Show error notification
      toast.error("Transaction Adding Failed!");
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axiosInstance.get('/user/isadmin', { withCredentials: true });
        setIsAdmin(response.data.Success ? true : false);
      } catch (error) {
        console.error('Error during admin check:', error);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return isAdmin ? (
    <div className="mt-[80px] min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-4 text-white">
      <h1 className="text-[#F96D00] text-center py-4 text-3xl sm:text-4xl font-semibold">
        Admin Dashboard
      </h1>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-gray-700 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-[#F96D00] mb-6">
            Add New Transaction
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold" htmlFor="description">
                Name
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="mt-2 block w-full px-4 py-2 text-gray-800 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F96D00]"
                value={member.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-semibold" htmlFor="amount">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="mt-2 block w-full px-4 py-2 text-gray-800 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F96D00]"
                value={member.amount}
                onChange={handleChange}
                required
              />
            </div>

            {/* room Input */}
            <div>
              <label className="block text-sm font-semibold" htmlFor="room">
                Room no.
              </label>
              <input
                type="text"
                id="room"
                name="room"
                className="mt-2 block w-full px-4 py-2 text-gray-800 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F96D00]"
                value={member.room}
                onChange={handleChange}
                required
              />
            </div>

            {/* Transaction Type Input */}
            <div>
              <label className="block text-sm font-semibold" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                name="type"
                className="mt-2 block w-full px-4 py-2 text-gray-800 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F96D00]"
                value={member.type}
                onChange={handleChange}
              >
                <option value="donation">Donation</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#F96D00] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#d85b00] transition duration-300"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Transaction"}
            </button>
          </form>
        </div>
      </div>
      <div className="p-3">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminLayout;
