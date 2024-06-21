import { useState, useEffect } from "react";
import Account from "./account";
import Ticket from "./Ticket";
import Riwayat from "./Riwayat";

const UserProfile = () => {
  const [menuNavigation, setMenuNavigation] = useState("account");
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json())
    .then(data => {
      const dataUser = {
        name: data.data.name,
        phone: data.data.phone || '',
        email: data.data.email,
        password: data.data.password,
        gender: data.data.gender || ''
      }

      setUserData(dataUser);
      console.log("data", dataUser);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      window.location.href = '/';
    });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={styles.container} className="p-[100px]">
      <div
        style={styles.leftBox}
        className="bg-transparent w-[250px] p-[20px] rounded-[5px] border-[1px] border-[#ddd] mr-[20px]"
      >
        <div style={styles.userInfo}>
          <div style={styles.avatar}>{userData.name.charAt(0)}</div>
          <div>
            <div style={styles.userName}>{userData.name}</div>
            <div style={styles.userEmail}>{userData.email}</div>
          </div>
        </div>
        <div style={styles.menu}>
          <div
            style={{
              ...styles.menuItem,
              ...(menuNavigation === "account" && styles.activeMenuItem),
            }}
            onClick={() => setMenuNavigation("account")}
          >
            <i className="fas fa-cog" style={styles.icon}></i> Akunku
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(menuNavigation === "ticket" && styles.activeMenuItem),
            }}
            onClick={() => setMenuNavigation("ticket")}
          >
            <i className="fas fa-list-alt" style={styles.icon}></i> Tiket
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(menuNavigation === "history" && styles.activeMenuItem),
            }}
            onClick={() => setMenuNavigation("history")}
          >
            <i className="fas fa-history" style={styles.icon}></i> Riwayat
            Pesanan
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(menuNavigation === "logout" && styles.activeMenuItem),
            }}
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
          >
            <i className="fas fa-sign-out-alt" style={styles.icon}></i> Logging Out
          </div>
        </div>
      </div>
      {menuNavigation == "account" ? (
        <Account data={userData} />
      ) : (
        menuNavigation == "ticket" ? (
          <Ticket />
        ) : (
          <Riwayat />
        )
      )}
    </div>
  );
};

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

export default UserProfile;
