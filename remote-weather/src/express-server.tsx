// Express server for remote weather service - matches working client example
import express from 'express';
import {renderRSC} from '@parcel/rsc/node';
import {WeatherWrapper} from './WeatherWrapper';

const app = express();

// CORS middleware - same as client example
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'rsc-action');
  next();
});

// Weather endpoint
app.get('/weather', async (req, res) => {
  try {
    // Render the weather component to RSC payload - same pattern as client example
    let stream = renderRSC(<WeatherWrapper />);
    res.set('Content-Type', 'text/x-component');
    stream.pipe(res);
  } catch (error) {
    console.error('Error rendering WeatherWrapper:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'remote-weather-service-express',
    timestamp: new Date().toISOString()
  });
});

app.listen(8788, () => {
  console.log('Remote weather service listening on port 8788 (Express)');
});