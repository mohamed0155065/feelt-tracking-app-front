export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'driver';
  avatar?: string;
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