import React from 'react';
import WebApp from '@twa-dev/sdk';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { profile } = useAuth();
  const { t } = useTranslation();

  const handlePayWithStars = () => {
    WebApp.showAlert('В разработке: Подключение к Telegram Stars API');
  };

  const handlePayWithCard = () => {
    WebApp.showAlert('В разработке: Подключение к фиатному шлюзу Telegram (Оплата картой)');
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-20">
      <h1 className="text-3xl font-extrabold text-primary mb-6">{t('nav_profile')}</h1>

      {/* Subscription Card */}
      <div className="bg-surface rounded-3xl p-6 border-2 border-primary relative overflow-hidden mb-8 shadow-[0_0_15px_rgba(173,255,0,0.15)]">
        <h2 className="text-xl font-bold text-white mb-1">KINEX <span className="text-primary neon-text">PRO</span></h2>
        <p className="text-gray-400 text-sm mb-6">Full access to AI Nutrition, 80+ Exercise Animations, and auto-generated programs.</p>
        
        <div className="space-y-3">
          <button onClick={handlePayWithStars} className="w-full bg-primary text-black font-extrabold py-4 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
            <span>Pay with</span>
            <span className="text-lg">⭐️</span>
            <span>500 Stars</span>
          </button>
          
          <button onClick={handlePayWithCard} className="w-full border border-border bg-[#1A1A1A] text-white font-bold py-4 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
            <span>Pay with Card</span>
            <span className="text-lg">💳</span>
            <span>$9.99 / mo</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-3 px-2">PREFERENCES</p>
      <div className="bg-surface rounded-3xl border border-border overflow-hidden mb-8">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <span className="text-white">Push Notifications</span>
          <div className="w-12 h-7 bg-primary rounded-full relative">
            <div className="absolute right-1 top-1 bottom-1 w-5 bg-white rounded-full shadow-sm" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5">
          <span className="text-white">Weight Unit</span>
          <span className="text-primary font-bold">
            {profile?.unit === 'imperial' ? 'LBS' : 'KG'}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-3 px-2">ACCOUNT</p>
      <div className="bg-surface rounded-3xl border border-border overflow-hidden mb-8">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <span className="text-white">Subscription (Pro)</span>
        </div>
        <div className="flex justify-between items-center p-5">
          <span className="text-white">Privacy Policy</span>
        </div>
      </div>

      <button onClick={() => WebApp.close()} className="w-full bg-transparent border border-primary text-primary font-bold py-4 rounded-2xl active:bg-primary/10 transition-colors mb-6">
        Close App
      </button>

      <p className="text-center text-gray-500 text-sm">Version 1.0.0 (Web)</p>
    </div>
  );
}
