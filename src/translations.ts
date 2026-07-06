/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'hi';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Top bar / common
    commandCenter: "Command Center",
    scenarioEngine: "Scenario Engine",
    thematicAnalysis: "Thematic Analysis",
    decisionPlatform: "DECISION PLATFORM v4.2",
    empoweringSubtitle: "Empowering Citizens and City Planners with Predictive Intelligence",
    geminiActive: "Gemini-3.5 Active",
    systemStable: "SYSTEM STABLE",
    latency: "LATENCY",
    nodesOnline: "NODES ONLINE",
    lastUpdated: "LAST UPDATED",

    // Sectors Overview
    sectorMonitors: "Operational Sector Monitors",
    sectorMonitorsSubtitle: "Select any sector below to scope active inquiries and filter metrics.",
    liveConnection: "Live Connection",
    active: "Active",
    focusInquiries: "Focus Inquiries",

    // Interactive Map
    sensorCoordinates: "Sensor Coordinates",
    mapSubtitle: "Pulsing nodes highlight operational anomalies. Hover/Click pins to drill down into advisor insights.",
    boundaries: "Boundaries",
    heatmapOverlay: "Heatmap Overlay",
    activeSensors: "Active Sensors",
    activeAlerts: "Active Operational Alerts",
    filtering: "Filtering",
    noAnomalies: "No active anomalies registered in this sector.",
    aiMitigationStrategy: "Proposed AI Mitigation Strategy",
    noAnomalyFocused: "No Anomaly Focused",
    noAnomalyFocusedDesc: "Select an alert node from the map or left column to display mitigation parameters.",
    severityAlert: "Alert",
    severityLabel: "Severity",

    // City Advisor Chat
    advisorAssistant: "Advisor Assistant",
    scoped: "Scoped",
    clearHistory: "Clear Conversation History",
    synthesizing: "Synthesizing Decision Space...",
    focusQueries: "Focus Queries",
    askAbout: "Ask about",

    // Simulator
    urbanSimulator: "Urban Forecasting Simulator",
    simulatorSubtitle: "Simulate city management policy changes dynamically. High-fidelity formulas combined with generative LLM briefs trace critical trade-offs.",
    heuristicsActive: "Heuristics: Active",
    predictiveLlm: "Predictive LLM: Grounded",
    strategicScenarioEngine: "Strategic Scenario Engine",
    adjustBudget: "Adjust budget allocations to simulate predictive impacts on community wellness and trust.",
    confidence: "Confidence",
    policyParameters: "Policy Parameters",
    urbanTransitFunding: "Urban Transit Funding",
    transitFundingDesc: "Expands bus lanes, rail lines, and commuter shuttle coverage.",
    greenInfrastructure: "Green Infrastructure",
    greenInfrastructureDesc: "Funds urban gardens, electric utility grids, and pollution sensor blocks.",
    emergencyResponse: "Emergency Response & Safety",
    emergencyResponseDesc: "Upgrades fire engines, incident reporting dispatch systems, and responders.",
    healthcareWellness: "Healthcare & Clinical Wellness",
    healthcareWellnessDesc: "Expands community clinical staffing and support for vulnerable citizens.",
    civicSentiment: "Civic Sentiment & Surveys",
    civicSentimentDesc: "Drives digital outreach forums and expedites citizen issue responses.",
    simulateFuture: "Simulate Strategic Future",
    simulating: "Simulating...",
    projectedBreakthroughs: "Projected Breakthroughs",
    commuteDelay: "Commute Delay",
    airQuality: "Air Quality",
    crimeIndex: "Crime Index",
    seniorCare: "Senior Care",
    publicTrust: "Public Trust",
    baseline: "Baseline",
    aqiIndex: "AQI Index",
    max: "Max",
    reachScore: "Reach Score",
    surveyIndex: "Survey index",
    aiGenerativeBrief: "AI Generative Predictive Brief",
    historicalTimeline: "Historical Parameter Timeline",
    cumulativeCivic: "Cumulative Civic Integration",

    // Document Analyzer
    citizenDocHub: "Citizen Document Intelligence Hub",
    citizenDocHubDesc: "Feed raw unstructured texts (resident surveys, climate sensor files, stakeholder briefs) to retrieve categorized themes, sentiments, and recommended municipal programs.",
    ragEngine: "RAG Analysis Engine",
    thematicAnalyzer: "Thematic Document Analyzer",
    thematicAnalyzerDesc: "Upload public letters, climate briefings, or stakeholder feedback surveys to extract patterns and policy metrics.",
    dragAndDrop: "Drag & drop citizen survey or report here, or click to browse",
    supportsFiles: "Supports .txt, .json, .csv, .md, and .pdf up to 5MB",
    selectPreloaded: "Or select a pre-loaded strategic raw survey:",
    pasteCustom: "Paste custom resident emails or civic logs directly...",
    analyzingThemes: "Analyzing Themes with Gemini...",
    analyzeAndGenerate: "Analyze Clipboard & Generate Policy Report",
    analysisComplete: "Analysis Complete",
    responsibleAi: "Responsible & Transparent AI Use",
    responsibleAiDesc: "Our Decision Intelligence platform uses strict grounded contexts. Every model output operates with localized municipal limits.",
    explainableHeuristics: "Explainable Heuristics",
    explainableHeuristicsDesc: "Calculations use validated urban models based on standard regional baselines.",
    noPiLeaks: "No Citizen PI Leaks",
    noPiLeaksDesc: "Document evaluation automatically redacts personal identifiable names and street coordinates to ensure anonymity.",
    interactiveSynthesis: "Interactive Multi-Channel Synthesis",
    interactiveSynthesisDesc: "Cross-reference analyzed surveys with the operational metrics map overlay to speed up municipal response times."
  },
  hi: {
    // Top bar / common
    commandCenter: "कमांड सेंटर",
    scenarioEngine: "सिनेरियो इंजन",
    thematicAnalysis: "विषयगत विश्लेषण",
    decisionPlatform: "निर्णय मंच v4.2",
    empoweringSubtitle: "अनुमानित बुद्धिमत्ता के साथ नागरिकों और शहर योजनाकारों को सशक्त बनाना",
    geminiActive: "जेमिनी-3.5 सक्रिय",
    systemStable: "सिस्टम स्थिर",
    latency: "विलंबता",
    nodesOnline: "ऑनलाइन नोड्स",
    lastUpdated: "अंतिम अपडेट",

    // Sectors Overview
    sectorMonitors: "परिचालन क्षेत्र मॉनिटर्स",
    sectorMonitorsSubtitle: "सक्रिय प्रश्नों की जांच करने और संकेतकों को फ़िल्टर करने के लिए नीचे किसी भी क्षेत्र का चयन करें।",
    liveConnection: "लाइव कनेक्शन",
    active: "सक्रिय",
    focusInquiries: "पूछताछ पर ध्यान दें",

    // Interactive Map
    sensorCoordinates: "सेंसर निर्देशांक",
    mapSubtitle: "पल्सिंग नोड्स परिचालन विसंगतियों को उजागर करते हैं। सलाहकार अंतर्दृष्टि में गहराई से जाने के लिए पिन पर माउस ले जाएं या क्लिक करें।",
    boundaries: "सीमाएं",
    heatmapOverlay: "हीटमैप ओवरले",
    activeSensors: "सक्रिय सेंसर",
    activeAlerts: "सक्रिय परिचालन अलर्ट",
    filtering: "फ़िल्टरिंग",
    noAnomalies: "इस क्षेत्र में कोई सक्रिय विसंगति दर्ज नहीं है।",
    aiMitigationStrategy: "प्रस्तावित एआई शमन रणनीति",
    noAnomalyFocused: "कोई विसंगति केंद्रित नहीं",
    noAnomalyFocusedDesc: "शमन मापदंडों को प्रदर्शित करने के लिए मानचित्र या बाएं कॉलम से एक अलर्ट नोड चुनें।",
    severityAlert: "अलर्ट",
    severityLabel: "गंभीरता",

    // City Advisor Chat
    advisorAssistant: "सलाहकार सहायक",
    scoped: "दायरा",
    clearHistory: "बातचीत साफ करें",
    synthesizing: "निर्णय स्थान का विश्लेषण किया जा रहा है...",
    focusQueries: "केंद्रित प्रश्न",
    askAbout: "के बारे में पूछें",

    // Simulator
    urbanSimulator: "शहरी पूर्वानुमान सिम्युलेटर",
    simulatorSubtitle: "शहर प्रबंधन नीति परिवर्तनों को गतिशील रूप से अनुकरण करें। उच्च-सटीकता सूत्र और जनरेटिव एलएलएम रिपोर्ट महत्वपूर्ण ट्रेड-ऑफ की पहचान करते हैं।",
    heuristicsActive: "ह्यूरिस्टिक्स: सक्रिय",
    predictiveLlm: "अनुमानित एलएलएम: आधारित",
    strategicScenarioEngine: "रणनीतिक परिदृश्य इंजन",
    adjustBudget: "सामुदायिक कल्याण और विश्वास पर अनुमानित प्रभावों का अनुकरण करने के लिए बजट आवंटन को समायोजित करें।",
    confidence: "आत्मविश्वास",
    policyParameters: "नीति मापदंड",
    urbanTransitFunding: "शहरी पारगमन बजट",
    transitFundingDesc: "बस लेन, रेल लाइनों और कम्यूटर शटल कवरेज का विस्तार करता है।",
    greenInfrastructure: "हरित अवसंरचना",
    greenInfrastructureDesc: "शहरी उद्यानों, इलेक्ट्रिक यूटिलिटी ग्रिड और प्रदूषण सेंसर ब्लॉकों को वित्तपोषित करता है।",
    emergencyResponse: "आपातकालीन प्रतिक्रिया और सुरक्षा",
    emergencyResponseDesc: "फायर इंजन, घटना रिपोर्टिंग प्रेषण प्रणाली और प्रतिक्रियाकर्ताओं को अपग्रेड करता है।",
    healthcareWellness: "स्वास्थ्य सेवा और कल्याण",
    healthcareWellnessDesc: "सामुदायिक नैदानिक ​​कर्मचारियों और कमजोर नागरिकों के लिए सहायता का विस्तार करता है।",
    civicSentiment: "नागरिक भावना और सर्वेक्षण",
    civicSentimentDesc: "डिजिटल आउटरीच मंचों को संचालित करता है और नागरिक मुद्दों के जवाबों को गति देता है।",
    simulateFuture: "भविष्य का अनुकरण करें",
    simulating: "अनुकरण किया जा रहा है...",
    projectedBreakthroughs: "अनुमानित सफलताएं",
    commuteDelay: "कम्यूटर देरी",
    airQuality: "वायु गुणवत्ता",
    crimeIndex: "अपराध सूचकांक",
    seniorCare: "वरिष्ठ नागरिक देखभाल",
    publicTrust: "सार्वजनिक विश्वास",
    baseline: "बुनियादी ढांचा",
    aqiIndex: "एक्यूआई सूचकांक",
    max: "अधिकतम",
    reachScore: "पहुंच स्कोर",
    surveyIndex: "सर्वेक्षण सूचकांक",
    aiGenerativeBrief: "एआई जनरेटिव प्रेडिक्टिव रिपोर्ट",
    historicalTimeline: "ऐतिहासिक पैरामीटर समयरेखा",
    cumulativeCivic: "संचयी नागरिक एकीकरण",

    // Document Analyzer
    citizenDocHub: "नागरिक दस्तावेज़ इंटेलिजेंस हब",
    citizenDocHubDesc: "श्रेणीबद्ध विषयों, भावनाओं और अनुशंसित नगरपालिका कार्यक्रमों को पुनः प्राप्त करने के लिए कच्चे असंरचित पाठ (निवासी सर्वेक्षण, जलवायु सेंसर फाइलें, हितधारक विवरण) दर्ज करें।",
    ragEngine: "आरएजी विश्लेषण इंजन",
    thematicAnalyzer: "विषयगत दस्तावेज़ विश्लेषक",
    thematicAnalyzerDesc: "पैटर्न और नीति मेट्रिक्स निकालने के लिए सार्वजनिक पत्र, जलवायु ब्रीफिंग, या हितधारक प्रतिक्रिया सर्वेक्षण अपलोड करें।",
    dragAndDrop: "नागरिक सर्वेक्षण या रिपोर्ट को यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें",
    supportsFiles: "5MB तक .txt, .json, .csv, .md और .pdf का समर्थन करता है",
    selectPreloaded: "या पूर्व-लोड की गई रणनीतिक कच्ची सर्वेक्षण चुनें:",
    pasteCustom: "सीधे कस्टम निवासी ईमेल या नागरिक लॉग पेस्ट करें...",
    analyzingThemes: "जेमिनी के साथ विषयों का विश्लेषण...",
    analyzeAndGenerate: "क्लिपबोर्ड का विश्लेषण करें और नीति रिपोर्ट उत्पन्न करें",
    analysisComplete: "विश्लेषण पूरा हुआ",
    responsibleAi: "जिम्मेदार और पारदर्शी एआई उपयोग",
    responsibleAiDesc: "हमारा निर्णय इंटेलिजेंस प्लेटफॉर्म कड़े जमीनी संदर्भों का उपयोग करता है। प्रत्येक मॉडल आउटपुट स्थानीयकृत नगरपालिका सीमाओं के साथ संचालित होता है।",
    explainableHeuristics: "व्याख्यात्मक अनुमान",
    explainableHeuristicsDesc: "गणना मानक क्षेत्रीय आधारभूत रेखाओं के आधार पर मान्य शहरी मॉडल का उपयोग करती है।",
    noPiLeaks: "कोई नागरिक व्यक्तिगत जानकारी का रिसाव नहीं",
    noPiLeaksDesc: "दस्तावेज़ मूल्यांकन गुमनामी सुनिश्चित करने के लिए व्यक्तिगत रूप से पहचान योग्य नाम और सड़क निर्देशांक को स्वचालित रूप से संशोधित करता है।",
    interactiveSynthesis: "इंटरैक्टिव मल्टी-चैनल संश्लेषण",
    interactiveSynthesisDesc: "नगरपालिका प्रतिक्रिया समय को गति देने के लिए परिचालन मेट्रिक्स मानचित्र ओवरले के साथ विश्लेषण किए गए सर्वेक्षणों को क्रॉस-रेफरेंस करें।"
  }
};

