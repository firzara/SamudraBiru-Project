import { useState, useEffect } from "react";

const Ticket = () => {
  const [ticketData, setTicketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/ticket`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTicketData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ticket data:", error);
        setIsLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    if (expandedItemId === id) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(id);
    }
  };

  const handlePrint = (id) => {
    const contentToPrint = document.getElementById(
      `ticket-content-${id}`
    ).innerHTML;
    const printWindow = window.open("", "", "height=400,width=600");

    printWindow.document.write("<html><head><title>Tiket</title>");
    printWindow.document.write(
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">'
    ); // Tambahkan link CSS Tailwind di sini
    printWindow.document.write(
      "<style>@media print { #print-button { display: none; } #toggle-icon { display: none; } }</style>"
    ); // Aturan CSS untuk menyembunyikan tombol cetak saat mencetak
    printWindow.document.write("</head><body>");
    printWindow.document.write(contentToPrint);
    printWindow.document.write("</body></html>");

    printWindow.document.close();
    printWindow.print();
  };
  if (isLoading) {
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
          Ticket
        </div>

        {ticketData.length === 0 ? (
          <div>Tidak ada tiket.</div>
        ) : (
          ticketData.map((item) => (
            <div key={item.id} style={styles.form} id={`ticket-content-${item.id}`}>
              <div className="w-[100%] min-h-[100px] bg-transparent border-[3px] border-[#ddd] rounded-[20px] drop-shadow-sm overflow-y-auto p-[20px]">
                <div className="flex justify-between items-cente">
                  <div className="text-[20px]">
                    <div className="flex flex-col font-bold text-primary">
                      Tiket Masuk {item.transaction.destination.name}
                    </div>
                    <div className="text-[14px] mt-2 font-bold text-primary">
                      Tiket ID: {item.ticket_id}
                    </div>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <div className="text-2xl font-bold text-[#FF895D]">
                      Rp { (item.transaction.total_price).toLocaleString("id-ID")}
                    </div>
                    <div
                      id="toggle-icon"
                      className="text-2xl cursor-pointer"
                      onClick={() => toggleExpand(item.id)}
                    >
                      <svg
                        className={`w-8 h-8 text-blue-500 transform transition-transform ${
                          expandedItemId === item.id ? "rotate-90" : ""
                        }`}
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
                </div>
                {expandedItemId === item.id && (
                  <>
                    <div className="font-semibold text-[28px] mt-8 text-primary">
                      Detail Pesanan
                    </div>
                    <div className="font-semibold text-[14px] text-primary mt-2">
                      <p>Tanggal Booking: {new Date(item.transaction.date_booking).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p>Tanggal Expired: {new Date(item.expired_at).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="text-[14px] text-primary mt-2">
                      Transaksi ID: {item.transaction.id}
                    </div>

                    <div className="font-semibold text-[14px] text-primary mt-8">
                      Info Pemesanan:
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="w-[70%] text-[16px] text-primary">
                        Dewasa
                      </div>
                      <div className="w-[10%] text-[16px] text-primary flex justify-end">
                        {item.transaction.adult}
                      </div>
                      <div className="w-[20%] text-[16px] text-primary flex justify-end">
                        Rp. {(item.transaction.adult * item.transaction.destination.dewasa).toLocaleString("id-ID")}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="w-[70%] text-[16px] text-primary">
                        Anak&nbsp;&nbsp;&nbsp;&nbsp;
                      </div>
                      <div className="w-[10%] text-[16px] text-primary flex justify-end">
                        {item.transaction.child}
                      </div>
                      <div className="w-[20%] text-[16px] text-primary flex justify-end">
                        Rp. {(item.transaction.child * item.transaction.destination.anak).toLocaleString("id-ID")}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="w-[70%] text-[16px] font-extrabold text-primary">
                        Total Pesanan
                      </div>
                      <div className="w-[30%] text-[16px] font-extrabold flex justify-end text-secondary">
                        Rp. {(item.transaction.total_price).toLocaleString("id-ID")}
                      </div>
                    </div>
                    <button
                      id="print-button"
                      onClick={() => handlePrint(item.id)}
                      className="w-[100%] h-[60px] bg-primary rounded-[20px] text-[#fff] text-[24px] font-bold mt-8"
                    >
                      Cetak Tiket
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
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
    marginTop: "20px",
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

export default Ticket;
