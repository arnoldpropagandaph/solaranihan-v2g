import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ url }: { url: URL }) {
  try {
    // Extract query parameters
    const command = url.searchParams.get('command') || 'status';
    
    // Construct the URL for the simulation server
    const serverUrl = 'http://localhost:8000/api/simulation';
    
    // Make the request to the simulation server
    const response = await fetch(`${serverUrl}?command=${command}`);
    
    // Parse the response
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: unknown) {
    console.error('Error connecting to simulation server:', error);
    return new Response(JSON.stringify({ error: 'Failed to connect to simulation server' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST({ request }: RequestEvent) {
  try {
    // Extract the body from the request
    const body = await request.json();
    
    // Construct the URL for the simulation server
    const serverUrl = 'http://localhost:8000/api/simulation';
    
    // Make the request to the simulation server
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: unknown) {
    console.error('Error sending command to simulation server:', error);
    return new Response(JSON.stringify({ error: 'Failed to send command' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};