// Hindi translations for sector names and descriptions
export const SECTORS_TR: Record<Language, Record<string, { name: string; description: string; metrics: Record<string, string> }>> = {
  en: {
    mobility: {
      name: "Urban Mobility & Transit",
      description: "Tracks congestion hotspots, public transit utilization, traffic delays, and EV charging infrastructure development.",
      metrics: {
        "Avg Congestion Index": "Avg Congestion Index",
        "Commute Traffic Delays": "Commute Traffic Delays",
        "Bus On-Time Performance": "Bus On-Time Performance",
        "Active Smart EV Chargers": "Active Smart EV Chargers"
      }
    },
    environment: {
      name: "Climate & Smart Utilities",
      description: "Monitors carbon footprints, air quality index, solar energy generation, municipal solid waste diversion, and water grid leaks.",
      metrics: {
        "Air Quality Index (AQI)": "Air Quality Index (AQI)",
        "Solar Power Output": "Solar Power Output",
        "Waste Diversion Rate": "Waste Diversion Rate",
        "Water Infrastructure Leakage": "Water Infrastructure Leakage"
      }
    },
    safety: {
      name: "Safety & Disaster Readiness",
      description: "Analyzes emergency dispatch logs, incident heatmaps, community crime rates, and fire response preparedness.",
      metrics: {
        "911 Emergency Dispatch Delay": "911 Emergency Dispatch Delay",
        "Community Crime Index": "Community Crime Index",
        "Active Emergency Incidents": "Active Emergency Incidents",
        "Disaster Kit Readiness Ratio": "Disaster Kit Readiness Ratio"
      }
    },
    wellness: {
      name: "Healthcare & Wellness",
      description: "Measures neighborhood clinical wait times, senior citizen support programs, and local nutrition/wellness program access.",
      metrics: {
        "Local Clinic Wait Time": "Local Clinic Wait Time",
        "Senior Support Enrollment": "Senior Support Enrollment",
        "Wellness Reach Score": "Wellness Reach Score",
        "Chronic Disease Prevalence": "Chronic Disease Prevalence"
      }
    },
    feedback: {
      name: "Citizen Engagement & Surveys",
      description: "Interprets public feedback forums, community sentiment scorecards, and civic complaint response times.",
      metrics: {
        "Civic Sentiment Index": "Civic Sentiment Index",
        "Resolved Public Petitions": "Resolved Public Petitions",
        "Civic Feedback Submissions": "Civic Feedback Submissions",
        "Average Resolution Time": "Average Resolution Time"
      }
    }
  },
  hi: {
    mobility: {
      name: "शहरी गतिशीलता और पारगमन",
      description: "भीड़भाड़ वाले हॉटस्पॉट, सार्वजनिक पारगमन उपयोग, ट्रैफ़िक देरी और ईवी चार्जिंग बुनियादी ढांचे के विकास पर नज़र रखता है।",
      metrics: {
        "Avg Congestion Index": "औसत भीड़ सूचकांक",
        "Commute Traffic Delays": "यात्रा यातायात देरी",
        "Bus On-Time Performance": "बस ऑन-टाइम प्रदर्शन",
        "Active Smart EV Chargers": "सक्रिय स्मार्ट ईवी चार्जर"
      }
    },
    environment: {
      name: "जलवायु और स्मार्ट उपयोगिताएँ",
      description: "कार्बन फुटप्रिंट, वायु गुणवत्ता सूचकांक, सौर ऊर्जा उत्पादन, नगरपालिका ठोस अपशिष्ट और पानी के रिसाव की निगरानी करता है।",
      metrics: {
        "Air Quality Index (AQI)": "वायु गुणवत्ता सूचकांक (AQI)",
        "Solar Power Output": "सौर ऊर्जा उत्पादन",
        "Waste Diversion Rate": "अपशिष्ट डायवर्जन दर",
        "Water Infrastructure Leakage": "जल बुनियादी ढांचा रिसाव"
      }
    },
    safety: {
      name: "सुरक्षा और आपदा तत्परता",
      description: "आपातकालीन प्रेषण लॉग, घटना हॉटमैप, स्थानीय अपराध दर और अग्नि प्रतिक्रिया तैयारी का विश्लेषण करता है।",
      metrics: {
        "911 Emergency Dispatch Delay": "911 आपातकालीन प्रेषण देरी",
        "Community Crime Index": "सामुदायिक अपराध सूचकांक",
        "Active Emergency Incidents": "सक्रिय आपातकालीन घटनाएं",
        "Disaster Kit Readiness Ratio": "आपदा किट तैयारी अनुपात"
      }
    },
    wellness: {
      name: "स्वास्थ्य सेवा और कल्याण",
      description: "अस्पतालों में प्रतीक्षा समय, वरिष्ठ नागरिक सहायता कार्यक्रमों और कल्याण कार्यक्रम तक पहुँच को मापता है।",
      metrics: {
        "Local Clinic Wait Time": "स्थानीय क्लिनिक प्रतीक्षा समय",
        "Senior Support Enrollment": "वरिष्ठ सहायता नामांकन",
        "Wellness Reach Score": "कल्याण पहुंच स्कोर",
        "Chronic Disease Prevalence": "क्रोनिक बीमारी का प्रसार"
      }
    },
    feedback: {
      name: "नागरिक भागीदारी और सर्वेक्षण",
      description: "सार्वजनिक प्रतिक्रिया मंचों, सामुदायिक भावना स्कोरकार्ड और नागरिक शिकायत निवारण समय का विश्लेषण करता है।",
      metrics: {
        "Civic Sentiment Index": "नागरिक भावना सूचकांक",
        "Resolved Public Petitions": "हल की गई सार्वजनिक याचिकाएं",
        "Civic Feedback Submissions": "नागरिक प्रतिक्रिया सबमिशन",
        "Average Resolution Time": "औसत समाधान समय"
      }
    }
  }
};

