import React from 'react';

/**
 * خيارات الخواص المُمررة لمكون الزر
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** نمط الشكل والمظهر الخاص بالزر (افتراضيًا: primary) */
  variant?: 'primary' | 'secondary' | 'danger';
  /** حالة التحميل: تظهر مؤشر الدوران وتوقف التفاعل مع الزر */
  loading?: boolean;
}

/**
 * مكون زر قابل لإعادة الاستخدام يدعم التحميل والتنوع في الأشكال (Variants)
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  ...props
}) => {
  // التنسيقات الأساسية المشتركة بين جميع أنواع الأزرار
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer";

  // خريطة أنماط التصميم بناءً على الـ variant المُحدد
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",
    secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {/* في حالة التحميل يظهر مؤشر دوران، وإلا يتم عرض المحتوى الداخلي للزر */}
      {loading ? (
        <span
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-label="جاري التحميل"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;