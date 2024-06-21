import { useEffect, useState } from "react";

const Riwayat = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setHistoryData(data);
      } else {
        setHistoryData([]);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setHistoryData([]);
      setLoading(false);
    });
  }, []);

  const toggleExpand = (id) => {
    if (expandedItemId === id) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(id);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <div style={styles.accountInfo}>
        <div style={styles.sectionTitle} className="text-[20px] font-bold">
          Riwayat Pesanan
        </div>
        <div style={styles.form} className="gap-[20px]">
          {historyData.length === 0 ? (
            <div>Tidak ada riwayat pesanan.</div>
          ) : (
            historyData.map((item) => (
              <div key={item.id} className="w-full h-auto p-[30px] flex flex-col bg-transparent border-[3px] border-[#ddd] rounded-[20px] drop-shadow-sm overflow-y-auto mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[20px]">
                    <div className="bg-green-500 w-[180px] h-[180px] rounded-[10px]" style={{ backgroundImage: `url(${item.destination.hero_image})`, backgroundSize: 'cover' }}></div>
                    <div className="flex flex-col">
                      <div className="text-[20px] font-bold text-primary">
                        {item.destination.name}
                      </div>
                      <div className="text-[14px] mt-2 text-primary">Transaksi ID: {item.id}</div>
                    </div>
                  </div>
                  <div className="text-2xl cu" onClick={() => toggleExpand(item.id)}>
                    <svg
                      className={`w-8 h-8 text-blue-500 transform transition-transform ${expandedItemId === item.id ? "rotate-90" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                {expandedItemId === item.id && (
                  <>
                    <div className="font-semibold text-[28px] mt-8 text-primary">
                      Detail Pesanan
                    </div>
                    <div className="font-semibold text-[14px] text-primary mt-2">
                      Tanggal Booking: {new Date(item.date_booking).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-[14px] text-primary mt-2">Transaksi ID: {item.id}</div>
                    <div className="font-semibold text-[14px] text-primary mt-8">
                      Info Pemesanan:
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="w-[70%] text-[16px] text-primary">Dewasa</div>
                      <div className="w-[10%] text-[16px] text-primary flex justify-end">{item.adult}</div>
                      <div className="w-[20%] text-[16px] text-primary flex justify-end">Rp. { (item.destination.dewasa * item.adult).toLocaleString("id-ID")}</div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="w-[70%] text-[16px] text-primary">Anak</div>
                      <div className="w-[10%] text-[16px] text-primary flex justify-end">{item.child}</div>
                      <div className="w-[20%] text-[16px] text-primary flex justify-end">Rp. { (item.destination.anak * item.child).toLocaleString("id-ID")}</div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="w-[70%] text-[16px] font-extrabold text-primary">Total Pesanan</div>
                      <div className="w-[30%] text-[16px] font-extrabold flex justify-end text-secondary">Rp. { (item.total_price).toLocaleString("id-ID")}</div>
                    </div>
                    <div className="font-semibold text-[14px] text-primary mt-8">
                      Info Kontak:
                    </div>
                    <div className="text-[14px] text-primary">{item.user.name}</div>
                    <div className="text-[14px] text-primary">{item.user.phone || "Tidak ada nomor telepon"}</div>
                    <div className="text-[14px] text-primary">{item.user.email}</div>
                    {item.status === "Pending" ? (
                      <button onClick={() => window.open(item.snap_url, '_blank')} className="w-[100%] h-[60px] bg-primary rounded-[20px] text-[#fff] text-[24px] font-bold mt-8">
                        Bayar Sekarang
                      </button>
                    ) : item.status === "Berhasil" ? (
                      <button disabled className="w-[100%] h-[60px] bg-green-500 rounded-[20px] text-[#fff] text-[24px] font-bold mt-8">
                        Pesanan sudah dibayar
                      </button>
                    ) : null}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    color: "#333",
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

export default Riwayat;
