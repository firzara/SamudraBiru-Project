import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
const AddReviewModal = ({ isOpen, onClose, id, onSuccess }) => {
  AddReviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  const [rating, setRating] = useState(0); // State for rating input
  const [reviewText, setReviewText] = useState(""); // State for review text input

  async function handleSubmit(event) {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/review`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination_id: id,
        rating: parseFloat(rating),
        review: reviewText,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setRating(0);
        setReviewText("");
        onClose();
        Swal.fire({
          title: "Review berhasil ditambahkan",
          icon: "success",
        }).then(() => {
          onSuccess(); // Panggil fungsi onSuccess setelah menutup Swal
        });
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        Swal.fire({
          title: "Gagal",
          text: "Gagal menambahkan review",
          icon: "error",
        });
      });
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#84C5D6] rounded-lg p-8 w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tambah Review Baru</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="p-[40px] bg-[#fff] rounded-md">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="border-2 border-[#000] rounded-md p-2 mt-1"
                placeholder="Masukkan Nilai"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <textarea
                rows="4"
                className="border-2 border-[#000] rounded-md p-2 mt-1"
                placeholder="Masukkan Review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#405973] text-white p-2 rounded"
            >
              Tambah Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
const Review = () => {
  const [review, setReview] = useState([]);
  const [reviewNum, setReviewNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // State untuk jenis pengurutan (asc atau desc)
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchReviewData = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/review/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.rating - b.rating;
          } else {
            return b.rating - a.rating;
          }
        });
        setReview(sortedData);
        var total = 0;
        for (var i = 0; i < sortedData.length; i++) {
          total += sortedData[i].rating;
        }
        setReviewNum(total / sortedData.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching review data:", error);
        setLoading(false);
      });
  }, [id, sortOrder]);

  useEffect(() => {
    fetchReviewData();
  }, [fetchReviewData]);

  const addNewReview = () => {
    fetchReviewData(); 
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return (
      <div className="w-[100%] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-[120px]">
      <div className="w-[100%] flex justify-start items-baseline gap-4">
      <div onClick={() => window.history.back()} className="flex items-center gap-[10px] cursor-pointer">
          <svg
            className="w-8 h-8 text-[#405973] transform rotate-180"
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
        <h1 className="text-[40px] font-bold text-[#405973]">Review</h1>
      </div>
      <div className="w-[100%] flex flex-row justify-between items-center mt-8">
        <div className="w-[50%] flex items-baseline">
          <h1 className="text-2xl font-bold flex items-center">{ reviewNum }</h1>
          <h2 className="text-xl">/5</h2>
          <div
            className="cursor-pointer w-[150px] h-[40px] ml-[20px] border border-[#000] rounded-[10px] p-[10px] flex items-center justify-center gap-2"
            onClick={toggleSortOrder}
          >
            <svg
              width="23"
              height="27"
              viewBox="0 0 23 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.6665 25.1663V10.583M5.6665 25.1663L1.2915 20.7913M5.6665 25.1663L10.0415 20.7913M17.3332 1.83301V16.4163M17.3332 1.83301L21.7082 6.20801M17.3332 1.83301L12.9582 6.20801"
                stroke="#444444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Urutkan
          </div>
        </div>
        <div>
          <button
            onClick={openModal}
            className="bg-[#405973] text-[#fff] p-[10px] rounded-[10px]"
          >
            Tambah Review baru
          </button>
        </div>
      </div>
      {review.length === 0 ? (
        <div className="w-[100%] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Tidak ada review</h1>
        </div>
      ) : (
        review.map((item) => (
          <div
            key={item.id}
            className="w-[100%] flex flex-col items-center overflow-y-auto mt-12"
          >
            <div className="w-[100%] flex flex-col bg-[#84C5D6] rounded-md p-[40px] overflow-y-auto">
              <div className="w-[100%] flex flex-row">
                <div className="w-[50%] flex flex-col justify-start items-baseline">
                  <h1 className="text-[28px] font-semibold">{item.name}</h1>
                  <h2 className="text-[12px] font-bold">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                </div>
                <div className="w-[50%] flex justify-end items-baseline">
                  <h1 className="text-5xl font-bold flex items-center">
                    {item.rating}
                  </h1>
                  <h2 className="text-3xl">/5</h2>
                </div>
              </div>
              <div className="w-[100%] flex flex-col justify-center items-start p-[20px]">
                <p className="text-[24px]">{item.review}</p>
              </div>
            </div>
          </div>
        ))
      )}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={id}
        onSuccess={addNewReview}
      />
    </div>
  );
};

export default Review;
