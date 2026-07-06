import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { sectorsData, historyData, anomalyReports } from "./src/data.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini client with standard user-agent for AI Studio telemetry
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini Client initialized successfully on the server.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined. The server will run in high-fidelity sandbox simulation mode.");
}

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

// 1. Get Sector Data, Historical Logs, and Active Anomalies
app.get("/api/sectors", (req, res) => {
  res.json({
    sectors: sectorsData,
    history: historyData,
    anomalies: anomalyReports
  });
});

// 2. Chat with City AI Advisor (Natural Language Queries with Grounding Context)
app.post("/api/query", async (req, res) => {
  const { messages, sectorId, lang } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages payload." });
  }

  const isHindi = lang === "hi";
  const latestMessage = messages[messages.length - 1]?.text || "";
  
  // Create rich context prompt to ground Gemini with city metrics & active anomalies
  const currentSectorsContext = sectorsData.map(s => {
    const metricsStr = s.metrics.map(m => `  - ${m.label}: ${m.value}${m.unit || ''} (Trend: ${m.trend}, Change: ${m.change}%)`).join("\n");
    return `Sector: ${s.name} (${s.id})\nDescription: ${s.description}\nMetrics:\n${metricsStr}`;
  }).join("\n\n");

  const activeAnomaliesContext = anomalyReports.map(a => 
    `- Severity: ${a.severity.toUpperCase()} in Sector ${a.sector}: "${a.title}" - ${a.description}. Suggested action: ${a.recommendation}`
  ).join("\n");

  let systemPrompt = `You are the City Decision Intelligence Advisor, an elite AI expert in urban planning, public administration, environmental sustainability, emergency preparedness, and civic wellness.
You assist city planners, organization leaders, and community members in making high-impact decisions backed by data.

Here is the current operational dataset of our community:
=========================================
${currentSectorsContext}
=========================================

Active Anomalies and Alerts:
=========================================
${activeAnomaliesContext}
=========================================

Instructions:
1. Provide extremely practical, professional, action-oriented responses.
2. Directly refer to the metrics, trends, or anomalies provided above where relevant.
3. Suggest specific interventions, policy recommendations, or community support plans.
4. Keep the tone executive, supportive, and objective. Use scannable markdown headings, bullet points, and highlight bold trade-offs.
5. If the user mentions uploading data or documents, suggest they use the Drag & Drop Analyzer on the right panel.`;

  if (isHindi) {
    systemPrompt += `\n\nCRITICAL MANDATE: Since the user has requested Hindi language support (lang=hi), you MUST formulate your entire response in clear, professional, modern Hindi (हिन्दी). You can keep technical terms or metric names in English or transliterated as appropriate, but the explanations, headers, and bullet points MUST be written in Hindi so that Hindi-speaking planners can easily understand the solution.`;
  }

  // Fallback response if Gemini is not initialized or fails
  const fallbackResponse = isHindi
    ? `### 🌟 सिटी एडवाइजर सैंडबॉक्स अंतर्दृष्टि (एपीआई कुंजी कॉन्फ़िगर नहीं है)

आपके प्रश्न *"${latestMessage}"* के संबंध में धन्यवाद।

चूंकि आपके कार्यक्षेत्र रहस्यों में **GEMINI_API_KEY** का पता नहीं चला है, इसलिए मैं हमारे पूर्व-संकलित विशेषज्ञ अनुमानी नियमों का उपयोग करके यह सलाहकार अंतर्दृष्टि उत्पन्न कर रहा हूँ:

#### 📋 चयनित विषय के लिए रणनीतिक अंतर्दृष्टि
*   **बुनियादी ढांचा तालमेल**: परिवहन आवंटन को पर्यावरण हरित बेल्ट के साथ संतुलित करना एक प्राथमिक लक्ष्य बना हुआ है। हमारा सक्रिय **ट्रैफ़िक भीड़ सूचकांक ${sectorsData[0].metrics[0].value}%** पर है, जो चरम घंटों की बाधाओं का सुझाव देता है जिन्हें स्थानीयकृत स्मार्ट रूटिंग के माध्यम से कम किया जा सकता है।
*   **सक्रिय अलर्ट प्राथमिकताएं**: वर्तमान में डाउनटाउन कॉरिडोर में एक **${anomalyReports[0].title}** है। प्रमुख व्यस्त घंटों से पहले सिग्नल टाइमिंग अपडेट के माध्यम से इसे जल्दी से हल करने की सिफारिश की जाती है।
*   **सार्वजनिक सुरक्षा**: हमारी **911 आपातकालीन प्रेषण देरी ${sectorsData[2].metrics[0].value} मिनट** लगातार घट रही है। आपातकालीन संसाधनों पर निरंतर ध्यान देने से जनता का विश्वास और बढ़ेगा।

*गूगल जेमिनी के साथ लाइव, वास्तविक समय अनुकूलित एआई उत्तरों को सक्रिय करने के लिए, कृपया एआई स्टूडियो के **Settings > Secrets** पैनल में एक मान्य **GEMINI_API_KEY** जोड़ें।*`
    : `### 🌟 City Advisor Sandbox Insights (API Key Not Configured)

Thank you for your inquiry regarding *"${latestMessage}"*. 

Because a **GEMINI_API_KEY** was not detected in your workspace secrets, I am generating this advisory insight using our pre-compiled expert heuristic rules:

#### 📋 Strategic Insights for the Selected Topic
*   **Infrastructure Synergy**: Balancing transportation allocations with environmental green belts remains a primary target. Our active **Traffic Congestion Index is at ${sectorsData[0].metrics[0].value}%**, which suggests peak-hour bottlenecks that can be relieved via localized smart routing.
*   **Active Alert Priorities**: There is currently a **${anomalyReports[0].title}** in the downtown corridor. Resolving this quickly through signal timing updates is recommended before major peak hours.
*   **Public Safety**: Our **Dispatch delay of ${sectorsData[2].metrics[0].value} minutes** is steadily decreasing. Continued focus on emergency resources will yield even higher public confidence.

*To activate live, real-time customized AI answers with Google Gemini, please add a valid **GEMINI_API_KEY** in the **Settings > Secrets** panel of AI Studio.*`;

  if (!ai) {
    return res.json({ text: fallbackResponse });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: `System context: ${systemPrompt}\n\nUser request: ${latestMessage}` }] }
      ],
      config: {
        systemInstruction: isHindi 
          ? "You are the City Decision Intelligence Advisor. Answer professionally in Hindi (हिन्दी) using the operational datasets supplied by the planner."
          : "You are the City Decision Intelligence Advisor. Answer professionally using the operational datasets supplied by the planner.",
        temperature: 0.7,
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini query error:", error);
    return res.json({
      text: isHindi
        ? `### ⚠️ जेमिनी सेवा सूचना\n\nलाइव जेमिनी मॉडल (${error.message || 'connection failed'}) के साथ आपके अनुरोध को संसाधित करने में समस्या आई थी।\n\n**अस्थायी बैकअप रिपोर्ट:**\n\n${fallbackResponse}`
        : `### ⚠️ Gemini Service Notice\n\nThere was an issue processing your request with the live Gemini model (${error.message || 'connection failed'}).\n\n**Temporary Fallback Report:**\n\n${fallbackResponse}`
    });
  }
});

