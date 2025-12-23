'use client';

import { useState, useEffect } from 'react';

export default function TestMobile() {
  const [count, setCount] = useState(0);
  const [userAgent, setUserAgent] = useState('');
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setUserAgent(navigator.userAgent);
    setViewport({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Test Mobile - TutorAI
        </h1>
        
        <p className="text-gray-600 mb-4">
          Questa è una pagina di test per verificare il funzionamento mobile.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-blue-800">
            Contatore: <span className="font-bold">{count}</span>
          </p>
        </div>
        
        <button
          onClick={() => setCount(count + 1)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Incrementa
        </button>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>User Agent: {userAgent}</p>
          <p>Viewport: {viewport.width} x {viewport.height}</p>
        </div>
      </div>
    </div>
  );
}
