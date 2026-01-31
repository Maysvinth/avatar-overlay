import React from 'react';
import { AppConfig, CharacterType, VoiceType, BackgroundConfig } from '../types';

interface ControlPanelProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  isConnected: boolean;
  onConnectToggle: () => void;
  error: string | null;
  onEnterAvatarMode: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  config, 
  setConfig, 
  isConnected, 
  onConnectToggle,
  error,
  onEnterAvatarMode
}) => {

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setConfig({ 
        ...config, 
        background: { type: 'image', value: imageUrl } 
      });
    }
  };

  const solidColors = ['#030712', '#111827', '#000000', '#059669', '#4f46e5', '#be123c'];
  const gradients = [
    'linear-gradient(to bottom, #1e1b4b, #000000)',
    'linear-gradient(to bottom, #4c0519, #000000)',
    'linear-gradient(to bottom, #064e3b, #000000)',
    'linear-gradient(45deg, #1e1b4b, #4f46e5)',
  ];

  return (
    <div className="bg-dark-900 border-r border-dark-800 flex flex-col h-full w-full md:w-80 p-6 shadow-xl z-20 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
          HoloSync
        </h1>
        <p className="text-xs text-gray-400">
          Universal AI Avatar Overlay
        </p>
      </div>

      <div className="space-y-6 flex-1">
        {/* Connection Status */}
        <div className="p-4 rounded-xl bg-dark-800 border border-dark-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-300">Status</span>
            <span className={`flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full ${isConnected ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
              {isConnected ? 'LIVE' : 'OFFLINE'}
            </span>
          </div>
          <button
            onClick={onConnectToggle}
            className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all shadow-lg transform active:scale-95 ${
              isConnected 
                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-500/20'
            }`}
          >
            {isConnected ? 'Disconnect Audio' : 'Connect & Sync'}
          </button>
          {error && (
             <p className="mt-3 text-xs text-red-400 bg-red-950/30 p-2 rounded border border-red-900/50">
               {error}
             </p>
          )}
        </div>

        {/* Enter Avatar Mode Button */}
        <div className="space-y-2">
           <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Presentation</label>
           <button
             onClick={onEnterAvatarMode}
             className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
             Enter Avatar Only Mode
           </button>
           <p className="text-[10px] text-gray-500">
             Optimized for Huawei P10 Lite (Portrait). Hides all controls.
           </p>
        </div>

        {/* URL Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Website URL</label>
          <input 
            type="url" 
            value={config.url}
            onChange={(e) => setConfig({ ...config, url: e.target.value })}
            placeholder="https://chatgpt.com"
            className="w-full bg-dark-950 border border-dark-800 text-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent block p-3 transition-colors outline-none"
          />
        </div>
        
        {/* Character Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avatar</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(CharacterType).map((char) => (
              <button
                key={char}
                onClick={() => setConfig({ ...config, character: char })}
                className={`p-2 text-xs rounded border transition-all ${
                  config.character === char 
                    ? 'bg-brand-600/20 border-brand-500 text-brand-300' 
                    : 'bg-dark-950 border-dark-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Background Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Background</label>
          
          {/* Solid Colors */}
          <div className="flex gap-2 mb-2">
             {solidColors.map(color => (
               <button 
                 key={color}
                 onClick={() => setConfig({ ...config, background: { type: 'solid', value: color } })}
                 className={`w-6 h-6 rounded-full border ${config.background.value === color ? 'border-white scale-110' : 'border-gray-600'}`}
                 style={{ backgroundColor: color }}
               />
             ))}
          </div>

          {/* Gradients */}
          <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
             {gradients.map((grad, i) => (
               <button 
                 key={i}
                 onClick={() => setConfig({ ...config, background: { type: 'gradient', value: grad } })}
                 className={`w-8 h-8 rounded-lg border flex-shrink-0 ${config.background.value === grad ? 'border-white scale-105' : 'border-gray-600'}`}
                 style={{ background: grad }}
               />
             ))}
          </div>

          {/* Image Upload */}
          <label className="flex items-center gap-2 cursor-pointer bg-dark-950 border border-dark-800 hover:border-gray-600 p-2 rounded-lg text-xs text-gray-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>Upload Image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        {/* Voice Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Voice Effect</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(VoiceType).map((v) => (
              <button
                key={v}
                onClick={() => setConfig({ ...config, voice: v })}
                className={`p-2 text-xs rounded border transition-all ${
                  config.voice === v 
                    ? 'bg-brand-600/20 border-brand-500 text-brand-300' 
                    : 'bg-dark-950 border-dark-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;