// 3. Document / Citizen Feedback Raw File Analyzer
app.post("/api/analyze-file", async (req, res) => {
  const { fileName, fileContent, fileType, lang } = req.body;
  if (!fileContent) {
    return res.status(400).json({ error: "Empty content provided for analysis." });
  }

  const isHindi = lang === 'hi';

  let systemPrompt = `You are the City Data & Document Intelligence Analyzer.
Analyze the following citizen survey, environmental report, transit log, or feedback text provided by a user.
Detect:
1. Principal thematic topics and concerns.
2. Anomaly indicators or operational red flags.
3. Overall sentiment (Positive, Neutral, Negative, or Volatile) with a justification.
4. Actionable policy or operational recommendations.

Format your output in beautifully clean, executive-ready Markdown with professional dividers and structured sub-headings.`;

  if (isHindi) {
    systemPrompt += `\n\nCRITICAL MANDATE: Since the user has requested Hindi language support (lang=hi), you MUST formulate your entire analysis report in clear, professional, modern Hindi (हिन्दी). The headings, summaries, and bullet points MUST be written in Hindi so that Hindi-speaking planners can easily understand.`;
  }

  const fallbackResponse = isHindi
    ? `### 📂 सैंडबॉक्स दस्तावेज़ विश्लेषण रिपोर्ट
**विश्लेषण की गई फ़ाइल**: \`${fileName || 'Uploaded_Document.txt'}\` (${fileType || 'Text'})

*नोट: लाइव गूगल जेमिनी विश्लेषण अनुपलब्ध है क्योंकि **GEMINI_API_KEY** कॉन्फ़िगर नहीं है। यहाँ एक स्थानीयकृत, मॉक-गाइडेड पार्सर सारांश दिया गया है:*

#### 🎯 प्राथमिक निष्कर्ष
*   **मूल विषय का पता चला**: सामुदायिक प्रतिक्रिया, उपयोगिता प्रबंधन, या स्थानीय कल्याण।
*   **भावना मेट्रिक्स**: शब्दावली प्रवृत्तियों के आधार पर आम तौर पर **मध्यम से तत्काल**।
*   **लाल झंडे (चेतावनी) मिले**: नगरपालिका की देरी, बुनियादी ढांचे के घर्षण, या आपातकालीन प्रतिक्रिया मापदंडों का उल्लेख।

#### 🛠️ परिचालन सिफारिशें
1.  **तत्काल प्रतिक्रिया**: सीधी शिकायतों का समाधान करने के लिए एक सामुदायिक जुड़ाव प्रमुख को तैनात करें।
2.  **रणनीतिक संरेखण**: प्रणालीगत देरी को दूर करने के लिए इन नागरिक इनपुट को हमारे सक्रिय **शहरी गतिशीलता मेट्रिक्स** के साथ सह-संबंधित करें।
3.  **भविष्य का शमन**: निवासियों को प्रगति की जानकारी देने के लिए स्वचालित एसएमएस/ईमेल फॉलो-अप को एकीकृत करें।

*जेमिनी-3.5-फ्लैश का उपयोग करके लाइव गहन विश्लेषण अनलॉक करने के लिए, **Settings > Secrets** पैनल में अपनी **GEMINI_API_KEY** कॉन्फ़िगर करें।*`
    : `### 📂 Sandbox Document Analysis Report
**Analyzed File**: \`${fileName || 'Uploaded_Document.txt'}\` (${fileType || 'Text'})

*Note: Live Google Gemini analysis is unavailable because a **GEMINI_API_KEY** is not configured. Here is a localized, mock-guided parser summary:*

#### 🎯 Primary Findings
*   **Core Theme Detected**: Community Feedback, Utility Management, or Local Welfare.
*   **Sentiment Metrics**: Generally **Moderate to Urgent** based on vocabulary trends.
*   **Red Flags Detected**: Mentions of municipal delays, infrastructure friction, or emergency response parameters.

#### 🛠️ Operational Recommendations
1.  **Immediate Response**: Mobilize a community engagement lead to follow up on direct complaints.
2.  **Strategic Alignment**: Correlate these citizen inputs with our active **Urban Mobility metrics** to address systemic delays.
3.  **Future Mitigation**: Integrate automated SMS/email follow-ups to inform residents of progress.

*To unlock live deep-learning document analysis using Gemini-3.5-flash, configure your **GEMINI_API_KEY** in the **Settings > Secrets** panel.*`;

  if (!ai) {
    return res.json({ text: fallbackResponse });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Document Content:\n"""\n${fileContent}\n"""\n\nFilename: ${fileName || 'Unnamed Document'}\nFile type: ${fileType || 'Unspecified'}\n\nPerform full thematic analysis and list anomalies and proposed resolutions.`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4,
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("File analysis error:", error);
    return res.json({
      text: isHindi
        ? `### ⚠️ फ़ाइल विश्लेषक सेवा अलर्ट\n\nलाइव जेमिनी के साथ संसाधित नहीं किया जा सका: ${error.message || 'आंतरिक कनेक्शन समस्या'}.\n\n**मॉक विश्लेषण आउटपुट:**\n\n${fallbackResponse}`
        : `### ⚠️ File Analyzer Service Alert\n\nCould not process with live Gemini: ${error.message || 'Internal connection issue'}.\n\n**Mock Analysis Output:**\n\n${fallbackResponse}`
    });
  }
});

