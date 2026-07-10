'use client';

import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [realPassword, setRealPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert('تم تسجيل الدخول بنجاح  ');
    }, 1000);
  };

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    if (val.length < displayPassword.length) {
      const updatedReal = realPassword.slice(0, val.length);
      setRealPassword(updatedReal);
      setDisplayPassword(val);
      return;
    }

    const lastChar = val.charAt(val.length - 1);
    const newReal = realPassword + lastChar;
    setRealPassword(newReal);

   const stars = '•'.repeat(realPassword.length);
    setDisplayPassword(stars + lastChar);

    setTimeout(() => {
      setDisplayPassword('•'.repeat(newReal.length));
    }, 2000);
  }; 

  return ( 
    <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-md border border-slate-100 mx-4 z-10">
      {/* اللوجو والعنوان بخط العربي */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 text-white font-bold text-2xl shadow-lg shadow-blue-500/30 mb-3">
          FT
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Cairo', sans-serif" }}>
          FleetTrack
        </h2>
        <p className="text-slate-500 text-sm mt-1" style={{ fontFamily: "'Cairo', sans-serif" }}>
         نظام إدارة وتتبع  السيارات
        </p>
      </div>

      {/* الفورم */}
      <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
        <div>
          <label className="block text-slate-700 text-sm font-bold mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
            البريد الإلكتروني
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@gmail.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 text-slate-900 transition-all text-left"
          />
        </div>

        <div>
          <label className="block text-slate-700 text-sm font-bold mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
            كلمة المرور
          </label>
       <input
  type="text"
  required
  value={displayPassword}
  onChange={handlePasswordChange}
  placeholder=" "
  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 text-slate-900 transition-all text-left"
/>
        </div>

        {/*الزرار  */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full relative mt-4 py-3.5 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
        >
         
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>جاري التحقق...</span>
            </div>
          ) : (
            <span>تسجيل الدخول</span>
          )}
        </button>
      </form>
    </div>
  );
}