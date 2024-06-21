import { useState } from "react";
import { datesData, weatherData } from "../../data/dummys-data";

function CuacaPage() {
  const [selectedDate, setSelectedDate] = useState(16);
  const [selectedLocation, setSelectedLocation] = useState("Sleman");
  const location = ["Sleman", "Kulon Progo"];

  const handleClick = () => {
    setSelectedLocation(selectedLocation === "Sleman" ? "Kulon Progo" : "Sleman");
  };

  return (
    <div className='my-40'>
      <div className='flex justify-between items-center mx-20'>
        <h1 className='font-bold text-primary text-[40px]'>{selectedLocation}</h1>
        <p className='font-normal text-[#787373] text-[20px] hover:cursor-pointer' onClick={handleClick}>
          {selectedLocation === "Sleman" ? location[1] : location[0]} &rarr;
        </p>
      </div>
      <div className='mx-20 flex mt-10 justify-between overflow-x-auto'>
        {datesData.map((date) => (
          <button
            key={date.id} 
            onClick={() => setSelectedDate(date.id)}
            className={`${
              selectedDate === date.id
                ? "bg-primary text-white !important"
                : "text-black"
            } font-light text-[24px] p-4 rounded-t-[15px]`}
          >
            {date.date}
          </button>
        ))}
      </div>
      <div className='w-full h-[0.5px] opacity-30 bg-black' />
      <div className='mx-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xs:gap-y-5 md:gap-y-5 lg:gap-y-7 place-items-center mt-10'>
        {weatherData.map((weather, index) => (
          <div key={index} className='w-[400px] h-[474px] rounded-[50px] shadow-xl bg-white'>
            <div className='relative'>
              <img
                src={weather.bg}
                alt={weather.title}
                className='mx-auto mt-7'
              />
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <img src={weather.img} alt={weather.title} className='mb-4' />
                <p className='text-white font-normal text-[20px]'>
                  {weather.title}
                </p>
                <h2 className='text-white font-semibold text-[40px]'>
                  {weather.temp}
                </h2>
              </div>
            </div>
            <div className='flex justify-center items-baseline mx-8 mt-5'>
              <h2 className='text-black text-[32px] font-bold'>
                {weather.time}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CuacaPage;