export const ANOMALIES_TR: Record<Language, Record<string, { title: string; description: string; recommendation: string }>> = {
  en: {
    "anom-1": {
      title: "Downtown Transit Gridlock Detected",
      description: "Average traffic speeds near Market Street dropped by 42% during off-peak hours. Primary correlation: sudden construction bottleneck combined with signal synchronization failure.",
      recommendation: "Optimize signal duration on adjacent corridors; advise bus routes 14 & 21 to bypass with adaptive lanes."
    },
    "anom-2": {
      title: "Anomalous Spikes in PM2.5 Levels",
      description: "Air Quality Index near the industrial buffer zone momentarily peaked at 142. The wind speed was minimal, which indicates stagnant industrial emission dispersion.",
      recommendation: "Instruct district wardens to monitor particulate filters; send real-time warnings to surrounding school districts."
    },
    "anom-3": {
      title: "Primary Care Wait Times Surge",
      description: "Wait times at the Central Clinic surged past 50 minutes. Staff-to-patient ratio was lower due to regional wellness program reassignments.",
      recommendation: "Temporarily dispatch mobile medical units to offset patient volume; automate non-urgent check-in routines."
    }
  },
  hi: {
    "anom-1": {
      title: "डाउनटाउन क्षेत्र में भारी ट्रैफिक जाम",
      description: "मार्केट स्ट्रीट के पास औसत ट्रैफिक गति गैर-व्यस्त घंटों के दौरान 42% गिर गई। प्राथमिक सहसंबंध: अचानक निर्माण बाधा और सिग्नल सिंक्रनाइज़ेशन विफलता का संयोजन।",
      recommendation: "आस-पास के गलियारों पर सिग्नल की अवधि को अनुकूलित करें; बस मार्ग 14 और 21 को वैकल्पिक लेन से जाने की सलाह दें।"
    },
    "anom-2": {
      title: "पीएम2.5 (PM2.5) स्तरों में असामान्य वृद्धि",
      description: "औद्योगिक बफर जोन के पास वायु गुणवत्ता सूचकांक क्षण भर के लिए 142 पर पहुंच गया। हवा की गति न्यूनतम थी, जो औद्योगिक उत्सर्जन के जमाव का संकेत देती है।",
      recommendation: "संबंधित वार्डन को पार्टिकुलेट फिल्टर की निगरानी करने का निर्देश दें; आसपास के स्कूल जिलों को वास्तविक समय में चेतावनी भेजें।"
    },
    "anom-3": {
      title: "प्राथमिक चिकित्सालय में प्रतीक्षा समय बढ़ा",
      description: "सेंट्रल क्लिनिक में प्रतीक्षा समय 50 मिनट से अधिक हो गया। क्षेत्रीय कल्याण कार्यक्रमों में कर्मचारियों की तैनाती के कारण क्लिनिक में स्टाफ की कमी थी।",
      recommendation: "मरीज की संख्या को संतुलित करने के लिए अस्थायी रूप से मोबाइल चिकित्सा इकाइयों को भेजें; गैर-आपातकालीन चेक-इन प्रक्रियाओं को स्वचालित करें।"
    }
  }
};

