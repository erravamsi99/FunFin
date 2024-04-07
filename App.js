// App.js (React Frontend)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get('/api/transactions');
      setTransactions(res.data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>FunFin: Your AI-Powered Personal Finance Planner</h1>
      {/* Transaction list and input components go here */}
    </div>
  );
}

export default App;
