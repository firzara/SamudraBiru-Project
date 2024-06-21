import { useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const Account = ({data}) => {
  Account.propTypes = {
    data: PropTypes.object.isRequired
  };
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: data.password,
    gender: data.gender,
  });
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if(!response.ok) {
        throw new Error(data.message || 'Error saving data');
      }
      Swal.fire({
        title: 'Berhasil',
        text: 'Data berhasil disimpan',
        icon: 'success',
        timer: 2000,
      });
    } catch (error) {
      console.error('Error saving data:', error);
      Swal.fire({
        title: 'Gagal',
        text: 'Data gagal disimpan',
        icon: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };
  
  return (
    <div style={styles.rightBox}>
      <div style={styles.backButton} onClick={() => window.history.back()}>
        <div className="flex items-center gap-[10px]">
          <svg
            className="w-8 h-8 text-blue-500 transform rotate-180"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>{" "}
          Kembali
        </div>
      </div>
      <div style={styles.accountInfo} className="border-[3px] border-[#ddd] rounded-[10px] p-[20px]">
        <div style={styles.sectionTitle}>Akunku</div>
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nama Lengkap</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nomor Ponsel</label>
            <input
              style={styles.input}
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Jenis Kelamin</label>
            <select
              style={styles.input}
              name="gender"
              value={userData.gender ? userData.gender : 'Laki-laki'}
              onChange={handleInputChange}
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <button style={styles.saveButton} onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
    container: {
      display: "flex",
      fontFamily: "Arial, sans-serif",
      color: "#333",
    },
    leftBox: {
      // width: '250px',
      // padding: '20px',
      // backgroundColor: '#f5f5f5',
      // marginRight: '20px',
      // borderRadius: '5px',
      // border: '1px solid #ddd',
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#ddd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      marginRight: "10px",
    },
    userName: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    userEmail: {
      fontSize: "14px",
      color: "#777",
    },
    menu: {
      display: "flex",
      flexDirection: "column",
    },
    menuItem: {
      padding: "10px 0",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
    },
    activeMenuItem: {
      fontWeight: "bold",
      color: "#007bff",
    },
    icon: {
      marginRight: "10px",
    },
    rightBox: {
      flex: 1,
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    backButton: {
      cursor: "pointer",
      marginBottom: "20px",
    },
    accountInfo: {
      padding: "20px",
    },
    sectionTitle: {
      fontSize: "20px",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      marginBottom: "5px",
      fontSize: "14px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "14px",
      width: "100%",
    },
    dateInput: {
      display: "flex",
      justifyContent: "space-between",
    },
    dateField: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "14px",
      width: "30%",
    },
    saveButton: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  export default Account;