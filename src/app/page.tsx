"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { ThirdParty } from "./third-party";
import Map from "./components/Map";

export default function Home() {
  return (
    <main className="h-screen w-screen">
        <Map />
    </main>
  );
}
