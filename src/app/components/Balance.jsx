import React, {useEffect, useState}from 'react'
import { database, ref} from '../../lib/firebase';
import { onValue } from 'firebase/database';


const Balance = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Veritabanından işlemleri çek
    const transactionsRef = ref(database, 'transactions');
    const fetchTransactions = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // İşlemleri diziye çevir ve state'leri güncelle
        const transactionList = Object.values(data);
        setTransactions(transactionList);
        // Toplam geliri ve gideri hesapla
        const income = transactionList
          .filter((transaction) => transaction.type === 'income')
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        const expense = transactionList
          .filter((transaction) => transaction.type === 'expense')
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        setTotalIncome(income);
        setTotalExpense(expense);
      }
    })
    return () => {
      //Veri çekme işlemini durdur
      fetchTransactions();
    };
  }, []);
  // Toplam bakiye hesapla
  const totalBalance = totalIncome - totalExpense;
  
  return (
    <div className='container_b'>
      <p>Your Balance</p>
      <span>{totalBalance}</span>
      
    </div>
  )
}

export default Balance