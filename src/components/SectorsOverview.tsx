import React from 'react';
import { Bus, Leaf, ShieldAlert, HeartPulse, MessageSquareText, TrendingUp, TrendingDown, ArrowRight, Activity } from 'lucide-react';
import { Sector, SectorId } from '../types.js';
import { TRANSLATIONS, SECTORS_TR, Language } from '../translations.js';

interface SectorsOverviewProps {
  sectors: Sector[];
  selectedSectorId: SectorId;
  onSelectSector: (id: SectorId) => void;
  lang: Language;
}

export default function SectorsOverview({ sectors, selectedSectorId, onSelectSector, lang }: SectorsOverviewProps) {
  // Map sector ids to beautiful, high-contrast colors and specific Lucide components
  const getSectorStyle = (id: SectorId, isSelected: boolean) => {
    switch (id) {
      case 'mobility':
        return {
          icon: Bus,
          bg: isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-slate-50',
          accent: 'text-blue-600 bg-blue-100',
          border: isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200',
          glow: 'shadow-blue-100'
        };
      case 'environment':
        return {
          icon: Leaf,
          bg: isSelected ? 'bg-emerald-50 border-emerald-200' : 'bg-white hover:bg-slate-50',
          accent: 'text-emerald-600 bg-emerald-100',
          border: isSelected ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200',
          glow: 'shadow-emerald-100'
        };
      case 'safety':
        return {
          icon: ShieldAlert,
          bg: isSelected ? 'bg-red-50 border-red-200' : 'bg-white hover:bg-slate-50',
          accent: 'text-red-600 bg-red-100',
          border: isSelected ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200',
          glow: 'shadow-red-100'
        };
      case 'wellness':
        return {
          icon: HeartPulse,
          bg: isSelected ? 'bg-purple-50 border-purple-200' : 'bg-white hover:bg-slate-50',
          accent: 'text-purple-600 bg-purple-100',
          border: isSelected ? 'border-purple-500 ring-2 ring-purple-100' : 'border-slate-200',
          glow: 'shadow-purple-100'
        };
      case 'feedback':
        return {
          icon: MessageSquareText,
          bg: isSelected ? 'bg-amber-50 border-amber-200' : 'bg-white hover:bg-slate-50',
          accent: 'text-amber-600 bg-amber-100',
          border: isSelected ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200',
          glow: 'shadow-amber-100'
        };
      default:
        return {
          icon: Activity,
          bg: 'bg-white',
          accent: 'text-slate-600 bg-slate-100',
          border: 'border-slate-200',
          glow: 'shadow-slate-100'
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            {TRANSLATIONS[lang].sectorMonitors}
          </h2>
          <p className="text-xs text-slate-500">{TRANSLATIONS[lang].sectorMonitorsSubtitle}</p>
        </div>
        <span className="text-xs font-mono px-2 py-1 bg-indigo-55 text-indigo-700 rounded-full font-medium">
          {TRANSLATIONS[lang].liveConnection}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {sectors.map((sector) => {
          const isSelected = sector.id === selectedSectorId;
          const styles = getSectorStyle(sector.id, isSelected);
          const IconComp = styles.icon;

          const translatedSectorName = SECTORS_TR[lang][sector.id]?.name || sector.name;
          const translatedSectorDesc = SECTORS_TR[lang][sector.id]?.description || sector.description;

          return (
            <div
              key={sector.id}
              id={`sector-card-${sector.id}`}
              onClick={() => onSelectSector(sector.id)}
              className={`cursor-pointer transition-all duration-200 border rounded-xl p-4 flex flex-col justify-between shadow-xs ${styles.bg} ${styles.border} hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${styles.accent}`}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {TRANSLATIONS[lang].active}
                    </span>
                  )}
                </div>

                <h3 className="font-medium text-slate-800 text-sm mb-1 leading-tight">{translatedSectorName}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-4 leading-normal">{translatedSectorDesc}</p>
              </div>

              <div className="space-y-2.5">
                {sector.metrics.slice(0, 2).map((metric, idx) => {
                  const isPositiveChange = metric.change >= 0;
                  // For AQI/Delays, lower is better. For trust, higher is better.
                  const isGoodTrend = (metric.trend === 'down' && (sector.id === 'environment' || sector.id === 'safety' || sector.id === 'wellness')) || 
                                      (metric.trend === 'up' && (sector.id === 'mobility' || sector.id === 'feedback'));

                  const translatedMetricLabel = SECTORS_TR[lang][sector.id]?.metrics[metric.label] || metric.label;

                  return (
                    <div key={idx} className="flex items-center justify-between border-t border-slate-100/60 pt-2 text-[11px]">
                      <span className="text-slate-500 truncate max-w-[100px]">{translatedMetricLabel}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-800">
                          {metric.value}{metric.unit}
                        </span>
                        <span className={`flex items-center font-medium ${isGoodTrend ? 'text-emerald-600' : 'text-slate-500'}`}>
                          {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-end pt-1">
                  <span className="text-[10px] text-indigo-600 font-medium flex items-center gap-0.5 group">
                    {TRANSLATIONS[lang].focusInquiries}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
