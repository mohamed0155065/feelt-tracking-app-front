export interface User {
    id: string;
    name: string;
    email: string;
    role: 'manager' | 'driver';
    
    avatar?: string;
}

