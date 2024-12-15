import React, { useState } from 'react';
import { BlynkService } from '../services/blynk';
import { BlynkConfig } from '../types/blynk';

interface BlynkDeviceSetupProps {
  onSetupComplete: (config: BlynkConfig) => void;
}

const BlynkDeviceSetup: React.FC<BlynkDeviceSetupProps> = ({ onSetupComplete }) => {
  const [authToken, setAuthToken] = useState('');
  const [serverUrl, setServerUrl] = useState('https://blynk.cloud');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const blynk = new BlynkService(authToken, serverUrl);
      const connected = await blynk.connect();

      if (connected) {
        const deviceInfo = await blynk.getDeviceInfo();
        if (!deviceInfo.id) {
          throw new Error('لم يتم العثور على معرف الجهاز');
        }
        
        onSetupComplete({
          authToken,
          serverUrl,
          deviceId: deviceInfo.id,
        });
      } else {
        setError('فشل الاتصال بالجهاز. يرجى التحقق من التوكن وعنوان الخادم.');
      }
    } catch (error) {
      console.error('Device setup error:', error);
      setError('حدث خطأ أثناء إعداد الجهاز. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">إعداد جهاز Blynk جديد</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blynk Auth Token
          </label>
          <input
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="أدخل رمز المصادقة"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blynk Server URL
          </label>
          <input
            type="url"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://blynk.cloud"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري الإعداد...
            </>
          ) : (
            'إعداد الجهاز'
          )}
        </button>
      </form>
    </div>
  );
};

export default BlynkDeviceSetup; 