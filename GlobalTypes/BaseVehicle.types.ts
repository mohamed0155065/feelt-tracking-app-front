export interface BaseVehicle {
    id: string;
    plateNumber: string;
    model: string;
    year: number;
    status: 'online' | 'idle' | 'offline';
    speed?: number;
}