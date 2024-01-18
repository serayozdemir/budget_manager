import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth} from '../../lib/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // boş form gönderimini engelliyoruz 

    try {
      //  '../../lib/firebase' den gelen auth objectini kullanıyoruz
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // eğer giriş başarılıysa dashboarda yönlendiriyoruz
      navigate("/dashboard");
    } catch (error: any) {
      setErr(true);

      //  AuthError var mı diye kontrol ediyoruz 
      if (error.code && error.message) {
        console.error('Firebase Authentication Error:', error.code, error.message);
        setErrorMessage(error.message);
      } else {
        console.error('An unexpected error occurred:', error.message);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };
  
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">Budget Manager</span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't you have an account? <Link to="/">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
