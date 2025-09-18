"use server-entry";

import { WeatherCard } from './WeatherCard';

// Root wrapper component similar to RSC.tsx in the Express example
export async function WeatherWrapper() {
  return <WeatherCard />;
}