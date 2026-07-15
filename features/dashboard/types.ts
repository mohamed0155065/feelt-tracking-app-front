import { BaseVehicle } from '@/lib/types';

export interface LiveVehicle extends BaseVehicle {
  lat: number;
  lng: number;
  driverName: string;
}

export interface SystemStats {
  total: number;
  online: number;
  idle: number;
  offline: number;
}