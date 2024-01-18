import React, { useState} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget[0] as HTMLInputElement).value;
    const email = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[2] as HTMLInputElement).value;

    try {
      // Yükleme durumunu başlatıp hata durumunu ve mesajını temizliyoruz
      setLoading(true);
      setErr(false);
      setErrorMessage('');
      // Kullanıcı profilini oluşturuyoruz
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      // başarılı oluşturmayı konsola yazdırıyoruz ve dashboard'a yönlendiriyoruz
      console.log('User successfully created and profile updated:', res.user);
      navigate('/dashboard');
    } catch (error: any) {
      // hata durumunda hata durumunu ve mesajını ayarlıyoruz
      setErr(true);
      setErrorMessage(error.message || 'An error occurred during registration.');
      console.error('User creation and profile update error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Budget Manager</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='name' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <button type='submit' disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        {err && <p className="error">{errorMessage}</p>}
        <p>You already have an account? <Link to="/login">Login</Link> </p>
      </div>
    </div>
  );
};

export default Register;
