import React, { useState } from 'react';
import { Layers, MapPin, ZoomIn, ZoomOut, Compass, Sparkles, AlertCircle } from 'lucide-react';
import { TRANSLATIONS, ANOMALIES_TR, Language } from '../translations.js';

interface Anomaly {
  id: string;
  sector: string;
  title: string;
  time: string;
  severity: string;
  description: string;
  recommendation: string;
}

interface InteractiveMapProps {
  anomalies: Anomaly[];
  selectedSectorId: string;
  onFocusAnomaly: (anomaly: Anomaly) => void;
  lang: Language;
}

export default function InteractiveMap({ anomalies, selectedSectorId, onFocusAnomaly, lang }: InteractiveMapProps) {
  const [overlay, setOverlay] = useState<'boundaries' | 'heatmap' | 'sensors'>('heatmap');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Map coordinates matching specific sector hotspots
  const hotspots = [
    { id: 'anom-1', x: '35%', y: '28%', color: 'border-amber-500 shadow-amber-500 bg-amber-500', title: 'Downtown Gridlock (Market St)' },
    { id: 'anom-2', x: '72%', y: '42%', color: 'border-emerald-500 shadow-emerald-500 bg-emerald-500', title: 'PM2.5 Industrial Spike' },
    { id: 'anom-3', x: '24%', y: '68%', color: 'border-purple-500 shadow-purple-500 bg-purple-500', title: 'Central Clinic Care Surge' }
  ];

  return (
    <div className="relative h-full w-full bg-[#070913] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Map Content Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/60 via-transparent to-transparent"></div>
      </div>

      {/* Grid Pattern and Vector Map Simulation */}
      <div className="flex-grow relative overflow-hidden p-6 flex items-center justify-center select-none">
        {/* SVG Grid Matrix Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

        {/* Floating Sector Indicators or Vector Contours */}
        <div className="w-full h-full max-w-[500px] max-h-[350px] relative transition-transform duration-300" style={{ transform: `scale(${zoomLevel})` }}>
          
          {/* Faux District Boundaries Layer */}
          {overlay === 'boundaries' && (
            <svg className="absolute inset-0 w-full h-full text-blue-500/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <path d="M 10 10 L 40 25 L 30 70 L 10 90 Z" strokeDasharray="3 3" />
              <path d="M 40 25 L 90 10 L 80 50 L 55 80 L 30 70 Z" strokeDasharray="2 2" />
              <path d="M 55 80 L 80 50 L 95 90 L 45 95 Z" strokeDasharray="3 3" />
              <text x="20" y="45" fill="rgba(255,255,255,0.2)" fontSize="4" fontFamily="monospace">{lang === 'hi' ? 'जिला क' : 'DISTRICT A'}</text>
              <text x="60" y="35" fill="rgba(255,255,255,0.2)" fontSize="4" fontFamily="monospace">{lang === 'hi' ? 'जिला ख' : 'DISTRICT B'}</text>
              <text x="65" y="75" fill="rgba(255,255,255,0.2)" fontSize="4" fontFamily="monospace">{lang === 'hi' ? 'जिला ग' : 'DISTRICT C'}</text>
            </svg>
          )}

          {/* Faux Heatmap Heatspots */}
          {overlay === 'heatmap' && (
            <div className="absolute inset-0 pointer-events-none transition-all duration-300">
              <div className="absolute top-[20%] left-[28%] w-32 h-32 bg-amber-500/15 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute top-[35%] right-[20%] w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-[20%] left-[20%] w-24 h-24 bg-purple-500/15 rounded-full blur-2xl"></div>
            </div>
          )}

          {/* Central Grid Circle */}
          <svg className="w-full h-full text-white/5 opacity-15" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="45" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="30" strokeDasharray="1 5" />
            <circle cx="50" cy="50" r="15" strokeDasharray="1 8" />
            <path d="M10 50 L90 50 M50 10 L50 90" strokeWidth="0.3" />
            <path d="M25 25 L75 75 M75 25 L25 75" strokeWidth="0.2" />
          </svg>

          {/* Glowing District Roads Overlay */}
          <svg className="absolute inset-0 w-full h-full text-white/5" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4">
            <path d="M 5 35 Q 35 30 50 50 T 95 65" />
            <path d="M 20 5 Q 45 45 60 75 T 80 95" />
            <path d="M 85 10 Q 55 55 15 90" strokeDasharray="1 2" />
          </svg>

          {/* Active Hotspots Linked to Active database Alerts */}
          {hotspots.map((spot) => {
            const correspondingAnom = anomalies.find(a => a.id === spot.id);
            const isRelevantToSector = correspondingAnom?.sector === selectedSectorId || !selectedSectorId;
            const spotTitle = ANOMALIES_TR[lang][spot.id]?.title || spot.title;

            return (
              <button
                key={spot.id}
                id={`map-pin-${spot.id}`}
                onClick={() => correspondingAnom && onFocusAnomaly(correspondingAnom)}
                style={{ top: spot.y, left: spot.x }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer ${
                  isRelevantToSector ? 'opacity-100 scale-110' : 'opacity-40 scale-90'
                } transition-all duration-300`}
                title={spotTitle}
              >
                {/* Ping ring */}
                <span className={`absolute inline-flex h-6 w-6 rounded-full animate-ping opacity-60 ${spot.color}`}></span>
                {/* Inner bubble */}
                <span className={`relative flex items-center justify-center rounded-full h-3.5 w-3.5 border border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.6)] ${spot.color}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>

                {/* Pin Tooltip label */}
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950 border border-white/10 px-2 py-0.5 rounded text-[9px] text-slate-200 font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {spotTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Interactive Coordinates Controls */}
      <div className="absolute top-4 left-4 bg-slate-900/95 border border-white/10 p-3 rounded-xl backdrop-blur-md flex flex-col gap-1 shadow-lg max-w-[210px]">
        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1">
          <Compass className="h-3.5 w-3.5 text-blue-400" /> {TRANSLATIONS[lang].sensorCoordinates}
        </span>
        <span className="text-[10px] text-white font-semibold font-mono">{lang === 'hi' ? 'क्षेत्र ७ // अनुभाग_ग' : 'DISTRICT 7 // SEC_C'}</span>
        <p className="text-[9px] text-slate-400 leading-normal mt-1">
          {TRANSLATIONS[lang].mapSubtitle}
        </p>
      </div>

      {/* Map Control Layers bar */}
      <div className="p-4 border-t border-white/10 bg-[#0a0c14]/90 backdrop-blur-md flex items-center justify-between flex-wrap gap-3 shrink-0">
        <div className="flex gap-2">
          <button
            onClick={() => setOverlay('boundaries')}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              overlay === 'boundaries' 
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {TRANSLATIONS[lang].boundaries}
          </button>
          <button
            onClick={() => setOverlay('heatmap')}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              overlay === 'heatmap' 
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {TRANSLATIONS[lang].heatmapOverlay}
          </button>
          <button
            onClick={() => setOverlay('sensors')}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              overlay === 'sensors' 
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {TRANSLATIONS[lang].activeSensors}
          </button>
        </div>

        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.4))}
            className="p-1 hover:bg-white/10 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.8))}
            className="p-1 hover:bg-white/10 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
