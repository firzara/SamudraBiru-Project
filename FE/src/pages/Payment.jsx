import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const FloatingLabelInput = ({ type, placeholder, value, readOnly, onChange }) => {
  FloatingLabelInput.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func, // Tambahkan propTypes untuk onChange
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={onChange} // Tambahkan onChange di sini
        className={`w-full h-[80px] border-[1px] border-[#000] rounded-[20px] p-2 pt-6 placeholder-transparent ${
          isFocused || value ? "pt-6" : ""
        }`}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label
        className={`absolute left-4 transition-all duration-200 ${
          isFocused || value
            ? "top-1 text-xs text-gray-500"
            : "top-6 text-base text-gray-400"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};

const Payment = () => {
  const [price, setPrice] = useState({});
  const [qty, setQty] = useState({});
  const todayDate = new Date().toISOString().split("T")[0];
  const [tanggal, setTanggal] = useState(todayDate);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const anak = searchParams.get("anak");
    const dewasa = searchParams.get("dewasa");
    console.log(id, anak, dewasa);
    const qtyData = {
      id: id,
      anak: anak,
      dewasa: dewasa,
    };
    setQty(qtyData);
    fetch(`${import.meta.env.VITE_API_URL}/price/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const priceData = {
          anak: data.anak,
          dewasa: data.dewasa,
        };
        setPrice(priceData);
      });
  }, []);

  async function handlePesanan() {
    console.log(tanggal);
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: qty.id,
        anak: qty.anak,
        dewasa: qty.dewasa,
        date_booking: tanggal,
      })
    })
    .then(response => response.json())
    .then((data) => {
      console.log("id", data.id)
      Swal.fire({
        title: 'Pesanan Berhasil Dibuat',
        text: 'Klik Ok untuk melanjutkan pembayaran',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        window.location.href = `/bayar?id=${data.id}`;
      })
    }).catch(() => {
      Swal.fire({
        title: 'Gagal',
        text: 'Pesanan gagal dibuat',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    });
  }

  return (
    <div className="w-[100%] p-[120px] bg-[#EBF7FD]">
      <h1 className="text-[36px] font-bold text-primary">Detail pemesanan</h1>
      <p>Isi formulir ini dengan benar sesuai dengan data pemesanan</p>
      <div className="w-[100%] flex flex-col gap-8 rounded-[25px] bg-[#fff] p-[50px] mt-8">
        <div className="flex flex-row">
          <FloatingLabelInput type="text" placeholder="Nama" />
        </div>
        <div className="flex flex-row">
          <FloatingLabelInput type="text" placeholder="Phone" />
        </div>
        <div className="flex flex-row">
          <FloatingLabelInput type="text" placeholder="Email" />
        </div>
        <div className="flex flex-row gap-12">
          <FloatingLabelInput
            onChange={(e) => setTanggal(e.target.value)}
            value={tanggal}
            type="date"
            placeholder="Tanggal Kunjungan"
          />
          <FloatingLabelInput
            type="text"
            placeholder="Tiket"
            value={`Tiket (${qty.anak} Anak, ${qty.dewasa} Dewasa)`}
            readOnly
          />
        </div>
        <div className="flex flex-row border-[1px] border-[#000] rounded-[20px] w-[100%] h-[80px] p-[20px]">
          <div className="w-[50%] flex flex-start justify-start">
            <h1 className="text-[24px] font-bold">Total Harga</h1>
          </div>
          <div className="w-[50%] flex flex-end justify-end">
            <h1 className="text-[24px] font-bold">
              Rp.{" "}
              {(
                price.anak * qty.anak +
                price.dewasa * qty.dewasa
              ).toLocaleString("id-ID")}
            </h1>
          </div>
        </div>
      </div>
      <button
        onClick={handlePesanan}
        className="w-[100%] h-[60px] bg-primary rounded-[20px] text-[#fff] text-[24px] font-bold mt-8"
      >
        Pesan Sekarang
      </button>
    </div>
  );
};

export default Payment;
