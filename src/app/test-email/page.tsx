"use client";

import { useState } from 'react';
import { axiosInstance } from '@/config/axios/axiosInstance';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axiosInstance.post('/api/test-email', { email });
      setResult({
        success: true,
        data: response.data
      });
    } catch (error: any) {
      setResult({
        success: false,
        error: error.response?.data || error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🧪 Prueba de Email
          </h1>
          <p className="text-gray-400">
            Envía un email de prueba para verificar la configuración de Resend
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <form onSubmit={handleTestEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email de destino
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu-email@ejemplo.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Email de Prueba'}
            </button>
          </form>

          {result && (
            <div className={`mt-6 p-4 rounded-lg ${result.success ? 'bg-green-900/50 border border-green-500/30' : 'bg-red-900/50 border border-red-500/30'}`}>
              <h3 className={`font-bold ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                {result.success ? '✅ Éxito' : '❌ Error'}
              </h3>
              <pre className="mt-2 text-sm text-gray-300 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(result.success ? result.data : result.error, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-6 bg-yellow-900/50 border border-yellow-500/30 rounded-lg p-4">
          <h3 className="text-yellow-400 font-bold mb-2">💡 Notas importantes:</h3>
          <ul className="text-yellow-200 text-sm space-y-1">
            <li>• Usa tu email personal para la prueba</li>
            <li>• Revisa la carpeta de spam si no llega</li>
            <li>• El email se envía desde: onboarding@resend.dev</li>
            <li>• Verifica que RESEND_API_KEY esté configurado en .env.local</li>
          </ul>
        </div>
      </div>
    </div>
  );
}