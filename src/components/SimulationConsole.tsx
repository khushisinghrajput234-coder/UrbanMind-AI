import React, { useState, useEffect } from 'react';
import { Sliders, RefreshCw, BarChart2, TrendingUp, Cpu, Sparkles, HelpCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SimulationParameters, SimulatedImpact, MetricHistoryPoint } from '../types.js';
import { Language, TRANSLATIONS } from '../translations.js';

interface SimulationConsoleProps {
  historyData: MetricHistoryPoint[];
  lang: Language;
}

export default function SimulationConsole({ historyData, lang }: SimulationConsoleProps) {
  const [params, setParams] = useState<SimulationParameters>({
    transitFunding: 45,
    greenInfrastructure: 40,
    emergencyServices: 55,
    healthWellnessAlloc: 50,
    citizenEngagement: 60
  });

  const getDefaultBrief = (lng: Language) => {
    if (lng === 'hi') {
      return `### 📈 पूर्व-निर्धारित बेसलाइन रणनीति: सामुदायिक एकीकरण कोर

आपकी चुनी हुई संतुलित नीति व्यापक सामुदायिक स्थिरता पर केंद्रित है:
1. **गतिशीलता रणनीति**: **45%** पर समर्पित पारगमन बजट औसत शहर आवागमन देरी को **25 मिनट** तक कम करता है।
2. **जलवायु संकेतक**: वायु गुणवत्ता सूचकांक **72 AQI** दर्ज करता है, जो प्रमुख जिलों में स्थिर वायु परिस्थितियों को दर्शाता है।
3. **आपातकालीन प्रतिक्रिया और विश्वास**: आवंटन स्तर यह सुनिश्चित करते हैं कि अपराध दर **37/100** पर कम रहे, जबकि सार्वजनिक विश्वास **71%** पर स्थिर रहे।

*एआई द्वारा गतिशील अनुमानित ट्रेड-ऑफ देखने के लिए, बाएं पैनल पर किसी भी स्लाइडर को संशोधित करें और **भविष्य का अनुकरण करें** पर क्लिक करें।*`;
    }
    return `### 📈 Preset Baseline Strategy: Community Integration Core

Your selected balanced parameters are focused on broad community stability:
1. **Mobility Strategy**: Dedicated transit funding at **45%** cuts average city commute delays down to **25 minutes**.
2. **Climate Metrics**: Air Quality Index registers at **72 AQI**, which shows stable air conditions in core districts.
3. **Emergency Dispatch & Community Trust**: Allocation levels ensure crime rate remains low at **37/100** while Public Trust stabilizes at **71%**.

*To see Gemini predictive trade-offs adapt dynamically, modify any slider on the left panel and click **Simulate Strategic Future**.*`;
  };

  const [loading, setLoading] = useState(false);
  const [impact, setImpact] = useState<SimulatedImpact | null>({
    parameters: {
      transitFunding: 45,
      greenInfrastructure: 40,
      emergencyServices: 55,
      healthWellnessAlloc: 50,
      citizenEngagement: 60
    },
    metrics: {
      avgCommuteTime: 25,
      airQualityIndex: 72,
      crimeRateIndex: 37,
      seniorServicesReach: 73,
      publicTrustRating: 71
    },
    aiRecommendation: getDefaultBrief(lang)
  });

  // Keep preset brief updated if language switches before user does a custom run
  useEffect(() => {
    if (impact && impact.parameters.transitFunding === 45 && impact.parameters.greenInfrastructure === 40 && impact.parameters.emergencyServices === 55 && impact.parameters.healthWellnessAlloc === 50 && impact.parameters.citizenEngagement === 60) {
      setImpact(prev => prev ? {
        ...prev,
        aiRecommendation: getDefaultBrief(lang)
      } : null);
    }
  }, [lang]);

  const handleSliderChange = (key: keyof SimulationParameters, value: number) => {
    setParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          lang: lang
        })
      });
      const data = await res.json();
      setImpact(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMetricStyle = (val: number, type: 'commute' | 'aqi' | 'crime' | 'care' | 'trust') => {
    switch (type) {
      case 'commute': // Lower is better
        return val < 20 ? 'text-emerald-400' : val < 28 ? 'text-blue-400' : 'text-amber-400';
      case 'aqi': // Lower is better
        return val < 50 ? 'text-emerald-400' : val < 85 ? 'text-blue-400' : 'text-amber-400';
      case 'crime': // Lower is better
        return val < 25 ? 'text-emerald-400' : val < 45 ? 'text-blue-400' : 'text-amber-400';
      case 'care': // Higher is better
        return val > 75 ? 'text-emerald-400' : val > 50 ? 'text-blue-400' : 'text-slate-400';
      case 'trust': // Higher is better
        return val > 75 ? 'text-emerald-400' : val > 55 ? 'text-blue-400' : 'text-amber-400';
    }
  };

  return (
    <div className="bg-[#0a0c14]/90 border border-white/10 rounded-2xl p-5 flex flex-col gap-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-blue-400" />
            {TRANSLATIONS[lang].strategicScenarioEngine}
          </h3>
          <p className="text-[11px] text-slate-400">
            {TRANSLATIONS[lang].adjustBudget}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase">
            {TRANSLATIONS[lang].confidence}: 98.4%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">{TRANSLATIONS[lang].policyParameters}</span>

          {/* Slider 1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 font-medium">{TRANSLATIONS[lang].urbanTransitFunding}</span>
              <span className="text-blue-400 font-bold font-mono">{params.transitFunding}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={params.transitFunding}
              onChange={(e) => handleSliderChange('transitFunding', Number(e.target.value))}
              className="w-full accent-blue-500 bg-white/5 h-1.5 rounded-lg cursor-pointer"
            />
            <p className="text-[9px] text-slate-500">{TRANSLATIONS[lang].transitFundingDesc}</p>
          </div>

          {/* Slider 2 */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 font-medium">{TRANSLATIONS[lang].greenInfrastructure}</span>
              <span className="text-emerald-400 font-bold font-mono">{params.greenInfrastructure}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={params.greenInfrastructure}
              onChange={(e) => handleSliderChange('greenInfrastructure', Number(e.target.value))}
              className="w-full accent-emerald-500 bg-white/5 h-1.5 rounded-lg cursor-pointer"
            />
            <p className="text-[9px] text-slate-500">{TRANSLATIONS[lang].greenInfrastructureDesc}</p>
          </div>

          {/* Slider 3 */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 font-medium">{TRANSLATIONS[lang].emergencyResponse}</span>
              <span className="text-red-400 font-bold font-mono">{params.emergencyServices}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={params.emergencyServices}
              onChange={(e) => handleSliderChange('emergencyServices', Number(e.target.value))}
              className="w-full accent-red-500 bg-white/5 h-1.5 rounded-lg cursor-pointer"
            />
            <p className="text-[9px] text-slate-500">{TRANSLATIONS[lang].emergencyResponseDesc}</p>
          </div>

          {/* Slider 4 */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 font-medium">{TRANSLATIONS[lang].healthcareWellness}</span>
              <span className="text-purple-400 font-bold font-mono">{params.healthWellnessAlloc}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={params.healthWellnessAlloc}
              onChange={(e) => handleSliderChange('healthWellnessAlloc', Number(e.target.value))}
              className="w-full accent-purple-500 bg-white/5 h-1.5 rounded-lg cursor-pointer"
            />
            <p className="text-[9px] text-slate-500">{TRANSLATIONS[lang].healthcareWellnessDesc}</p>
          </div>

          {/* Slider 5 */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 font-medium">{TRANSLATIONS[lang].civicSentiment}</span>
              <span className="text-amber-400 font-bold font-mono">{params.citizenEngagement}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={params.citizenEngagement}
              onChange={(e) => handleSliderChange('citizenEngagement', Number(e.target.value))}
              className="w-full accent-amber-500 bg-white/5 h-1.5 rounded-lg cursor-pointer"
            />
            <p className="text-[9px] text-slate-500">{TRANSLATIONS[lang].civicSentimentDesc}</p>
          </div>

          <button
            onClick={runSimulation}
            disabled={loading}
            className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-blue-200" />
                <span>{TRANSLATIONS[lang].simulating}</span>
              </>
            ) : (
              <>
                <Cpu className="h-4 w-4" />
                <span>{TRANSLATIONS[lang].simulateFuture}</span>
              </>
            )}
          </button>
        </div>

        {/* Outcomes & AI Recommendation */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">{TRANSLATIONS[lang].projectedBreakthroughs}</span>

          {impact && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <span className="text-[9px] text-slate-500 block font-mono uppercase">{TRANSLATIONS[lang].commuteDelay}</span>
                <span className={`text-lg font-bold block ${getMetricStyle(impact.metrics.avgCommuteTime, 'commute')}`}>
                  {impact.metrics.avgCommuteTime}m
                </span>
                <span className="text-[8px] text-slate-400 font-mono">{TRANSLATIONS[lang].baseline}: 35m</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <span className="text-[9px] text-slate-500 block font-mono uppercase">{TRANSLATIONS[lang].airQuality}</span>
                <span className={`text-lg font-bold block ${getMetricStyle(impact.metrics.airQualityIndex, 'aqi')}`}>
                  {impact.metrics.airQualityIndex}
                </span>
                <span className="text-[8px] text-slate-400 font-mono">{TRANSLATIONS[lang].aqiIndex}</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <span className="text-[9px] text-slate-500 block font-mono uppercase">{TRANSLATIONS[lang].crimeIndex}</span>
                <span className={`text-lg font-bold block ${getMetricStyle(impact.metrics.crimeRateIndex, 'crime')}`}>
                  {impact.metrics.crimeRateIndex}
                </span>
                <span className="text-[8px] text-slate-400 font-mono">{TRANSLATIONS[lang].max}: 100</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <span className="text-[9px] text-slate-500 block font-mono uppercase">{TRANSLATIONS[lang].seniorCare}</span>
                <span className={`text-lg font-bold block ${getMetricStyle(impact.metrics.seniorServicesReach, 'care')}`}>
                  {impact.metrics.seniorServicesReach}%
                </span>
                <span className="text-[8px] text-slate-400 font-mono">{TRANSLATIONS[lang].reachScore}</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center col-span-2 md:col-span-1">
                <span className="text-[9px] text-slate-500 block font-mono uppercase">{TRANSLATIONS[lang].publicTrust}</span>
                <span className={`text-lg font-bold block ${getMetricStyle(impact.metrics.publicTrustRating, 'trust')}`}>
                  {impact.metrics.publicTrustRating}%
                </span>
                <span className="text-[8px] text-slate-400 font-mono">{TRANSLATIONS[lang].surveyIndex}</span>
              </div>
            </div>
          )}

          {/* AI Recommendation Markdown Panel */}
          <div className="bg-slate-950/80 border border-white/10 rounded-xl p-4 flex-grow min-h-[140px] max-h-[220px] overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">{TRANSLATIONS[lang].aiGenerativeBrief}</span>
            </div>

            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              {impact?.aiRecommendation.split('\n').map((line, idx) => {
                if (line.startsWith('### ')) {
                  return <h4 key={idx} className="text-xs font-bold text-white uppercase tracking-wider mt-3 mb-1">{line.replace('### ', '')}</h4>;
                }
                if (line.startsWith('#### ')) {
                  return <h5 key={idx} className="text-[11px] font-bold text-blue-400 mt-2 mb-1">{line.replace('#### ', '')}</h5>;
                }
                if (line.startsWith('* **') || line.startsWith('- **') || line.startsWith('1. **')) {
                  const parts = line.replace(/^(\*|\-|\d+\.)\s+\*\*/, '').replace(/\*\*$/, '').split('**');
                  return (
                    <div key={idx} className="flex gap-1.5 ml-1">
                      <span className="text-blue-500">•</span>
                      <span>
                        <strong className="text-white font-semibold">{parts[0]}</strong>
                        {parts[1] || ''}
                      </span>
                    </div>
                  );
                }
                if (line.startsWith('* ') || line.startsWith('- ')) {
                  return (
                    <div key={idx} className="flex gap-1.5 ml-2">
                      <span className="text-blue-400">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  );
                }
                return <p key={idx}>{line}</p>;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Trend Charts using Recharts */}
      <div className="border-t border-white/10 pt-4 mt-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
            <BarChart2 className="h-3.5 w-3.5" /> {TRANSLATIONS[lang].historicalTimeline}
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
            <TrendingUp className="h-3 w-3 text-emerald-500" /> +15% {TRANSLATIONS[lang].cumulativeCivic}
          </span>
        </div>

        <div className="h-44 w-full bg-white/5 border border-white/5 rounded-xl p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 5, right: 15, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} />
              <YAxis stroke="#94a3b8" fontSize={9} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 10 }} />
              <Legend wrapperStyle={{ fontSize: 9, color: '#94a3b8' }} />
              <Line type="monotone" dataKey="mobilityCongestion" name={lang === 'hi' ? 'पारगमन भीड़भाड़' : 'Transit Congestion'} stroke="#3b82f6" strokeWidth={1.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="environmentAQI" name={lang === 'hi' ? 'वायु गुणवत्ता स्तर' : 'AQI Level'} stroke="#10b981" strokeWidth={1.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="feedbackSatisfaction" name={lang === 'hi' ? 'नागरिक भावना' : 'Civic Sentiment'} stroke="#f59e0b" strokeWidth={1.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
