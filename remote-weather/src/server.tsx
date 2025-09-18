import {renderRSC} from '@parcel/rsc/node';
import {WeatherWrapper} from './WeatherWrapper';

export default {
  async fetch(req: Request) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Add CORS headers for cross-origin requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, rsc-action',
    };

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (pathname === '/weather' && req.method === 'GET') {
      try {
        // Render the weather component to RSC payload using renderRSC (Node.js style)
        const stream = renderRSC(<WeatherWrapper />);

        // Create a proper ReadableStream that matches Express behavior
        const readableStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of stream) {
                controller.enqueue(new TextEncoder().encode(chunk.toString()));
              }
              controller.close(); // This is crucial - properly terminate the stream
            } catch (error) {
              controller.error(error);
            }
          }
        });

        // Create headers with proper Content-Type for RSC and NO Content-Length
        const headers = {
          'Content-Type': 'text/x-component',
          ...corsHeaders,
        };

        return new Response(readableStream, {
          status: 200,
          headers: headers,
        });
      } catch (error) {
        console.error('Error rendering WeatherCard:', error);
        return new Response('Internal Server Error', {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // Health check endpoint
    if (pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        service: 'remote-weather-service',
        timestamp: new Date().toISOString()
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    return new Response('Not Found', {
      status: 404,
      headers: corsHeaders,
    });
  }
};