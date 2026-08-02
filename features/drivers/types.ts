// تعريف الـ Interface الخاص بالبيانات المستقبلة لمنع أي خطأ في الـ Type
export interface DriverType {
  id:string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status?: string;
  password?:string;
}

export interface TableProps {
  drivers: DriverType[];
  filter: string;
  onUpdateDriver?: (driver: DriverType) => void;
  onDeleteDriver?: (driver: DriverType) => void;
}
export const STATUS_MAP: Record<string, string> = {
  online: 'متصل',
  offline: 'غير متصل',
};