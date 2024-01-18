import React, { useState } from 'react';
import { database, ref, push} from '../../lib/firebase';

const Transaction = ({onTransactionAdded}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  // Yeni bir işlem eklemek için kullanılan fonksiyon
  const handleAddTransaction = () => {
    // Veritabanı referansını oluştur
    const transactionsRef = ref(database, 'transactions');
    // Yeni işlem nesnesini oluştur
    const newTransaction = {
      title,
      amount: parseFloat(amount),
      type,
    };
    // Yeni işlemi veritabanına ekle ve referansını al
    const newTransactionRef = push(transactionsRef, newTransaction);
    // Eklenen işlemin referansından anahtarını al
    const newTransactionKey = newTransactionRef.key;
    if (newTransactionKey) {
      console.log('Transaction added with key:', newTransactionKey);
      onTransactionAdded({ ...newTransaction, id: newTransactionKey });
    } else {
      console.error('Error getting new transaction key');
    }
  };

  return (
    <div className='transaction'>
      <fieldset>
        <legend>Transaction</legend>
        <div className='container'>
          <label htmlFor="title">TITLE</label><br/>
          <input type='text' 
          id='title' 
          placeholder='Enter title' 
          value={title} onChange={(e) => setTitle(e.target.value)}/><br/>
          <label htmlFor="amount">AMOUNT</label><br/>
          <input type='number'
          id='amount'
          placeholder='Enter amount'
          value={amount} onChange={(e) => setAmount(e.target.value)}/><br/>
          <label htmlFor="type">TYPE</label><br/>
          <select className='types'
          id='types'
          value={type}
          onChange={(e) => setType(e.target.value)} >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <br/>
          <button onClick={handleAddTransaction}>Add</button>
        </div>
      </fieldset>
    </div>
  );
}

export default Transaction
