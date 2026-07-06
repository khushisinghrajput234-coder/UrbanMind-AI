import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, ShieldAlert, FileCode, Check, Send, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations.js';

interface DocumentAnalyzerProps {
  onAnalyzeFinished?: (report: string) => void;
  lang: Language;
}

const SAMPLE_CIVIC_FEEDBACKS_TR: Record<Language, { title: string; content: string }[]> = {
  en: [
    {
      title: "District 4 Resident Survey (Transportation Focus)",
      content: `Resident Feedback Log - District 4 Sector C (East Ward).
"The new light rail line has improved my morning commute, but walking from the station is dark and feels unsafe. Additionally, the trash cans near the exits are constantly overflowing, and there are no EV charging spots in the nearby public lot. Please synchronize the bus schedules better with the rail line—if the train is 2 minutes late, we miss the final connecting shuttle, leaving us stranded for another 30 minutes. This is extremely frustrating for night shift workers!"`
    },
    {
      title: "Greenhouse Gas & Environmental Air Report",
      content: `MUNICIPAL SENSOR EMISSION EXCERPT - BUFFER AREA B.
"A continuous spike in carbon particulate count has been registered near the eastern arterial highway during the early morning hours (06:00 to 09:00). Air Quality Index peaked past 140 multiple times. The stagnation can be traced to high moisture and calm winds. Citizens from nearby apartment blocks have logged numerous respiratory irritation tickets in our civic dashboard. Emergency response needs to inspect nearby factory venting filters."`
    },
    {
      title: "Healthcare Clinic Access Review",
      content: `NEIGHBORHOOD CLINICAL AUDIT REPORT.
"Wait times at the wellness clinic are averaging 48 minutes during weekdays. Senior citizens express deep disappointment that the automated check-in kiosks are not accessible or user-friendly. Translation assistance is completely missing for non-English speakers. There is a strong demand for wellness workshops and mobile health diagnostics inside community centers to prevent seniors from having to travel during peak hours."`
    }
  ],
  hi: [
    {
      title: "जिला 4 निवासी सर्वेक्षण (परिवहन ध्यान)",
      content: `निवासी प्रतिक्रिया लॉग - जिला 4 क्षेत्र सी (पूर्वी वार्ड)।
"नई लाइट रेल लाइन ने मेरी सुबह की यात्रा में सुधार किया है, लेकिन स्टेशन से चलना अंधेरा और असुरक्षित लगता है। इसके अतिरिक्त, निकास द्वारों के पास कचरा डिब्बे लगातार भर रहे हैं, और पास के सार्वजनिक पार्किंग स्थल में कोई ईवी चार्जिंग स्थान नहीं है। कृपया बस शेड्यूल को रेल लाइन के साथ बेहतर रूप से तालमेल करें—यदि ट्रेन 2 मिनट भी लेट होती है, तो हमारी अंतिम कनेक्टिंग शटल छूट जाती है, जिससे हमें और 30 मिनट तक फंसे रहना पड़ता है। यह रात्रि पाली के कर्मचारियों के लिए बेहद निराशाजनक है!"`
    },
    {
      title: "ग्रीनहाउस गैस और पर्यावरण वायु रिपोर्ट",
      content: `नगर निगम सेंसर उत्सर्जन अंश - बफर क्षेत्र ख।
"सुबह के शुरुआती घंटों (06:00 से 09:00) के दौरान पूर्वी धमनी राजमार्ग के पास कार्बन कणों की संख्या में निरंतर वृद्धि दर्ज की गई है। वायु गुणवत्ता सूचकांक कई बार 140 से ऊपर पहुंच गया। इस ठहराव का कारण उच्च नमी और शांत हवाओं को माना जा सकता है। पास के अपार्टमेंट ब्लॉकों के नागरिकों ने हमारे नागरिक डैशबोर्ड में श्वसन संबंधी समस्याओं की कई शिकायतें दर्ज की हैं। आपातकालीन प्रतिक्रिया दल को पास के कारखाने के वेंटिंग फिल्टर का निरीक्षण करने की आवश्यकता है।"`
    },
    {
      title: "स्वास्थ्य सेवा क्लिनिक पहुंच समीक्षा",
      content: `पड़ोसी क्लिनिकल ऑडिट रिपोर्ट।
"सप्ताह के दिनों में कल्याण क्लिनिक में प्रतीक्षा समय औसतन 48 मिनट है। वरिष्ठ नागरिकों ने गहरी निराशा व्यक्त की है कि स्वचालित चेक-इन कियोस्क सुलभ या उपयोगकर्ता के अनुकूल नहीं हैं। गैर-अंग्रेजी भाषियों के लिए अनुवाद सहायता पूरी तरह से गायब है। सामुदायिक केंद्रों के भीतर कल्याण कार्यशालाओं और मोबाइल स्वास्थ्य निदान की तीव्र मांग है ताकि वरिष्ठ नागरिकों को व्यस्त घंटों के दौरान यात्रा न करनी पड़े।"`
    }
  ]
};

