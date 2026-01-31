import React, { useState, useEffect } from 'react';

interface BrowserViewProps {
  url: string;
  mode: 'iframe' | 'popup';
}

const BrowserView: React.FC<BrowserViewProps> = ({ url, mode }) => {
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);

  const openPopup = () => {
    const width = 1000;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const newWindow = window.open(
      url, 
      '_blank', 
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    setPopupWindow(newWindow);
  };

  useEffect(() => {
    // Cleanup popup on unmount if desired, usually better to leave user in control
    return () => {
      // if (popupWindow) popupWindow.close();
    };
  }, []);

  if (mode === 'popup') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-dark-950 text-center p-8">
        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 bg-dark-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-dark-700">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">External Window Mode</h2>
          <p className="text-gray-400">
            The AI website is open in a separate popup window. This bypasses security restrictions that block embedding.
          </p>
          <div className="p-4 bg-brand-900/20 border border-brand-500/30 rounded-lg text-sm text-brand-200">
            <strong>Important:</strong> When you click "Connect" in the sidebar, ensure you select the <em>Popup Window</em> (or the specific tab) in the browser's share dialog to capture its audio.
          </div>
          <button 
            onClick={openPopup}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-brand-500/20"
          >
            {popupWindow && !popupWindow.closed ? 'Focus Popup' : 'Open Website Popup'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white relative">
       {/* Loader/Placeholder behind iframe */}
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0">
         Loading {url}...
      </div>
      <iframe 
        src={url} 
        className="w-full h-full border-0 relative z-10" 
        title="AI Interface"
        allow="microphone; camera; display-capture"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
      {/* Overlay to intercept interaction if needed, usually not for this use case */}
    </div>
  );
};

export default BrowserView;