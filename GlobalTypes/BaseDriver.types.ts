
export interface BaseDriver {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'online' | 'offline';
    vehicleId?: string;
    vehiclePlate?: string;
}