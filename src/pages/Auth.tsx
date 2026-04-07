import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Auth() {
  const { fbUser, loginWithGoogle, loginWithEmail, registerWithEmail, loading, authError, authMessage, clearMessages } = useAuth();
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-primary font-black text-4xl animate-pulse-neon">KINEX</span>
      </div>
    );
  }

  if (fbUser) return <Navigate to="/" />;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isRegister) {
      if (password !== confirmPassword) return;
      if (password.length < 6) return;
    }

    setSubmitting(true);
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleTabSwitch = (reg: boolean) => {
    setIsRegister(reg);
    clearMessages();
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const passwordsMatch = !isRegister || !confirmPassword || password === confirmPassword;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10 text-center">
        <h1 className="text-6xl font-black text-primary neon-text mb-2">KINEX</h1>
        <p className="text-gray-400 text-sm">{t('auth_subtitle')}</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm">
        <div className="bg-surface border border-border rounded-2xl p-6">
          {/* Tabs */}
          <div className="flex mb-6 bg-[#1a1a1a] rounded-xl p-1">
            <button
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                !isRegister ? 'bg-primary text-gray-900' : 'text-gray-400'
              }`}
            >
              {t('sign_in')}
            </button>
            <button
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                isRegister ? 'bg-primary text-gray-900' : 'text-gray-400'
              }`}
            >
              {t('sign_up')}
            </button>
          </div>

          {/* Error */}
          {authError && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              {authError}
            </div>
          )}

          {/* Success */}
          {authMessage && (
            <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl">
              {authMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email_placeholder')}
              className="input-field"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('password_placeholder')}
              className="input-field"
              required
            />
            {isRegister && (
              <>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('confirm_password_placeholder')}
                  className={`input-field ${!passwordsMatch ? 'border-red-500' : ''}`}
                  required
                />
                {!passwordsMatch && (
                  <p className="text-red-400 text-xs -mt-1">{t('password_mismatch')}</p>
                )}
                {isRegister && password.length > 0 && password.length < 6 && (
                  <p className="text-red-400 text-xs -mt-1">{t('password_too_short')}</p>
                )}
              </>
            )}
            <button
              type="submit"
              disabled={submitting || (isRegister && (!passwordsMatch || password.length < 6))}
              className="primary-btn w-full h-12 font-bold rounded-xl disabled:opacity-40"
            >
              {submitting ? '...' : isRegister ? t('sign_up') : t('sign_in')}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-gray-500 text-xs">{t('or_continue')}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google — using redirect (no popup) */}
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 px-6 rounded-xl active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('google')}
          </button>
        </div>

        <p className="text-gray-600 text-xs text-center mt-4">
          {t('terms_notice')}
        </p>
      </div>
    </div>
  );
}
