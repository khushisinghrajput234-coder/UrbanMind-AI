import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, Bot, User, Trash2 } from 'lucide-react';
import { ChatMessage, SectorId } from '../types.js';
import { Language, TRANSLATIONS, SUGGESTIONS_TR, SECTORS_TR } from '../translations.js';

interface CityAdvisorChatProps {
  selectedSectorId: SectorId;
  sectorName: string;
  lang: Language;
}

export default function CityAdvisorChat({ selectedSectorId, sectorName, lang }: CityAdvisorChatProps) {
  const getWelcomeMessage = (lng: Language, secName: string) => {
    if (lng === 'hi') {
      return `नमस्ते! मैं आपका **अर्बनमाइंड एआई निर्णय सलाहकार** हूँ। मैंने हमारे सक्रिय नगरपालिका डेटासेट का विश्लेषण किया है।

आप वर्तमान में **${secName}** की समीक्षा कर रहे हैं। विशिष्ट सुधार मापदंडों के बारे में पूछें, नीतियों की सिफारिश करें, या आरंभ करने के लिए नीचे दिए गए रणनीतिक सुझावों में से किसी एक को चुनें।`;
    }
    return `Hello! I am your **UrbanMind AI Decision Advisor**. I have synthesized our active municipal datasets.

You are currently inspecting **${secName}**. Ask me about specific optimization vectors, recommend policies, or select one of the strategic suggestions below to begin.`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: getWelcomeMessage(lang, sectorName),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Update welcome message if sector/lang changes and chat is empty or just has welcome
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      const activeSectorNameTranslated = SECTORS_TR[lang][selectedSectorId]?.name || sectorName;
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: getWelcomeMessage(lang, activeSectorNameTranslated),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  }, [selectedSectorId, sectorName, lang]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          sectorId: selectedSectorId,
          lang: lang
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        sender: 'assistant',
        text: data.text || (lang === 'hi' ? "मुझे क्षमा करें, लेकिन उस अंतर्दृष्टि को तैयार करने में त्रुटि आई। कृपया पुनः प्रयास करें।" : "I apologize, but I encountered an error formulating that insight. Please try again."),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        sender: 'assistant',
        text: lang === 'hi' 
          ? "### ⚠️ सलाहकार कनेक्शन त्रुटि\n\nसिटी एडवाइजर बैकएंड से संपर्क नहीं हो सका। कृपया सुनिश्चित करें कि सर्वर पूरी तरह से चल रहा है।"
          : "### ⚠️ Advisor Connection Error\n\nCould not communicate with the City Advisor backend. Please make sure the server is fully running.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    const activeSectorNameTranslated = SECTORS_TR[lang][selectedSectorId]?.name || sectorName;
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: lang === 'hi' 
          ? `चैट डेटाबेस रीसेट किया गया। मैं **${activeSectorNameTranslated}** से जुड़े मुद्दों पर सलाह देने के लिए तैयार हूँ।`
          : `Chat database reset. I am ready to advise on **${activeSectorNameTranslated}** issues.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const activeSectorNameTranslated = SECTORS_TR[lang][selectedSectorId]?.name || sectorName;
  const suggestions = SUGGESTIONS_TR[lang][selectedSectorId] || [];

  return (
    <div className="flex flex-col h-full bg-[#0a0c14]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">{TRANSLATIONS[lang].advisorAssistant}</h3>
            <span className="text-[10px] text-slate-400 font-mono">
              {TRANSLATIONS[lang].scoped}: <span className="text-blue-400 font-semibold">{activeSectorNameTranslated}</span>
            </span>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-slate-500 hover:text-red-400 p-1.5 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          title={TRANSLATIONS[lang].clearHistory}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 max-h-[340px] md:max-h-[none] custom-scrollbar text-xs">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border ${
                isUser ? 'bg-blue-600/30 border-blue-500/50 text-blue-300' : 'bg-slate-800 border-white/10 text-slate-300'
              }`}>
                {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
              </div>

              <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed border ${
                isUser 
                  ? 'bg-blue-500/10 border-blue-500/30 text-slate-100 rounded-tr-none' 
                  : 'bg-white/5 border-white/10 text-slate-300 rounded-tl-none'
              }`}>
                {/* Simplified custom markdown display for headings/bold/bullets */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.text.split('\n').map((line, lIdx) => {
                    if (line.startsWith('### ')) {
                      return <h4 key={lIdx} className="text-xs font-bold text-white mt-2 mb-1 uppercase tracking-wider">{line.replace('### ', '')}</h4>;
                    }
                    if (line.startsWith('#### ')) {
                      return <h5 key={lIdx} className="text-[11px] font-bold text-blue-400 mt-2 mb-1">{line.replace('#### ', '')}</h5>;
                    }
                    if (line.startsWith('* **') || line.startsWith('- **')) {
                      // Match bold bullets
                      const cleanLine = line.replace(/^[\*\-]\s+\*\*/, '').replace(/\*\*$/, '');
                      const parts = cleanLine.split('**');
                      return (
                        <div key={lIdx} className="flex gap-1.5 ml-1 my-0.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>
                            <strong className="text-white">{parts[0]}</strong>
                            {parts[1] || ''}
                          </span>
                        </div>
                      );
                    }
                    if (line.startsWith('* ') || line.startsWith('- ')) {
                      return (
                        <div key={lIdx} className="flex gap-1.5 ml-2 my-0.5">
                          <span className="text-blue-400">•</span>
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }
                    if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                      return (
                        <div key={lIdx} className="flex gap-1.5 ml-2 my-0.5">
                          <span className="text-indigo-400 font-semibold">{line.substring(0, 2)}</span>
                          <span>{line.substring(3)}</span>
                        </div>
                      );
                    }
                    // Handle inline bold formatting inside regular lines
                    if (line.includes('**')) {
                      const parts = line.split('**');
                      return (
                        <p key={lIdx}>
                          {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{p}</strong> : p)}
                        </p>
                      );
                    }
                    return <p key={lIdx}>{line}</p>;
                  })}
                </div>
                <span className="block text-[9px] text-slate-500 mt-2 text-right font-mono">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center animate-pulse">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <div className="bg-white/5 border border-white/10 text-slate-400 rounded-xl rounded-tl-none px-3.5 py-3 flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 animate-pulse">{TRANSLATIONS[lang].synthesizing}</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-white/5 border-t border-white/10 space-y-1.5 shrink-0">
        <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 block">{TRANSLATIONS[lang].focusQueries} ({activeSectorNameTranslated}):</span>
        <div className="flex flex-wrap gap-1.5 max-h-[82px] overflow-y-auto custom-scrollbar">
          {suggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[10px] text-slate-300 bg-white/5 hover:bg-blue-500/15 border border-white/10 hover:border-blue-500/30 rounded-lg px-2.5 py-1 text-left transition-all leading-tight cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10 bg-slate-950/80 shrink-0">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'hi' ? `${activeSectorNameTranslated} के बारे में पूछें...` : `${TRANSLATIONS[lang].askAbout} ${activeSectorNameTranslated}...`}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-colors cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
