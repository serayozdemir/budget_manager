import React, {useEffect, useState}from 'react'
import { database, ref} from '../../lib/firebase';
import { onValue } from 'firebase/database';

const Income = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  
  useEffect(() => {
    // Firebase veritabanındaki 'transactions' referansı
    const transactionsRef = ref(database, 'transactions');
    const fetchTransactions = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const transactionList = Object.values(data);

        setTransactions(transactionList);

        // toplam geliri hesapla
        const income = transactionList
          .filter((transaction) => transaction.type === 'income')
          .reduce((acc, transaction) => acc + transaction.amount, 0);
        // Toplam geliri state'e kaydet
        setTotalIncome(income);
      }
    });
    return () => {
      // Komponent sona erdiğinde veritabanı dinlemeyi durdur
      fetchTransactions();
    };
  }, []);

  return (
    <div className='container_income'>
      <p>Your Income</p>
      <span>{totalIncome}</span>

    </div>
  )
}

export default Income