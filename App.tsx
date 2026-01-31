import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import Avatar from './components/Avatar';
import BrowserView from './components/BrowserView';
import { useAudioVisualizer } from './hooks/useAudioVisualizer';
import { AppConfig, CharacterType, VoiceType, BackgroundConfig } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>({
    url: 'https://gemini.google.com/app',
    character: CharacterType.ROBOT,
    voice: VoiceType.NATURAL,
    iframeMode: 'iframe', // Default to iframe
    background: { type: 'solid', value: '#030712' }
  });

  const [isAvatarMode, setIsAvatarMode] = useState(false);
  const [autoFitScale, setAutoFitScale] = useState(1);

  const { isCapturing, volume, error, startCapture, stopCapture } = useAudioVisualizer({
    voiceType: config.voice
  });

  const handleConnectToggle = () => {
    if (isCapturing) {
      stopCapture();
    } else {
      startCapture();
    }
  };

  const toggleAutoFit = () => {
    // Logic for Huawei P10 Lite (approx 16:9 portrait)
    // Toggle between fitting width (1.2) and fitting height/contained (0.8)
    setAutoFitScale(prev => prev === 1 ? 1.4 : 1);
  };

  const getBackgroundStyle = (bg: BackgroundConfig): React.CSSProperties => {
    if (bg.type === 'solid') return { backgroundColor: bg.value };
    if (bg.type === 'gradient') return { background: bg.value };
    if (bg.type === 'image') return { backgroundImage: `url(${bg.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    return { backgroundColor: '#030712' };
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-dark-950">
      
      {/* 
        STANDARD SPLIT MODE 
        We hide this container via display:none when in Avatar Mode to preserve Iframe state 
      */}
      <div 
        className="flex flex-col md:flex-row h-full w-full"
        style={{ display: isAvatarMode ? 'none' : 'flex' }}
      >
        <ControlPanel 
          config={config} 
          setConfig={setConfig} 
          isConnected={isCapturing}
          onConnectToggle={handleConnectToggle}
          error={error}
          onEnterAvatarMode={() => setIsAvatarMode(true)}
        />

        <div className="flex-1 relative flex flex-col h-full bg-dark-900">
          <BrowserView url={config.url} mode={config.iframeMode} />
          
          {/* Mini Avatar in Edit Mode */}
          <div className="absolute bottom-8 right-8 z-50 pointer-events-none">
             <div className="relative">
                {volume > 0.05 && (
                  <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full transform scale-125 transition-all duration-75"></div>
                )}
                <Avatar type={config.character} volume={volume} />
             </div>
          </div>
        </div>
      </div>

      {/* 
        AVATAR ONLY MODE (Huawei P10 Lite Optimized)
        Only visible when isAvatarMode is true
      */}
      {isAvatarMode && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-300"
          style={getBackgroundStyle(config.background)}
        >
          {/* Controls Overlay (Top Right) */}
          <div className="absolute top-4 right-4 flex gap-3 z-50">
            {/* Auto Fit Button */}
            <button 
              onClick={toggleAutoFit}
              className="bg-black/40 backdrop-blur-md text-white p-3 rounded-full border border-white/20 hover:bg-black/60 active:scale-95 transition-all shadow-lg"
              title="Auto Fit to Screen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </button>

            {/* Exit Mode Button */}
            <button 
              onClick={() => setIsAvatarMode(false)}
              className="bg-red-500/80 backdrop-blur-md text-white p-3 rounded-full border border-red-400/30 hover:bg-red-600 active:scale-95 transition-all shadow-lg"
              title="Exit Presentation Mode"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Avatar Container */}
          {/* We use a container that adapts to P10 Lite portrait 1080x1920 ratio preferences */}
          <div 
            className="relative transition-transform duration-500 ease-out"
            style={{ 
              transform: `scale(${autoFitScale})`,
              width: 'min(90vw, 60vh)', // Ensures aspect ratio isn't blown out
              height: 'min(90vw, 60vh)',
            }}
          >
             {/* Breathing effect for liveliness */}
             <div className="w-full h-full animate-[pulse_4s_ease-in-out_infinite]">
                <Avatar type={config.character} volume={volume} />
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;