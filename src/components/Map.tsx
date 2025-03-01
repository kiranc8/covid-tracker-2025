import React, { useEffect, useRef } from 'react';
import L from "leaflet"
import 'leaflet/dist/leaflet.css';
import { Regional } from '../interfaces/interface';

import { useAppSelector } from '../library/hooks/reduxHook';
import { location } from '../library/data/location';

import "../styles/Map.css"

interface CovidMapProps {
  stats:Regional
}

const Map: React.FC<CovidMapProps> = ({ stats }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const selectedState = useAppSelector((state) => state.covid.selectedRegion);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Center on India
      mapInstanceRef.current = L.map(mapRef.current).setView([22.3511148, 78.6677428], 5);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when selected state changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    const filteredData = location.filter((item)=>{
      return item.loc === selectedState
    })

    filteredData.forEach(state => {
      if (state.latitude && state.longitude) {
        // Calculate circle size based on number of cases
        const radius = 100000;
        
        // Create circle
        const circle = L.circle([state.latitude, state.longitude], {
          color: '#FF4136',
          fillColor: '#FF4136',
          fillOpacity: 0.2,
          radius
        }).addTo(mapInstanceRef.current!);
        
        // Add popup with info
        circle.bindPopup(`
          <strong>${stats.loc}</strong><br/>
          Confirmed: ${stats.totalConfirmed.toLocaleString()}<br/>
          Active: ${(stats.totalConfirmed - stats.discharged -stats.deaths).toLocaleString()}<br/>
          Recovered: ${stats.discharged.toLocaleString()}<br/>
          Deaths: ${stats.deaths.toLocaleString()}
        `);
      }
    });
  }, [selectedState]);

  return <div ref={mapRef} className="covid-map" style={{ height: '500px', width: '100%' }}></div>;
};

export default Map;