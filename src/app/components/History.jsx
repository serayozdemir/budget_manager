import React, { useState, useEffect } from "react";
import { database, ref, onValue, remove } from '../../lib/firebase';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const History = ({ onTransactionDeleted }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Component yüklendiğinde veriyi çek
    fetchData();
  }, []);
  // Veriyi çekme işlemi
  const fetchData = () => {
    const transactionsRef = ref(database, 'transactions');
    onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Veriyi diziye çevir ve state'i güncelle
        const transactionList = Object.entries(data).map(([id, transaction]) => ({ id, ...transaction }));
        setTransactions(transactionList);
      }
    });
  };

  const handleDeleteButtonClick = (transactionId) => {
    const transactionRef = ref(database, `transactions/${transactionId}`);
    // Firebase'den veriyi silme
    remove(transactionRef)
      .then(() => {
        console.log('Transaction deleted successfully');
        // Silinen işlemi state'ten kaldır
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== transactionId)
        );
        onTransactionDeleted(transactionId); // Silinen işlemi bildir
        // Silme işleminden sonra güncel veriyi çek
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting transaction:', error);
      });
  };
  return (
    <div className="container_h">
      <fieldset>
      <legend>History</legend>
        <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDeleteButtonClick(transaction.id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </fieldset>
      
    </div>
  );
};

export default History
