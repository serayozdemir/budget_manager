import React, {useEffect, useState} from 'react'
import { database, ref} from '../../lib/firebase';
import { onValue } from 'firebase/database';

const Expense = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Component yüklendiğinde veriyi çek
    const transactionsRef = ref(database, 'transactions');
    const fetchTransactions = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Veriyi diziye çevir ve state'i güncelle
        const transactionList = Object.values(data);
        setTransactions(transactionList);
        // Toplam gideri hesapla
        const expense = transactionList
          .filter((transaction) => transaction.type === 'expense')
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        setTotalExpense(expense);
      }
    });

    return () => {
      //Veri çekme işlemini durdur
      fetchTransactions();
    };
  }, []);
  return (
    <div className='container_expense'>
      <p>Your Expense</p>
      <span>{totalExpense}</span>

    </div>
  )
}

export default Expense