import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function Destinasi() {
  const [childCount, setChildCount] = useState(0);
  const [teenCount, setTeenCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [destination, setDestination] = useState(null);
  const [statusBuka, setStatusBuka] = useState("Tutup");
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    fetch(`${import.meta.env.VITE_API_URL}/destinations/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const destinationData = {
          id: data.id,
          name: data.name,
          category: data.category,
          rating: data.rating,
          anak: data.anak,
          dewasa: data.dewasa,
          fasilitas: data.fasilitas,
          jadwal: data.jadwal,
          image: data.hero_image,
          lokasi: data.lokasi,
          description: data.description,
          totalReview: data.totalReview,
        };
        setDestination(destinationData);

        const jadwalString = data.jadwal;
        const jadwal = jadwalString.substring(jadwalString.indexOf('Jam') + 4).trim();
        const [jamBuka, jamTutup] = jadwal.split(' - ');

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentFormattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

        const isBuka = isWithinOpeningHours(currentFormattedTime, jamBuka, jamTutup);
        setStatusBuka(isBuka ? 'Buka' : 'Tutup');

        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching destination:", error));
  }, []);

  const isWithinOpeningHours = (currentTime, jamBuka, jamTutup) => {
    return currentTime >= jamBuka && currentTime <= jamTutup;
  };
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handlePesan = () => {
    if (childCount > 0 || teenCount > 0) {
      Swal.fire({
        title: 'Tiket berhasil dibuat',
        icon: 'success',
        timer: 2000,
        showTimerProgress: true
      }).then(() => {
        window.location.href = `/Payment?id=${destination.id}&anak=${childCount}&dewasa=${teenCount}`;
      });
    } else {
      Swal.fire({
        title: 'Tiket tidak boleh kosong',
        icon: 'warning'
      });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.global}>
      <div className="flex justify-center items-center mt-[120px]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-[60%] h-[500px] rounded-[50px]"
        />
      </div>
      <div style={styles.contentContainer}>
        <h1 style={styles.h1}>{destination.name}</h1>
        <p className="flex items-center space-x-2 h-auto">
          <div className="flex items-baseline space-x-1">
            <h1 className="text-2xl font-bold">{destination.rating}</h1>
            <h2 className="text-xl">/5</h2>
          </div>
          <a
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            href={`/review?id=${destination.id}`}
          >
            Lihat{" "}
            {destination.totalReview > 10 ? "10+" : destination.totalReview}{" "}
            review
          </a>
          <svg
            className="w-4 h-4 text-blue-500"
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
        </p>{" "}
        <p style={styles.location}>{destination.lokasi}</p>
        <div style={styles.info}>
            <p className={`${statusBuka === 'Buka' ? 'text-green-500' : 'text-red-500'}`}>{statusBuka}</p>&nbsp;{destination.jadwal}
        </div>
        <div style={styles.info}>
          <div style={styles.text}>
            <p>{destination.fasilitas}</p>
          </div>
        </div>
        <p style={styles.description}>
      {showFullDescription ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: destination.description }} />
          <a
            style={{ color: "#405973", fontWeight: "bold", cursor: "pointer" }}
            onClick={toggleDescription}
          >
            Sembunyikan
          </a>
        </>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: `${destination.description.slice(0, 300)}...` }} />
          <a
            style={{ color: "#405973", fontWeight: "bold", cursor: "pointer" }}
            onClick={toggleDescription}
          >
            Lihat selengkapnya
          </a>
          .
        </>
      )}
    </p>
        {
          destination.category !=  "Pusat Belanja" && (
            <>
            <h1 style={styles.h1}>Tiket</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <div>ANAK-ANAK</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "coral", marginRight: "5px" }}>
                    Rp {destination.anak.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </span>
                  <span style={{ marginRight: "90px" }}>/pax</span>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                      padding: "5px 14px 5px",
                    }}
                    onClick={() => {
                      setChildCount(childCount - 1);
                      if (childCount <= 0) {
                        setChildCount(0);
                      }
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      padding: "0 10px",
                    }}
                  >
                    {childCount}
                  </span>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                      padding: "5px 14px 5px",
                    }}
                    onClick={() => setChildCount(childCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <div>DEWASA</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "coral", marginRight: "5px" }}>
                    Rp {destination.dewasa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </span>
                  <span style={{ marginRight: "90px" }}>/pax</span>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                      padding: "5px 14px 5px",
                    }}
                    onClick={() => {
                      setTeenCount(teenCount - 1);
                      if (teenCount <= 0) {
                        setTeenCount(0);
                      }
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      padding: "0 10px",
                    }}
                  >
                    {teenCount}
                  </span>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                      padding: "5px 14px 5px",
                    }}
                    onClick={() => setTeenCount(teenCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div style={styles.pesanContainer}>
              <button style={styles.pesan} onClick={handlePesan}>Pesan</button>
            </div>
            </>
          )
        }
      </div>
      
    </div>
  );
}

const styles = {
  global: {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
    color: "#333",
  },
  imageContainer: {
    marginTop: "150px",
    width: "100%",
    height: "900px",
    overflow: "hidden",
    borderRadius: "1px",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "1px",
  },
  contentContainer: {
    padding: "50px 150px 150px",
    backgroundColor: "#fff",
  },
  h1: {
    fontSize: "48px",
    fontWeight: "bold",
    paddingBottom: "27px",
    color: "#36506c",
  },
  rating: {
    fontSize: "38px",
    fontWeight: "bold",
    color: "#373737",
    marginBottom: "20px",
    paddingRight: "13px",
  },
  location: {
    paddingTop: "20px",
    fontSize: "16px",
    color: "#000",
    marginBottom: "20px",
  },
  info: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  tutup: {
    fontSize: "16px",
    color: "red",
  },
  description: {
    fontSize: "16px",
    color: "#000",
    marginBottom: "20px",
  },
  ticketContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  ticket: {
    width: "411%",
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "10px",
  },
  price: {
    fontSize: "16px",
    color: "#999",
    marginBottom: "10px",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
  },
  quantityButton: {
    width: "24px",
    height: "24px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#666",
    color: "#fff",
    cursor: "pointer",
  },
  quantitySpan: {
    fontSize: "16px",
    color: "#666",
    margin: "0 10px",
  },
  pesanContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
    color: "#36506c",
  },
  pesan: {
    width: "210px", // Adjust width as needed
    height: "40px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#36506c",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  pesanHover: {
    backgroundColor: "#555",
  },
};

export default Destinasi;
