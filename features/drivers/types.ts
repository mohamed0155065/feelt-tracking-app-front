// تعريف الـ Interface الخاص بالبيانات المستقبلة لمنع أي خطأ في الـ Type
export interface DriverType {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: string;
}

export interface TableProps {
  drivers: DriverType[];
  filter: string;
}
export const STATUS_MAP: Record<string, string> = {
  online: 'متصل',
  offline: 'غير متصل',
};