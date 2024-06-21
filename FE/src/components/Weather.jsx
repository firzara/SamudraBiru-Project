import PropTypes from 'prop-types';

function WeatherCard({ title, weatherData }) {
  WeatherCard.propTypes = {
    title: PropTypes.string.isRequired,
    weatherData: PropTypes.object.isRequired
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  const todayHumidityData = weatherData.humidityData.filter(data => {
    if (isValidDate(data.time)) {
      return new Date(data.time).toISOString().split('T')[0] === today;
    }
    return false;
  });

  const todayMinTempData = weatherData.minTempData.find(data => data.day === today);

  console.log('Today:', today);

  const averageMinTemp = weatherData.minTempData.length > 0
    ? weatherData.minTempData.reduce((acc, curr) => acc + parseFloat(curr.value), 0) / weatherData.minTempData.length
    : null;

  return (
    <div className='w-[630px] h-[474px] rounded-[50px] shadow-xl bg-white'>
      <div className='relative'>
        <img
          src='/images/cerah.svg'
          alt='cerah'
          className='mx-auto mt-7'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <img src='/images/sun-cerah.svg' alt='cerah' className='mb-4' />
          <p className='text-white font-normal text-[20px]'>Cerah</p>
          <h2 className='text-white font-semibold text-[40px]'>
            {todayMinTempData ? `${todayMinTempData.value}°C` : `Avg: ${averageMinTemp ? averageMinTemp.toFixed(2) : 'N/A'}°C`}
          </h2>
        </div>
      </div>
      <div className='flex justify-center items-center mx-8 mt-5'>
        <h2 className='text-black text-[32px] font-bold'>{title}</h2>
      </div>
      <div className='p-4'>
        {todayHumidityData.map((data, index) => (
          <p key={index}>Time: {data.time}, Humidity: {data.value}%</p>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;