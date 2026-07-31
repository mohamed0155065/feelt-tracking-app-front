'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useHistoryStore } from '../store/useHistoryStore';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapProps {
  points: { lat: number; lng: number; label: string; time: string }[];
}

export const HistoryMap = ({ points }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const selectedStopId = useHistoryStore((state) => state.selectedStopId);
  const setSelectedStopId = useHistoryStore((state) => state.setSelectedStopId);

  // 1. Initialize Mapbox
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11', // ستايل داكن مطابق للـ Figma
      center: [points[0]?.lng || 46.6753, points[0]?.lat || 24.7136],
      zoom: 11,
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  // 2. Render Polyline & Fit Bounds
  useEffect(() => {
    const map = mapRef.current;
    if (!map || points.length === 0) return;

    // Mapbox accepts [longitude, latitude]
    const coordinates = points.map((p) => [p.lng, p.lat]);

   const geojsonData = {
  type: 'Feature' as const,
  properties: {},
  geometry: {
    type: 'LineString' as const,
    coordinates,
  },
};

    const handleLoad = () => {
      // Safe Source Add / Update Pattern
      if (map.getSource('route-source')) {
        (map.getSource('route-source') as mapboxgl.GeoJSONSource).setData(geojsonData);
      } else {
        map.addSource('route-source', {
          type: 'geojson',
          data: geojsonData,
        });

        map.addLayer({
          id: 'route-layer',
          type: 'line',
          source: 'route-source',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3b82f6', // Tailwind Blue-500
            'line-width': 4,
            'line-opacity': 0.85,
          },
        });
      }

      // Auto Bounds Zoom
      const bounds = coordinates.reduce(
        (b, coord) => b.extend(coord as [number, number]),
        new mapboxgl.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number])
      );

      map.fitBounds(bounds, {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        maxZoom: 14,
      });
    };

    if (map.isStyleLoaded()) {
      handleLoad();
    } else {
      map.once('load', handleLoad);
    }
  }, [points]);

  // 3. Render Markers A & B and Stops
  useEffect(() => {
    const map = mapRef.current;
    if (!map || points.length === 0) return;

    points.forEach((p, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === points.length - 1;

      const el = document.createElement('div');
      el.className = `w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] cursor-pointer shadow-lg transition-transform hover:scale-125 ${
        isFirst
          ? 'bg-emerald-500 text-zinc-950 ring-2 ring-emerald-300'
          : isLast
          ? 'bg-red-500 text-white ring-2 ring-red-300'
          : 'bg-blue-600 text-white ring-1 ring-blue-300'
      }`;
      el.innerText = isFirst ? 'A' : isLast ? 'B' : '⏱️';

      el.addEventListener('click', () => {
        setSelectedStopId(`stop-${idx}`);
      });

      new mapboxgl.Marker(el)
        .setLngLat([p.lng, p.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 15 }).setHTML(
            `<div class="p-1 text-xs font-sans text-slate-900">
              <strong class="block">${p.label}</strong>
              <span class="text-[10px] text-slate-500">${p.time}</span>
            </div>`
          )
        )
        .addTo(map);
    });
  }, [points, setSelectedStopId]);

  // 4. FlyTo selected stop from Timeline Sync
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedStopId) return;

    const index = parseInt(selectedStopId.replace('stop-', ''), 10);
    const target = points[index];

    if (target) {
      map.flyTo({
        center: [target.lng, target.lat],
        zoom: 15,
        essential: true,
        speed: 1.2,
      });
    }
  }, [selectedStopId, points]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};