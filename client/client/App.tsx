import {ReactElement, Suspense} from 'react';
import {fetchRSC} from '@parcel/rsc/client';

export function App() {
  return (
    <>
      <h1>Client rendered</h1>
      <p>This app demonstrates consuming remote RSC components at runtime!</p>

      <Suspense fallback={<div style={{ padding: '20px', border: '1px dashed #ccc' }}>Loading local RSC...</div>}>
        <LocalRSC />
      </Suspense>

      <Suspense fallback={<div style={{ padding: '20px', border: '1px dashed #ccc' }}>Loading remote weather...</div>}>
        <RemoteWeather />
      </Suspense>
    </>
  );
}

let localRequest: Promise<ReactElement> | null = null;
let weatherRequest: Promise<ReactElement> | null = null;

function LocalRSC() {
  // Simple cache to make sure we only fetch once.
  localRequest ??= fetchRSC('http://localhost:3001');
  return localRequest;
}

function RemoteWeather() {
  // Fetch weather component from remote service
  weatherRequest ??= fetchRSC('http://localhost:8788/weather');
  return weatherRequest;
}
