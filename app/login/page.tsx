'use client';
import React, { useState } from 'react';

export default function LoginPage() {
  const [realPassword, setRealPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert('تم استقبال الباسورد الحقيقي وهو: ' + realPassword);
  };

  const handlePasswordChange = (e: any) => {
    const val = e.target.value;
    
    // لو اليوزر بيمسح
    if (val.length < displayPassword.length) {
      const updatedReal = realPassword.slice(0, val.length);
      setRealPassword(updatedReal);
      setDisplayPassword(val);
      return;
    }

    // الحرف الجديد اللي اتكتب
    const lastChar = val.charAt(val.length - 1);
    const newReal = realPassword + lastChar;
    setRealPassword(newReal);

    //بشوف الحرف الجديد جنب القديم المخنفي
    const stars = '•'.repeat(realPassword.length);
    setDisplayPassword(stars + lastChar);

    //بعد نص ثانية  حول لي الحرف الأخير لنجمه 
    setTimeout(() => {
      setDisplayPassword('•'.repeat(newReal.length));
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4" dir="rtl">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
        
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 rounded bg-blue-600 items-center justify-center text-white text-xl font-bold mb-3">
            F
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Fleet Tracking</h2>
          <p className="text-sm text-gray-500 mt-1">تسجيل الدخول</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* للبريد الالكتروني*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>
          
          {/* للباسورد */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
            <input
              type="text" 
              required
              value={displayPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            تسجيل الدخول
          </button>

        </form>

      </div>
    </div>
  );
}