import { Link } from "react-router-dom";
import SVGComponent from "../components/icon";
import { useEffect, useState } from "react";

const Payment = () => {
  const [paymentData, setPaymentData] = useState({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const dataOrder = {
          id: data.id,
          snap_url: data.snap_url,
          status: data.status,
        }
        setPaymentData(dataOrder);
      })
  }, [])

  return (
    <div className="w-[100%] p-[120px] bg-[#EBF7FD]">
      <div className="w-[100%] flex flex-col gap-8 rounded-[25px] bg-[#fff] p-[100px] mt-8">
        <div className="w-[100%] flex flex-row justify-center">
          <SVGComponent />
        </div>
        <div className="w-[100%] flex flex-row justify-center">
          <h1 className="text-[24px] font-bold text-primary">Pesanan sedang diproses</h1>
        </div>
        <div className="w-[100%] flex flex-row justify-center">
          <button onClick={() => window.open(paymentData.snap_url, '_blank')} className="w-[60%] h-[60px] bg-primary rounded-[20px] text-[#fff] text-[24px] font-bold">
            Bayar Sekarang
          </button>
        </div>
        <div className="w-[100%] flex flex-row justify-center">
          <p className="text-[16px] text-primary">Cari <Link to="/category" className=" font-bold"> destinasi wisata </Link>lain</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
