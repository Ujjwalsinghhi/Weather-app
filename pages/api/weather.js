export default async function handler(req, res) {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not set" });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json({
        city: data.name,
        country: data.sys?.country,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        wind_speed: data.wind?.speed,
        rain: data.rain?.["1h"] || 0,
      });
    } else {
      res.status(data.cod || 500).json({ error: data.message || "API error" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
}
