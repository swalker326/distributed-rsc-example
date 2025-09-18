"use server-entry";

async function getWeatherData() {
  // Mock weather data - in real app, this could call external API
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

  const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snow', 'Partly Cloudy'];

  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomTemp = Math.floor(Math.random() * 30) + 5; // 5-35°C

  return {
    city: randomCity,
    condition: randomCondition,
    temperature: randomTemp,
    humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
    timestamp: new Date().toLocaleTimeString()
  };
}

export async function WeatherCard() {
  const weather = await getWeatherData();

  return (
    <div style={{
      border: '2px solid #4A90E2',
      borderRadius: '12px',
      padding: '20px',
      margin: '16px 0',
      background: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '1.4em' }}>
        🌤️ Weather Update
      </h3>
      <div style={{ display: 'grid', gap: '8px' }}>
        <div style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
          📍 {weather.city}
        </div>
        <div style={{ fontSize: '2em', fontWeight: 'bold', margin: '8px 0' }}>
          {weather.temperature}°C
        </div>
        <div>☀️ {weather.condition}</div>
        <div>💧 Humidity: {weather.humidity}%</div>
        <div style={{ fontSize: '0.9em', opacity: 0.9, marginTop: '12px' }}>
          Updated at {weather.timestamp}
        </div>
        <div style={{
          fontSize: '0.8em',
          opacity: 0.8,
          marginTop: '8px',
          fontStyle: 'italic'
        }}>
          🚀 Served by Remote Weather Service
        </div>
      </div>
    </div>
  );
}