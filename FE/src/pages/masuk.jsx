import { useState, useEffect } from 'react';
import Home from '../components/home';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Masuk = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Gagal masuk');
      }
      localStorage.setItem('token', data.data);
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        timer: 2000,
      }).then(() => {
        window.location.href = '/users';
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login gagal. Silakan coba lagi.',
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/users';
    }
  }, []);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#ebf7fd',
    },
    formContainer: {
      backgroundColor: '#fff',
      padding: '30px 80px',
      borderRadius: '5px',
      textAlign: 'center',
    },
    h1: {
      fontSize: '38px',
      fontWeight: 'bold',
      marginBottom: '12px',
      color: '#36506c',
    },
    inputGroup: {
      marginBottom: '15px',
    },

    input: {
      width: '100%',
      padding: '8px 180px 8px 24px',
      border: '1px solid #545454',
      borderRadius: '8px',
      boxSizing: 'border-box',
      fontSize: '16px',
      color: '#333',
      textAlign: 'left',
    },
    forgotPassword: {
      display: 'block',
      marginBottom: '15px',
      color: '#ff895d',
      textDecoration: 'none',
      textAlign: 'right',
      fontSize: '13px',
      fontWeight: 'bold',
    },
    btn: {
      backgroundColor: '#36506c',
      color: '#fff',
      padding: '8px 230px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    },
    btnHover: {
      backgroundColor: '#0069d9',
    },
    signupMessage: {
      marginTop: '54px',
      color: '#333',
    },
    signupLink: {
      color: '#36506c',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    backMessage: {
      marginTop: '8px',
      color: '#333',
    },
    backLink: {
      color: '#36506c',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.h1}>Masuk</h1>
        <div style={styles.inputGroup}>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Kata Sandi"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="#" style={styles.forgotPassword}>Lupa kata sandi?</a>
        <button
          className="btn"
          style={{ ...styles.btn, ...(styles.btnHover && { ':hover': styles.btnHover }) }}
          onClick={handleLogin}
        >
          Masuk
        </button>
        <p style={styles.signupMessage}>
          Belum punya Akun? <a href="/daftar" style={styles.signupLink}>Daftar</a>
        </p>
        <p style={styles.backMessage} className="flex flex-baseline items-center justify-center">
    Kembali ke{' '}
    <Link to="/" className="inline-flex items-center">
    <span>&nbsp;</span><Home /><span>&nbsp;</span>
      <span className='text-primary font-bold'>Beranda</span>
    </Link>
  </p>
      </div>
    </div>
  );
};

export default Masuk;