export const SUGGESTIONS_TR: Record<Language, Record<string, string[]>> = {
  en: {
    mobility: [
      "What interventions can resolve the downtown corridor congestion delay?",
      "How does a 15% increase in transit funding affect commute times?",
      "Give me an action plan to optimize EV charging station density."
    ],
    environment: [
      "How can we mitigate the recent stagnant air quality spike near industrial buffers?",
      "What is our strategy for hitting a 50% waste diversion rate?",
      "Provide a water leakage reduction plan based on our current sensor data."
    ],
    safety: [
      "How can we reduce the 911 dispatch delay below 5 minutes?",
      "Provide an emergency resource plan for fire readiness and disaster kits.",
      "Draft a community-led safety initiative to combat crime index trends."
    ],
    wellness: [
      "How do we address clinic wait times and optimize senior support outreach?",
      "Outline a preventive health program for low-enrollment districts.",
      "Recommend clinic staff allocation policies for peak emergency periods."
    ],
    feedback: [
      "Summarize recent public sentiment trends and propose resolution methods.",
      "How can we speed up civic complaint resolutions from 4 days to 24 hours?",
      "Analyze common triggers for feedback spikes in District 7."
    ]
  },
  hi: {
    mobility: [
      "डाउनटाउन कॉरिडोर में ट्रैफिक जाम को कैसे हल किया जा सकता है?",
      "पारगमन बजट में 15% की वृद्धि से यात्रा के समय पर क्या प्रभाव पड़ेगा?",
      "ईवी चार्जिंग स्टेशनों की संख्या को अनुकूलित करने के लिए एक कार्य योजना प्रदान करें।"
    ],
    environment: [
      "औद्योगिक बफर क्षेत्रों के पास अचानक बढ़े वायु प्रदूषण को कैसे कम किया जा सकता है?",
      "कचरा डायवर्जन दर को 50% तक पहुंचाने की हमारी क्या रणनीति है?",
      "सेंसर डेटा के आधार पर पानी के रिसाव को कम करने की योजना प्रदान करें।"
    ],
    safety: [
      "हम 911 आपातकालीन प्रतिक्रिया समय को 5 मिनट से कम कैसे कर सकते हैं?",
      "अग्नि सुरक्षा और आपदा किट तैयारियों के लिए एक आपातकालीन संसाधन योजना प्रदान करें।",
      "अपराध सूचकांक रुझानों से निपटने के लिए एक नागरिक सुरक्षा पहल का मसौदा तैयार करें।"
    ],
    wellness: [
      "हम क्लिनिक प्रतीक्षा समय को कैसे कम करें और वरिष्ठ सहायता कार्यक्रमों को कैसे अनुकूलित करें?",
      "कम नामांकन वाले जिलों के लिए एक निवारक स्वास्थ्य कार्यक्रम की रूपरेखा तैयार करें।",
      "अत्यधिक भीड़भाड़ के समय के लिए क्लिनिक कर्मचारियों के आवंटन की सिफारिश करें।"
    ],
    feedback: [
      "हाल ही में नागरिक प्रतिक्रिया रुझानों का सारांश दें और समाधान विधियों का प्रस्ताव करें।",
      "हम नागरिक शिकायतों के समाधान समय को 4 दिनों से घटाकर 24 घंटे कैसे कर सकते हैं?",
      "जिला ७ में शिकायतें बढ़ने के सामान्य कारणों का विश्लेषण करें।"
    ]
  }
};
