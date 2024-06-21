import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useParams, useLocation, Link } from "react-router-dom";

function CategoryPage() {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nameParam = queryParams.get("name");
  const [selectedCategory, setSelectedCategory] = useState(category || nameParam || "Rekomendasi");
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/destinations`)
      .then(response => response.json())
      .then(data => {
        setDestinations(data);
        setFilteredDestinations(data); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const filtered = destinations.filter(destination => {
      const matchesCategory = selectedCategory === "Rekomendasi" || destination.category === selectedCategory;
      const matchesSearchTerm = destination.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
    setFilteredDestinations(filtered);
  }, [selectedCategory, searchTerm, destinations]);

  return (
    <div className='mx-20 my-40'>
      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-y-7'>
        <div className='place-self-center md:place-self-start'>
          <div className='relative'>
            <input
              className='w-[340px] h-[74px] rounded-[15px] border-[#787373] border-[1px] pl-12'
              placeholder='Cari destinasi'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className='absolute top-7 left-4 text-[#BDBDBD]' />
          </div>
          <div className='w-[340px] h-[404px] border-[#787373] border-[1px] rounded-[15px] mt-6 px-3 py-5'>
            <h1 className='font-semibold text-primary text-center text-[32px]'>
              Kategori
            </h1>
            <div className='w-full h-[0.5px] bg-[#787373] mt-5' />
            <div className='flex flex-col gap-4 mt-4'>
              {["Rekomendasi", "Candi", "Pantai", "Pusat Belanja"].map(category => (
                <div className='flex items-center gap-3 mx-5' key={category}>
                  <div
                    className={`${
                      selectedCategory === category
                        ? "bg-primary border-none"
                        : "border-[#787373] border-[1px]"
                    } w-[25px] h-[25px] rounded-full hover:cursor-pointer`}
                    onClick={() => setSelectedCategory(category)}
                  />
                  <p
                    className={`${
                      selectedCategory === category
                        ? "text-primary font-bold"
                        : "text-[#787373] font-normal"
                    } font-normal text-[20px]`}
                  >
                    {category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='md:col-span-2 sm:place-self-center md:place-self-start'>
          <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-10'>
            {filteredDestinations.map((destination) => (
              <div
                className='w-[400px] h-[474px] rounded-[42px] shadow-xl bg-white'
                key={destination.id}
              >
                <img
                  src={destination.hero_image}
                  alt={destination.name}
                  className='w-full h-[200px] px-5 mt-5 object-cover'
                />
                <div className='mt-5 p-4'>
                  <h2 className='text-[24px] font-bold'>{destination.name}</h2>
                  <p className='text-[14px] text-[#444444] mt-2'>
                    {destination.description.slice(0, 100)}...
                  </p>
                  <p className='text-[16px] text-[#0D5295] font-normal text-end hover:cursor-pointer mt-4'>
                    <Link to={`/destinasi?id=${destination.id}`}>Lihat lebih banyak</Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
