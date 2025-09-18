export async function RemoteWeather() {
  try {
    // Fetch the remote weather RSC component
    const response = await fetch('http://localhost:8788/weather', {
      headers: {
        'Accept': 'text/x-component',
      },
    });

    if (!response.ok) {
      throw new Error(`Remote weather service responded with ${response.status}`);
    }

    // Get the RSC payload
    const rscPayload = await response.text();

    // For server-to-server RSC consumption, we need to embed this as raw HTML
    // since the RSC system handles the parsing on the client side
    return (
      <div>
        <div style={{
          padding: '16px',
          border: '2px solid #4CAF50',
          borderRadius: '8px',
          backgroundColor: '#e8f5e8',
          marginBottom: '16px'
        }}>
          ✅ <strong>Remote RSC Data Fetched Successfully</strong>
          <br />
          <small>Payload size: {rscPayload.length} characters</small>
        </div>

        {/* Display the RSC payload for debugging */}
        <details>
          <summary style={{ cursor: 'pointer', fontSize: '0.9em', opacity: 0.8 }}>
            🔍 View Raw RSC Payload
          </summary>
          <pre style={{
            fontSize: '0.7em',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {rscPayload}
          </pre>
        </details>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch remote weather RSC:', error);
    return (
      <div style={{
        padding: '20px',
        border: '2px dashed #f44336',
        borderRadius: '8px',
        color: '#f44336',
        backgroundColor: '#ffebee'
      }}>
        ⚠️ Remote Weather Service Error
        <br />
        <small>Failed to fetch from localhost:8788/weather:</small>
      </div>
    );
  }
}