// 4. Scenario Simulation Engine with Predictive AI Impact Brief
app.post("/api/simulate", async (req, res) => {
  const { transitFunding, greenInfrastructure, emergencyServices, healthWellnessAlloc, citizenEngagement, lang } = req.body;

  const isHindi = lang === 'hi';

  // Compute simulated mathematical impact metrics based on slider parameters
  const avgCommuteTime = Math.max(12, Math.round(35 - (transitFunding * 0.18) - (greenInfrastructure * 0.04)));
  const airQualityIndex = Math.max(20, Math.round(110 - (greenInfrastructure * 0.75) - (transitFunding * 0.2)));
  const crimeRateIndex = Math.max(10, Math.round(65 - (emergencyServices * 0.42) - (citizenEngagement * 0.08)));
  const seniorServicesReach = Math.max(25, Math.min(100, Math.round(40 + (healthWellnessAlloc * 0.52) + (citizenEngagement * 0.12))));
  const publicTrustRating = Math.max(30, Math.min(99, Math.round(45 + (citizenEngagement * 0.38) + (transitFunding * 0.06) + (greenInfrastructure * 0.12))));

  const metrics = {
    avgCommuteTime,
    airQualityIndex,
    crimeRateIndex,
    seniorServicesReach,
    publicTrustRating
  };

  let systemPrompt = `You are a Smart City Prediction Simulator and Strategy Generator.
Given a set of municipal policy allocation sliders (0-100) and the predicted quantitative outcomes, write a highly descriptive, professional **Predictive Urban Impact Brief**.

Your brief must include:
1. **Scenario Assessment**: A 2-sentence description of the chosen strategy (e.g., "Eco-centric transit focus", "Community-led wellness initiative", etc.).
2. **Projected Breakthroughs**: What major goals will be met with these parameters.
3. **Budgetary & Social Trade-offs**: What might be neglected (e.g. if wellness allocation is high but safety is low, highlight the crime-response risk). Mention potential community friction points.
4. **Actionable Implementation Steps**: Practical first milestones for the city administration.

Please keep it formatted with clean Markdown headings and professional list blocks. Do not invent any system variables.`;

  if (isHindi) {
    systemPrompt += `\n\nCRITICAL MANDATE: Since the user has requested Hindi language support (lang=hi), you MUST formulate your entire Predictive Urban Impact Brief in clear, professional, modern Hindi (हिन्दी). The headings, descriptions, and bullet points MUST be written in Hindi so that Hindi-speaking planners can easily understand.`;
  }

  const parametersString = `
Policy Allocations (0-100 scale):
- Transit & Public Mobility Funding: ${transitFunding}%
- Green Infrastructure & Renewable Conversion: ${greenInfrastructure}%
- Emergency Dispatch & Public Safety Services: ${emergencyServices}%
- Healthcare Allocation & Community Wellness: ${healthWellnessAlloc}%
- Citizen Surveys & Civic Engagement: ${citizenEngagement}%

Mathematical Projected Outcomes:
- Average Commute Delay: ${avgCommuteTime} minutes (Baseline: 35m)
- Air Quality Index (AQI): ${airQualityIndex} (Baseline: 110, lower is better)
- Community Crime Index: ${crimeRateIndex} (Baseline: 65, lower is better)
- Senior Citizen Care Reach: ${seniorServicesReach}% (Baseline: 40%)
- Overall Civic Trust Index: ${publicTrustRating}% (Baseline: 45%)
`;

  const fallbackBrief = isHindi
    ? `### 📈 स्थानीय अनुमानी सिमुलेशन रिपोर्ट
यह परिदृश्य आपके कस्टमाइज़्ड बजट आवंटन के आधार पर स्थानीय गणितीय नियमों का उपयोग करके परिणामों का अनुमान लगाता है:

#### 1. परिदृश्य मूल्यांकन
आपके मापदंडों (परिवहन: **${transitFunding}%**, हरित: **${greenInfrastructure}%**, सुरक्षा: **${emergencyServices}%**, स्वास्थ्य सेवा: **${healthWellnessAlloc}%**, जन-भागीदारी: **${citizenEngagement}%**) के आधार पर, यह परिदृश्य एक **संतुलित सामुदायिक विकास रणनीति** का प्रतिनिधित्व करता है।

#### 2. मुख्य मील के पत्थर और सफलताएं
*   **पारगमन प्रभाव**: औसत आवागमन देरी को घटाकर **${avgCommuteTime} मिनट** कर दिया गया है (35 मिनट की आधारभूत रेखा से)।
*   **जलवायु सूचकांक**: वायु गुणवत्ता सूचकांक **${airQualityIndex}** दर्ज हुआ है, जो पर्यावरण नीतियों के प्रभाव को दर्शाता है।
*   **नागरिक विश्वास**: सक्रिय सामुदायिक प्रतिक्रिया चैनलों के परिणामस्वरूप निवासियों का विश्वास **${publicTrustRating}%** तक पहुंच गया है।

#### 3. रणनीतिक ट्रेड-ऑफ जिस पर ध्यान देना आवश्यक है
*   **पूंजी विस्थापन**: कई मोर्चों पर उच्च आवंटन सामान्य नगरपालिका निधि को प्रभावित कर सकता है।
*   **प्राथमिकता घर्षण**: सुनिश्चित करें कि यदि स्वास्थ्य सेवा या जन-भागीदारी आवंटन को बड़ी प्राथमिकता दी जा रही है, तो सुरक्षा विभाग कम-समर्थित न रह जाएं।

*जेमिनी से पूर्ण जनरेटिव पूर्वानुमान और विस्तृत ट्रेड-ऑफ रिपोर्ट प्राप्त करने के लिए, कृपया अपनी **GEMINI_API_KEY** को कॉन्फ़िगर करें।*`
    : `### 📈 Local Heuristic Simulation Brief
This scenario predicts outcomes using local mathematical rules based on your customized funding allocations:

#### 1. Scenario Assessment
Based on your parameters (Transit: **${transitFunding}%**, Green: **${greenInfrastructure}%**, Safety: **${emergencyServices}%**, Healthcare: **${healthWellnessAlloc}%**, Engagement: **${citizenEngagement}%**), this scenario represents a **Balanced Community Development Strategy**.

#### 2. Key Milestones & Breakthroughs
*   **Mobility Impact**: Average commute delays are cut to **${avgCommuteTime} minutes** (from 35 minutes baseline).
*   **Climate Index**: Air Quality Index registers at **${airQualityIndex}**, demonstrating the effect of environmental policies.
*   **Civic Trust**: Resident trust reaches **${publicTrustRating}%** as a result of active community feedback channels.

#### 3. Strategic Trade-offs to Monitor
*   **Capital Displacement**: High allocations across multiple fronts will strain standard general fund reserves.
*   **Focus Friction**: Ensure that safety departments are not under-supported if wellness or engagement allocations take large priority shares.

*To obtain full generative forecasting and detailed trade-off intelligence reports from Gemini, please configure your **GEMINI_API_KEY**.*`;

  if (!ai) {
    return res.json({
      metrics,
      aiRecommendation: fallbackBrief
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Simulation Variables and Baseline Predictions:\n${parametersString}\n\nCompose a professional, high-fidelity Executive Predictive Brief based on these variables.`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.6,
      }
    });

    return res.json({
      metrics,
      aiRecommendation: response.text
    });
  } catch (error: any) {
    console.error("Simulation generation error:", error);
    return res.json({
      metrics,
      aiRecommendation: isHindi
        ? `### ⚠️ भविष्य कहनेवाला संक्षिप्त सेवा चेतावनी\n\nजेनेरिक पूर्वानुमान के लिए जेमिनी तक पहुँचने में असमर्थ: ${error.message || 'सेवा अनुपलब्ध'}.\n\n**सिम्युलेटेड स्थानीय मॉडल आउटपुट:**\n\n${fallbackBrief}`
        : `### ⚠️ Predictive Brief Service Warning\n\nUnable to reach Gemini for generative forecasting: ${error.message || 'Service unreachable'}.\n\n**Simulated Local Model Output:**\n\n${fallbackBrief}`
    });
  }
});

// -------------------------------------------------------------
// VITE OR STATIC SERVING MIDDLEWARE
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode: Integrate Vite as a middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // Production mode: serve built assets from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files from /dist in production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Decision Intelligence Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
