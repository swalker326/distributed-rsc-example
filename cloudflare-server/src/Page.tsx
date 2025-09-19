"use server-entry";

import React from "react";
import "./page.css";
import "./client";
import { Counter } from "./Counter";
import { action, name } from "./actions";
import { RemoteWeather } from "./RemoteWeather";

export async function Page() {
  return (
    <html lang="en">
      <head>
        <title>Parcel + Cloudflare Workers + React Server App</title>
      </head>
      <body>
        <h1>Parcel + Cloudflare Workers + React Server App</h1>
        <p>
          This page is a React Server Component! Edit <code>src/Page.tsx</code>{" "}
          to get started.
        </p>
        <p>
          Here is a client component: <Counter />
        </p>

        <hr />

        <h2>Remote Weather Component (Edge-to-Edge)</h2>
        <p>
          This weather component is fetched from the remote weather service at runtime
          and rendered server-side in this Cloudflare Worker:
        </p>

        <RemoteWeather />

        <div
          style={{
            padding: "20px",
            border: "2px solid #4CAF50",
            borderRadius: "8px",
            color: "#2E7D32",
            backgroundColor: "#e8f5e8",
            marginTop: "16px"
          }}
        >
          ✅ <strong>Distributed RSC Architecture Working!</strong>
          <br />
          • Remote Weather Service: localhost:8788/weather
          <br />
          • This Cloudflare Server: localhost:8787 (consuming remote RSC)
          <br />
          • Client App: localhost:1234 (separate client-side consumption)
        </div>

        <hr />
        <p>This form submits a server action.</p>
        <form action={action}>
          <label>
            Enter your name: <input name="name" defaultValue={name} />
          </label>
          <button>Submit</button>
        </form>
        {name && <p>Welcome {name}!</p>}
      </body>
    </html>
  );
}
