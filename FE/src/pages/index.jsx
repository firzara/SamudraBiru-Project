import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import WeatherCard from '../components/Weather';

function HomePage() {
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/destinations`)
      .then(response => response.json())
      .then(data => {
        setDestinations(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const [weatherData, setWeatherData] = useState({ sleman: null, kulonProgo: null });

  useEffect(() => {
    fetch('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-DIYogyakarta.xml')
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const slemanData = extractWeatherData(data, '501187');
        const kulonProgoData = extractWeatherData(data, '501188');
        setWeatherData({ sleman: slemanData, kulonProgo: kulonProgoData });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const extractWeatherData = (xml, areaId) => {
    const area = xml.querySelector(`area[id="${areaId}"]`);
    
    const humidityData = Array.from(area.querySelectorAll('parameter[id="hu"] timerange')).map(timerange => ({
      time: timerange.getAttribute('datetime'),
      value: timerange.querySelector('value').textContent
    }));
  
    const minTempData = Array.from(area.querySelectorAll('parameter[id="tmin"] timerange')).map(timerange => ({
      day: timerange.getAttribute('day'),
      value: timerange.querySelector('value[unit="C"]').textContent
    }));

    return { humidityData, minTempData };
  };
  
  return (
    <div className='bg-[#EBF7FD]'>
      <section className='relative text-white'>
        <img
          src='/images/home-banner.svg'
          alt='banner'
          className='w-full h-[800px]'
        />
        <div className='absolute inset-y-0 left-0 sm:left-28 lg:left-32 xl:left-40 flex flex-col justify-center sm:pl-10'>
          <h1 className='font-bold italic text-[64px] sm:text-[128px] font-Perpetua leading-none'>
            Hai
          </h1>
          <p className='font-light text-[32px] sm:text-[64px] leading-none'>
            Selamat datang di InfoPegi
            <br />
            <span className='font-bold text-[24px] sm:text-[40px] leading-none'>
              mau kemana hari ini?
            </span>
          </p>
        </div>
      </section>

      <section className='text-white mx-10 py-20'>
        <h1 className='font-bold text-primary text-[36px]'>Cuaca hari ini</h1>
        <p className='text-[24px] font-light text-black'>{ new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }</p>
        <div className='flex justify-between mt-5'>
        <WeatherCard title="Sleman" weatherData={weatherData.sleman} />
          <WeatherCard title="Kulon Progo" weatherData={weatherData.kulonProgo} />
        </div>
      </section>

      <section className='text-white bg-white px-10 py-10'>
        <h1 className='font-bold text-primary text-[36px]'>Kategori</h1>
        <div className='flex justify-between'>
        <Link to="/category?name=Candi">
          <div className='relative flex flex-col items-center justify-center mt-5 hover:cursor-pointer'>
            <img src='/images/candi.svg' alt='candi' />
            <h2 className='absolute bottom-0 font-bold text-[36px] text-white mb-5'>
              Candi
            </h2>
          </div>
          </Link>
          <Link to="/category?name=Pantai">
          <div className='relative flex flex-col items-center justify-center mt-5 hover:cursor-pointer'>
            <img src='/images/pantai.svg' alt='pantai' />
            <h2 className='absolute bottom-0 font-bold text-[36px] text-white mb-5'>
              Pantai
            </h2>
          </div>
          </Link>
          <Link to="/category?name=Pusat Belanja">
          <div className='relative flex flex-col items-center justify-center mt-5 hover:cursor-pointer'>
            <img src='/images/pusat-belanja.svg' alt='pusa-belanja' />
            <h2 className='absolute bottom-0 font-bold text-[36px] text-white mb-5'>
              Pusat Belanja
            </h2>
          </div>
          </Link>
        </div>
      </section>

      <section className='text-black mx-5 sm:mx-10 py-10 sm:py-20'>
        <h1 className='font-bold text-primary text-[28px] sm:text-[36px] mb-5'>
          Rekomendasi
        </h1>
        <div className='flex flex-col sm:flex-row justify-between items-center sm:items-end gap-5 sm:gap-0'>
          <div className='flex flex-col justify-end text-center sm:text-left'>
            <p className='text-[16px] sm:text-[20px] font-light'>
              Terbaik bulan ini
            </p>
            <p className='text-[20px] sm:text-[24px] font-light'>
              Temukan Destinasi Terbaik Hanya di Website Resmi Kami
            </p>
          </div>
          <div>
            <Link
              to="/category?name=Rekomendasi"
              className='text-primary font-bold text-[20px] sm:text-[24px] underline hover:opacity-50'
            >
              Lihat Semua
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 sm:mt-10'>
          {/* Card 1 */}
          <div className='bg-white rounded-[20px]'>
            <img
              src={ destinations[0]?.hero_image }
              alt={ destinations[0]?.name }
              className='w-full h-[400px] px-5 mt-5 object-cover'
            />
            <div className='p-4'>
              <h2 className='text-[24px] font-bold'>{ destinations[0]?.name }</h2>
              <p className='text-[14px] text-[#444444] mt-2'>
                { destinations[0]?.description.slice(0, 100) }...
              </p>
              <p className='text-[16px] text-[#0D5295] font-normal text-end hover:cursor-pointer mt-4'>
                <Link to={`/destinasi?id=${destinations[0]?.id}`}>Lihat lebih banyak</Link>
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className='bg-white rounded-[20px]'>
            <img
              src={ destinations[1]?.hero_image }
              alt={ destinations[1]?.name }
              className='w-full h-[400px] px-5 mt-5 object-cover'
            />
            <div className='p-4'>
              <h2 className='text-[24px] font-bold'>{ destinations[1]?.name }</h2>
              <p className='text-[14px] text-[#444444] mt-2'>
                { destinations[1]?.description.slice(0, 100) }...
              </p>
              <p className='text-[16px] text-[#0D5295] font-normal text-end hover:cursor-pointer mt-4'>
                <Link to={`/destinasi?id=${destinations[1]?.id}`}>Lihat lebih banyak</Link>
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className='bg-white rounded-[20px]'>
            <img
              src={ destinations[2]?.hero_image }
              alt={ destinations[2]?.name }
              className='w-full h-[400px] px-5 mt-5 object-cover'
            />
            <div className='p-4'>
              <h2 className='text-[24px] font-bold'>{ destinations[2]?.name }</h2>
              <p className='text-[14px] text-[#444444] mt-2'>
                { destinations[2]?.description.slice(0, 100) }...
              </p>
              <p className='text-[16px] text-[#0D5295] font-normal text-end hover:cursor-pointer mt-4'>
                <Link to={`/destinasi?id=${destinations[2]?.id}`}>Lihat lebih banyak</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
