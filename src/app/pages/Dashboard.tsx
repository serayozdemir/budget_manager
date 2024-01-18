import React, { useState} from 'react';
import Welcome from '../components/Welcome';
import Balance from '../components/Balance';
import Income from '../components/Income';
import Expense from '../components/Expense';
import Transaction from '../components/Transaction';
import History from '../components/History';

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleTransactionAdded = (newTransaction:any ) => {
    // Yeni işlem eklenince gelir, gider ve bakiyeyi güncelle
    if (newTransaction.type === 'income') {
      setTotalIncome((prevTotalIncome) => prevTotalIncome + newTransaction.amount);
    } else if (newTransaction.type === 'expense') {
      setTotalExpense((prevTotalExpense) => prevTotalExpense + newTransaction.amount);
    }
    // Bakiyeyi güncelle
    setTotalBalance((prevTotalBalance) => prevTotalBalance + newTransaction.amount);
  };

  const handleTransactionDeleted = (deletedTransaction: any ) => {
    if (deletedTransaction.type === 'income') {
      setTotalIncome((prevTotalIncome) => prevTotalIncome - deletedTransaction.amount);
    } else if (deletedTransaction.type === 'expense') {
      setTotalExpense((prevTotalExpense) => prevTotalExpense - deletedTransaction.amount);
    }
    // Son transaction nesnesi olup olmadığını kontrol ediyoruz
    if (transactions.length === 1 && transactions[0] === deletedTransaction.id) {
      // silinen işlem son işlemse toplamları buna göre güncelliyoruz
      setTotalBalance((prevTotalBalance) => prevTotalBalance - deletedTransaction.amount);
      setTotalIncome(0);
      setTotalExpense(0);
    } else {
      // Bakiyeyi güncelle
      setTotalBalance((prevTotalBalance) => prevTotalBalance - deletedTransaction.amount);
    }
    // Silinen işlemi transactions listesinden filtrele
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== deletedTransaction.id);
    setTransactions(updatedTransactions);
  };

  return (
    <div className='dashboard'>
      <div className="container_out">
        <Welcome/>
        <div className='container-flex'>
          <Balance totalIncome={totalIncome} totalExpense={totalExpense} totalBalance={totalBalance} />
          <Income totalIncome={totalIncome} />
          <Expense totalExpense={totalExpense} />
        </div>
        <div className='container-row'>
          <Transaction 
          onTransactionAdded={handleTransactionAdded}
          />
          <History onTransactionDeleted={handleTransactionDeleted} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
