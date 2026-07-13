export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'driver';
}

export interface BaseVehicle {
  id: string;
  plateNumber: string;
  model: string;
  year: number;
  status: 'online' | 'idle' | 'offline';
  speed?: number;
}

export interface BaseDriver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'online' | 'offline';
  vehicleId?: string;
  vehiclePlate?: string;
}