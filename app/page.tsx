import { redirect } from 'next/navigation';

export default function HomePage() {
  // توجيه تلقائي وفوري إلى لوحة التحكم
  redirect('/dashboard');
}