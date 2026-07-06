/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bus, Leaf, ShieldAlert, HeartPulse, MessageSquareText, 
  Activity, AlertTriangle, Layers, Sliders, Upload, 
  ChevronRight, Brain, Clock, HelpCircle, ArrowUpRight, 
  Sparkles, CheckCircle2, ShieldQuestion, ExternalLink
} from 'lucide-react';

import { Sector, SectorId, MetricHistoryPoint } from './types.js';
import SectorsOverview from './components/SectorsOverview.js';
import CityAdvisorChat from './components/CityAdvisorChat.js';
import DocumentAnalyzer from './components/DocumentAnalyzer.js';
import SimulationConsole from './components/SimulationConsole.js';
import InteractiveMap from './components/InteractiveMap.js';
import { TRANSLATIONS, SECTORS_TR, ANOMALIES_TR, Language } from './translations.js';

interface Anomaly {
  id: string;
  sector: SectorId;
  title: string;
  time: string;
  severity: string;
  description: string;
  recommendation: string;
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('urbanmind_lang') as Language) || 'en';
    }
    return 'en';
  });
  const [activeTab, setActiveTab] = useState<'command' | 'simulator' | 'intelligence'>('command');
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [history, setHistory] = useState<MetricHistoryPoint[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [selectedSectorId, setSelectedSectorId] = useState<SectorId>('mobility');
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load backend data
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/sectors');
        const data = await res.json();
        setSectors(data.sectors);
        setHistory(data.history);
        setAnomalies(data.anomalies);
        
        // Auto-focus first anomaly on load
        if (data.anomalies && data.anomalies.length > 0) {
          setSelectedAnomaly(data.anomalies[0]);
        }
      } catch (err) {
        console.error("Error loading sector datasets:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const getActiveSectorName = () => {
    const sector = sectors.find(s => s.id === selectedSectorId);
    if (!sector) return lang === 'hi' ? 'सभी क्षेत्र' : 'All Sectors';
    return SECTORS_TR[lang][sector.id]?.name || sector.name;
  };

  const handleSelectSector = (id: SectorId) => {
    setSelectedSectorId(id);
    // Find first anomaly in this sector to pre-focus
    const firstSectorAnom = anomalies.find(a => a.sector === id);
    if (firstSectorAnom) {
      setSelectedAnomaly(firstSectorAnom);
    }
  };

  const handleFocusAnomaly = (anomaly: Anomaly) => {
    setSelectedAnomaly(anomaly);
    setSelectedSectorId(anomaly.sector);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05070a] text-slate-200 flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping h-12 w-12 -translate-x-2 -translate-y-2"></span>
          <Brain className="h-8 w-8 text-blue-400 animate-pulse relative" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-semibold tracking-wide text-white">UrbanMind AI Terminal</span>
          <span className="text-xs font-mono text-slate-500 animate-pulse">
            {lang === 'hi' 
              ? 'नगरपालिका संचालन और खुफिया मॉडल को सिंक किया जा रहा है...' 
              : 'Syncing Municipal Operations and Intelligence Models...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 font-sans flex flex-col overflow-x-hidden">
      
      {/* Top Banner & Navigation */}
      <header className="h-16 border-b border-white/10 bg-[#0a0c14]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0 z-50 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)]">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base md:text-lg font-bold tracking-tight text-white">
                Urban<span className="text-blue-400">Mind</span> AI
              </span>
              <span className="px-1.5 py-0.5 rounded border border-blue-500/30 bg-blue-500/10 text-[9px] text-blue-400 font-mono hidden sm:inline-block">
                {TRANSLATIONS[lang].decisionPlatform}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">STATUS: ACTIVE // COORD: 12.9716 N, 77.5946 E</p>
          </div>
        </div>

        {/* Live system state & Language Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Language Selector */}
          <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-lg text-xs font-mono">
            <button
              onClick={() => { setLang('en'); localStorage.setItem('urbanmind_lang', 'en'); }}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'en' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => { setLang('hi'); localStorage.setItem('urbanmind_lang', 'hi'); }}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'hi' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block"></div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest hidden sm:inline">
              {TRANSLATIONS[lang].geminiActive}
            </span>
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block"></div>
          
          {/* Quick tab switcher */}
          <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-lg text-xs font-mono">
            <button
              onClick={() => setActiveTab('command')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'command' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{TRANSLATIONS[lang].commandCenter}</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'simulator' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{TRANSLATIONS[lang].scenarioEngine}</span>
            </button>
            <button
              onClick={() => setActiveTab('intelligence')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'intelligence' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{TRANSLATIONS[lang].thematicAnalysis}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Primary Workspace container */}
      <main className="flex-grow p-4 md:p-6 flex flex-col gap-6 max-w-7xl w-full mx-auto">
        
        {/* TAB 1: Main Command Center Dashboard */}
        {activeTab === 'command' && (
          <div className="space-y-6">
            
            {/* Top Interactive Metric Grid */}
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-4">
              <SectorsOverview 
                sectors={sectors} 
                selectedSectorId={selectedSectorId} 
                onSelectSector={handleSelectSector} 
                lang={lang}
              />
            </div>

            {/* Core Row: Map Visualizer & Live Anomalies vs Advisor Chat */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Map & Live Alerts Area */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Simulated Spatial Intelligence Map */}
                <div className="h-[340px] md:h-[400px]">
                  <InteractiveMap 
                    anomalies={anomalies} 
                    selectedSectorId={selectedSectorId} 
                    onFocusAnomaly={handleFocusAnomaly} 
                    lang={lang}
                  />
                </div>

                {/* Focus Incident Alert Terminal */}
                <div className="bg-[#0a0c14]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        {TRANSLATIONS[lang].activeAlerts}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {TRANSLATIONS[lang].filtering}: {getActiveSectorName()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* List of active anomalies */}
                    <div className="md:col-span-5 space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                      {anomalies
                        .filter(a => a.sector === selectedSectorId || !selectedSectorId)
                        .map((anom) => {
                          const translatedAnom = ANOMALIES_TR[lang][anom.id] || anom;
                          const severityLabel = lang === 'hi' 
                            ? (anom.severity === 'high' ? 'उच्च' : 'मध्यम') 
                            : anom.severity.toUpperCase();
                          const timeLabel = lang === 'hi'
                            ? (anom.time === '2 hours ago' ? '२ घंटे पहले' : anom.time === 'Yesterday' ? 'कल' : anom.time.replace('Today', 'आज'))
                            : anom.time;

                          return (
                            <div
                              key={anom.id}
                              id={`alert-row-${anom.id}`}
                              onClick={() => setSelectedAnomaly(anom)}
                              className={`cursor-pointer p-2.5 rounded-xl border text-left transition-all ${
                                selectedAnomaly?.id === anom.id 
                                  ? 'bg-amber-500/10 border-amber-500/40 shadow-xs' 
                                  : 'bg-white/5 border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-mono text-amber-400 uppercase font-semibold">
                                  {severityLabel} {TRANSLATIONS[lang].severityAlert}
                                </span>
                                <span className="text-[9px] text-slate-500">{timeLabel}</span>
                              </div>
                              <span className="text-[11px] font-semibold text-white block truncate leading-tight">
                                {translatedAnom.title}
                              </span>
                            </div>
                          );
                        })}
                      {anomalies.filter(a => a.sector === selectedSectorId || !selectedSectorId).length === 0 && (
                        <div className="text-center p-4 text-[11px] text-slate-500 border border-dashed border-white/10 rounded-xl">
                          {TRANSLATIONS[lang].noAnomalies}
                        </div>
                      )}
                    </div>

                    {/* Detailed anomaly preview & recommended action card */}
                    <div className="md:col-span-7 bg-white/5 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between">
                      {selectedAnomaly ? (
                        <>
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-mono uppercase">
                                {lang === 'hi' 
                                  ? `${selectedAnomaly.severity === 'high' ? 'उच्च' : 'मध्यम'} ${TRANSLATIONS[lang].severityLabel}` 
                                  : `${selectedAnomaly.severity.toUpperCase()} Severity`}
                              </span>
                              <h4 className="text-xs font-bold text-white uppercase">
                                {ANOMALIES_TR[lang][selectedAnomaly.id]?.title || selectedAnomaly.title}
                              </h4>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                              {ANOMALIES_TR[lang][selectedAnomaly.id]?.description || selectedAnomaly.description}
                            </p>
                          </div>

                          <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-2.5">
                            <span className="text-[9px] uppercase tracking-wider font-mono text-blue-400 font-bold block mb-1 flex items-center gap-1">
                              <Brain className="h-3.5 w-3.5" /> {TRANSLATIONS[lang].aiMitigationStrategy}
                            </span>
                            <p className="text-[11px] text-slate-200 leading-normal italic">
                              "{ANOMALIES_TR[lang][selectedAnomaly.id]?.recommendation || selectedAnomaly.recommendation}"
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-4">
                          <ShieldQuestion className="h-8 w-8 text-slate-600 mb-1.5" />
                          <span className="text-xs font-medium">{TRANSLATIONS[lang].noAnomalyFocused}</span>
                          <p className="text-[10px] text-slate-600">{TRANSLATIONS[lang].noAnomalyFocusedDesc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Chat Advisor Sidebar (Always grounded with current sector operational logs) */}
              <div className="lg:col-span-4 flex flex-col">
                <CityAdvisorChat 
                  selectedSectorId={selectedSectorId} 
                  sectorName={getActiveSectorName()} 
                  lang={lang}
                />
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: Scenario Simulation Engine */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-blue-400" />
                    {TRANSLATIONS[lang].urbanSimulator}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {TRANSLATIONS[lang].simulatorSubtitle}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono rounded">
                    {TRANSLATIONS[lang].heuristicsActive}
                  </span>
                  <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono rounded">
                    {TRANSLATIONS[lang].predictiveLlm}
                  </span>
                </div>
              </div>

              <SimulationConsole historyData={history} lang={lang} />
            </div>
          </div>
        )}

        {/* TAB 3: Document Intelligence & Thematic Analyzer */}
        {activeTab === 'intelligence' && (
          <div className="space-y-6">
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Upload className="h-5 w-5 text-indigo-400" />
                    {TRANSLATIONS[lang].citizenDocHub}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {TRANSLATIONS[lang].citizenDocHubDesc}
                  </p>
                </div>
                <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono rounded self-start md:self-auto">
                  {TRANSLATIONS[lang].ragEngine}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                  <DocumentAnalyzer lang={lang} />
                </div>
                
                {/* Side Informative Policy Guidelines Card */}
                <div className="lg:col-span-5 bg-[#0a0c14]/90 border border-white/10 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                    {TRANSLATIONS[lang].responsibleAi}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {TRANSLATIONS[lang].responsibleAiDesc}
                  </p>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <div className="p-1 bg-blue-500/10 text-blue-400 rounded-lg">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{TRANSLATIONS[lang].explainableHeuristics}</span>
                        <span className="text-slate-400 text-[11px] block">{TRANSLATIONS[lang].explainableHeuristicsDesc}</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="p-1 bg-blue-500/10 text-blue-400 rounded-lg">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{TRANSLATIONS[lang].noPiLeaks}</span>
                        <span className="text-slate-400 text-[11px] block">{TRANSLATIONS[lang].noPiLeaksDesc}</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="p-1 bg-blue-500/10 text-blue-400 rounded-lg">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{TRANSLATIONS[lang].interactiveSynthesis}</span>
                        <span className="text-slate-400 text-[11px] block">{TRANSLATIONS[lang].interactiveSynthesisDesc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Status Bar */}
      <footer className="h-10 border-t border-white/10 bg-[#0a0c14] flex flex-col sm:flex-row items-center justify-between px-6 shrink-0 text-center gap-2 py-2 sm:py-0">
        <div className="flex gap-4 md:gap-6 text-[10px] font-mono uppercase tracking-widest text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> {TRANSLATIONS[lang].systemStable}
          </span>
          <span>{TRANSLATIONS[lang].latency}: 14ms</span>
          <span>{TRANSLATIONS[lang].nodesOnline}: 1,402</span>
        </div>
        <div className="text-[10px] font-mono text-slate-500">
          {TRANSLATIONS[lang].lastUpdated}: 2026.07.05 // 20:10:24 UTC
        </div>
      </footer>

    </div>
  );
}
