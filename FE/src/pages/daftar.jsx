import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Daftar = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Signup Berhasil!',
        text: 'Silakan login untuk melanjutkan.',
        timer: 2000,
      }).then(() => {
        window.location.href = '/masuk';
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Registrasi gagal. Silakan coba lagi.',
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
    btn: {
      marginTop: '17px',
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
      marginTop: '34px',
      color: '#333',
      marginBottom: '24px',
    },
    signupLink: {
      color: '#36506c',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.h1}>Daftar</h1>
        <div style={styles.inputGroup}>
          <label htmlFor="nama"></label>
          <input
            type="text"
            id="nama"
            placeholder="Nama"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button
          className="btn"
          style={{ ...styles.btn, ...(styles.btnHover && { ':hover': styles.btnHover }) }}
          onClick={handleSignup}
        >
          Daftar
        </button>
        <p style={styles.signupMessage}>
          Sudah punya Akun? <a href="/masuk" style={styles.signupLink}>Masuk</a>
        </p>

      </div>
    </div>
  );
};

export default Daftar;
