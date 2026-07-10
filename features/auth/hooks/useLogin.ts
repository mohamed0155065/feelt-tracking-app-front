"use client";
import { useState } from 'react';
import { loginApi } from '../api/login';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [realPassword, setRealPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await loginApi({ email, password: realPassword });
    setIsLoading(false);
    alert('تم تسجيل الدخول بنجاح');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length < displayPassword.length) {
      setRealPassword(realPassword.slice(0, val.length));
      setDisplayPassword(val);
      return;
    }
    const lastChar = val.charAt(val.length - 1);
    const newReal = realPassword + lastChar;
    setRealPassword(newReal);
    setDisplayPassword('•'.repeat(realPassword.length) + lastChar);
    setTimeout(() => {
      setDisplayPassword('•'.repeat(newReal.length));
    }, 2000);
  };

  return { email, setEmail, isLoading, displayPassword, handlePasswordChange, handleSubmit };
};