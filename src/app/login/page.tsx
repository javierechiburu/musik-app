'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/config/supabase/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Limpia errores anteriores

    if (!email || !password) {
      setErrorMessage('Debes ingresar email y contraseña.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('error', error)

    if (error) {
      setErrorMessage('Credenciales incorrectas o usuario no existe.');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser()
     console.log('user', user)
    const { data: perfil } = await supabase
      .from('usuario')
      .select('role')
      .eq('auth_id', user?.id)
      .single();

     
      console.log('perfil', perfil)
    if (perfil) {
      localStorage.setItem('logged_in_user_role', perfil?.role);
    }

    router.push('/home');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Bienvenido
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Ingresa a tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 sm:py-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 sm:py-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-400">
          ¿No tienes cuenta?{' '}
          <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
