export type SectorId = 'mobility' | 'environment' | 'safety' | 'wellness' | 'feedback';

export interface Sector {
  id: SectorId;
  name: string;
  description: string;
  iconName: string;
  metrics: {
    label: string;
    value: string | number;
    change: number; // percentage change, e.g., -5 or +12
    trend: 'up' | 'down' | 'stable';
    unit?: string;
  }[];
}

export interface MetricHistoryPoint {
  time: string;
  mobilityCongestion: number;
  environmentAQI: number;
  safetyResponseTime: number; // minutes
  wellnessCapacity: number; // percentage
  feedbackSatisfaction: number; // percentage
}

export interface SimulationParameters {
  transitFunding: number; // 0 to 100
  greenInfrastructure: number; // 0 to 100
  emergencyServices: number; // 0 to 100
  healthWellnessAlloc: number; // 0 to 100
  citizenEngagement: number; // 0 to 100
}

export interface SimulatedImpact {
  parameters: SimulationParameters;
  metrics: {
    avgCommuteTime: number; // minutes
    airQualityIndex: number; // AQI
    crimeRateIndex: number; // out of 100
    seniorServicesReach: number; // %
    publicTrustRating: number; // %
  };
  aiRecommendation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}
