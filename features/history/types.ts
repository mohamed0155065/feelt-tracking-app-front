// features/history/types/history.types.ts
export interface RoutePoint {
  time: string;
  status: string;
  locationName: string;
  coords: string;
  lat?: number;
  lng?: number;
}

export interface StopPoint {
  id: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  locationName?: string;
}
export interface TripTimelineProps {
  points: RoutePoint[];
}