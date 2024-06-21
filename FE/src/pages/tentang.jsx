const tentang = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
        <div style={{
            padding: "100px 200px 100px"
        }}>
      <h1 style={{
        paddingTop: "1.2em",
        fontSize: "40px",
        marginBottom: "1em",
        fontWeight: "bold",
        color: "#405973"
      }}>TENTANG KAMI</h1>
      <p style={{
        textAlign: "center",
        marginBottom: "2em",
        fontSize: "20px",
        // textAlign: "left"
      }}>Selamat datang di <a style={{color: '#405973', fontWeight: 'bold'}}>Info Pegi</a>, destinasi online utama 
      Anda untuk menjelajahi keindahan dan pesona destinasi 
      pariwisata di Yogyakarta. Kami di sini untuk membantu 
      Anda merencanakan petualangan impian Anda dengan 
      informasi terbaru tentang tempat-tempat yang menakjubkan, 
      atraksi menarik, dan pengalaman tak terlupakan.</p>
      
      <h2 style={{
        paddingTop: '20px',
        fontSize: "40px",
        marginBottom: "10px",
        fontWeight: "bold",
        color: "#405973"
      }}>

        APA YANG KAMI TAWARKAN</h2></div>
        <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      gap: '100px',
      paddingBottom: '100px'
    }}>
      <div style={{
        flex: '1',
        backgroundColor: "#405973",
        padding: '87.5px 1px',
        borderRadius: "10px",
        textAlign: "center"
      }}>
        <p style={{ marginTop: "1em", color: "#fff" }}>Informasi destinasi secara detail termasuk informasi cuaca terkini.</p>
      </div>
      <div style={{
        padding: '100px 10px',
        flex: '1',
        backgroundColor: "#405973",
        borderRadius: "10px",
        textAlign: "center"
      }}>
        <p style={{ marginTop: "1em", color: "#fff" }}>Ulasan dan rekomendasi di setiap destinasi.</p>
      </div>
    </div>
    </div>
  )
};

export default tentang;