export default function DocumentAnalyzer({ onAnalyzeFinished, lang }: DocumentAnalyzerProps) {
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisReport, setAnalysisReport] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerAnalyze = async (name: string, content: string) => {
    if (!content.trim() || analyzing) return;
    setAnalyzing(true);
    setFileName(name);
    setAnalysisReport('');

    try {
      const res = await fetch('/api/analyze-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: name,
          fileContent: content,
          fileType: 'text/plain',
          lang: lang
        })
      });

      const data = await res.json();
      setAnalysisReport(data.text);
      if (onAnalyzeFinished) {
        onAnalyzeFinished(data.text);
      }
    } catch (err) {
      console.error(err);
      setAnalysisReport(
        lang === 'hi' 
          ? "### ⚠️ विश्लेषण विफल रहा\n\nइस समय विषयगत मूल्यांकन पूरा करने में असमर्थ। कृपया अपने नेटवर्क कनेक्शन की जाँच करें और पुनः प्रयास करें।"
          : "### ⚠️ Analysis Failed\n\nUnable to complete thematic evaluation at this time. Please check your network connection and retry."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const cleanRawPdfText = (raw: string): string => {
    if (!raw.includes('%PDF-')) return raw;
    // Extract readable word patterns while filtering out PDF structural commands
    const matches = raw.match(/[a-zA-Z0-9\s\.\,\-\_\:\(\)\[\]]{5,}/g);
    if (matches) {
      const filtered = matches
        .map(s => s.trim())
        .filter(s => {
          const l = s.toLowerCase();
          return s.length > 8 && 
            !l.includes('obj') && 
            !l.includes('endobj') && 
            !l.includes('stream') && 
            !l.includes('endstream') && 
            !l.includes('length') && 
            !l.includes('filter') && 
            !l.includes('mediabox');
        })
        .join('\n');
      return `[EXTRACTED PROTO REPORT DATA FROM PDF]\n\n${filtered.substring(0, 3500)}...`;
    }
    return raw;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        let text = event.target?.result as string;
        if (file.name.endsWith('.pdf')) {
          text = cleanRawPdfText(text);
        }
        setInputText(text);
        triggerAnalyze(file.name, text);
      };
      reader.readAsText(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        let text = event.target?.result as string;
        if (file.name.endsWith('.pdf')) {
          text = cleanRawPdfText(text);
        }
        setInputText(text);
        triggerAnalyze(file.name, text);
      };
      reader.readAsText(file);
    }
  };

  const sampleFeedbacks = SAMPLE_CIVIC_FEEDBACKS_TR[lang] || SAMPLE_CIVIC_FEEDBACKS_TR.en;

  return (
    <div className="bg-[#0a0c14]/90 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-2xl backdrop-blur-md">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
          <Upload className="h-4 w-4 text-indigo-400" />
          {TRANSLATIONS[lang].thematicAnalyzer}
        </h3>
        <p className="text-[11px] text-slate-400">
          {TRANSLATIONS[lang].thematicAnalyzerDesc}
        </p>
      </div>

      {/* Drag & Drop Board */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
          isDragActive 
            ? 'border-indigo-400 bg-indigo-500/10' 
            : 'border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt,.csv,.json,.md,.pdf"
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          <FileText className={`h-8 w-8 ${isDragActive ? 'text-indigo-400 animate-pulse' : 'text-slate-500'}`} />
          <span className="text-xs text-slate-200 font-medium">
            {TRANSLATIONS[lang].dragAndDrop}
          </span>
          <span className="text-[10px] text-slate-500">
            {TRANSLATIONS[lang].supportsFiles}
          </span>
        </div>
      </div>

      {/* Quick Samples Selection */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">{TRANSLATIONS[lang].selectPreloaded}</span>
        <div className="flex flex-col gap-2">
          {sampleFeedbacks.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(sample.content);
                triggerAnalyze(sample.title, sample.content);
              }}
              className="text-left text-[11px] bg-white/5 border border-white/10 hover:border-indigo-500/30 rounded-xl p-2.5 hover:bg-indigo-600/10 transition-all text-slate-300 flex items-start gap-2 cursor-pointer"
            >
              <FileCode className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">{sample.title}</span>
                <span className="line-clamp-1 text-slate-400 text-[10px]">{sample.content}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Area Manual Paste */}
      <div className="space-y-2">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={TRANSLATIONS[lang].pasteCustom}
          className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 resize-none"
        />
        <button
          onClick={() => triggerAnalyze("Custom_Input.txt", inputText)}
          disabled={!inputText.trim() || analyzing}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 font-semibold text-white rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        >
          {analyzing ? (
            <>
              <Sparkles className="h-4 w-4 animate-spin text-blue-200" />
              <span>{TRANSLATIONS[lang].analyzingThemes}</span>
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              <span>{TRANSLATIONS[lang].analyzeAndGenerate}</span>
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysisReport && (
        <div className="mt-2 p-4 bg-slate-950/80 border border-white/10 rounded-xl space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> {TRANSLATIONS[lang].analysisComplete}
            </span>
            <span className="text-[9px] text-slate-500 font-mono">{fileName}</span>
          </div>

          <div className="text-xs text-slate-300 space-y-2.5 leading-relaxed">
            {analysisReport.split('\n').map((line, idx) => {
              if (line.startsWith('### ')) {
                return <h4 key={idx} className="text-xs font-bold text-white uppercase tracking-wider mt-4 border-l-2 border-indigo-500 pl-2">{line.replace('### ', '')}</h4>;
              }
              if (line.startsWith('#### ')) {
                return <h5 key={idx} className="text-[11px] font-bold text-indigo-400 mt-2">{line.replace('#### ', '')}</h5>;
              }
              if (line.startsWith('* **') || line.startsWith('- **') || line.startsWith('1. **')) {
                const parts = line.replace(/^(\*|\-|\d+\.)\s+\*\*/, '').replace(/\*\*$/, '').split('**');
                return (
                  <div key={idx} className="flex gap-1.5 ml-1">
                    <span className="text-indigo-500">•</span>
                    <span>
                      <strong className="text-white font-medium">{parts[0]}</strong>
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
      )}
    </div>
  );
}
