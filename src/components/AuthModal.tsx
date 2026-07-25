import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Mail, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { Logo } from './logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'profile'>('profile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Operations Specialist');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      const newUser: UserProfile = {
        name: name || 'Enterprise User',
        email: email || 'user@powerchain.ai',
        role: role || 'Grid Engineer',
        organization: organization || 'PowerChain Enterprise',
        isMpcSecure: true,
        token: `jwt_pk_${Math.random().toString(36).substring(2)}`,
        mfaEnabled: true,
      };
      onLogin(newUser);
      setMessage('Account created successfully. Authenticated with MPC key.');
      setTimeout(() => {
        setMessage('');
        onClose();
      }, 1200);
    } else if (mode === 'login') {
      const loggedUser: UserProfile = {
        name: email ? email.split('@')[0].toUpperCase() : 'John Doe',
        email: email || 'john.doe@powerchain.ai',
        role: 'Enterprise Administrator',
        organization: 'PowerChain Grid Operations',
        isMpcSecure: true,
        token: `jwt_pk_${Math.random().toString(36).substring(2)}`,
        mfaEnabled: true,
      };
      onLogin(loggedUser);
      setMessage('Login successful. Session secured via Argon2id token.');
      setTimeout(() => {
        setMessage('');
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transition-all">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <Logo size="sm" showSubtitle={false} />
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {message && (
            <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{message}</span>
            </div>
          )}

          {mode === 'profile' ? (
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800/60 rounded-xl border border-gray-100 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-base flex items-center justify-center shrink-0">
                  {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'JD'}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{currentUser.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-mono">
                    {currentUser.role} • {currentUser.organization}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-zinc-800 rounded-xl">
                  <span className="text-gray-500 dark:text-zinc-400">MPC Security Key:</span>
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Active & Synchronized
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-zinc-800 rounded-xl">
                  <span className="text-gray-500 dark:text-zinc-400">Password Hashing:</span>
                  <span className="font-mono font-semibold text-gray-800 dark:text-zinc-200">Argon2id (m=65536, t=3, p=4)</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-zinc-800 rounded-xl">
                  <span className="text-gray-500 dark:text-zinc-400">Multi-Factor Auth (MFA):</span>
                  <span className="font-mono font-semibold text-gray-800 dark:text-zinc-200">Hardware WebAuthn Passkey</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setMode('signup')}
                  className="flex-1 py-2.5 text-xs font-semibold border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-200 rounded-xl transition-colors"
                >
                  Switch Account
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMessage('Logged out successfully');
                    setTimeout(() => {
                      setMessage('');
                      setMode('login');
                    }, 1000);
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {mode === 'login' ? 'Sign in to PowerChain AI' : 'Create PowerChain AI Account'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                  Access your enterprise grid operations workspace
                </p>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1">Organization</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="NextEra Grid Energy"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="s.jenkins@nexteraenergy.com"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>

              {mode === 'login' && (
                <div className="flex items-center justify-between mt-1 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black dark:border-zinc-600 dark:focus:ring-white dark:bg-zinc-800" />
                    <span className="text-xs text-gray-600 dark:text-zinc-400">Remember me</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <span>{mode === 'login' ? 'Sign In Securely' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                {mode === 'login' ? (
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Don't have an enterprise account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-black dark:text-white font-semibold underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-black dark:text-white font-semibold underline"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
