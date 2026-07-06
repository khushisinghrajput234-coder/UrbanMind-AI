import { Sector, MetricHistoryPoint } from './types.js';

export const sectorsData: Sector[] = [
  {
    id: 'mobility',
    name: 'Urban Mobility & Transit',
    description: 'Tracks congestion hotspots, public transit utilization, traffic delays, and EV charging infrastructure development.',
    iconName: 'Bus',
    metrics: [
      { label: 'Avg Congestion Index', value: 64, change: 4, trend: 'up', unit: '%' },
      { label: 'Commute Traffic Delays', value: 18.2, change: 8.5, trend: 'up', unit: 'mins' },
      { label: 'Bus On-Time Performance', value: 79.4, change: -2.1, trend: 'down', unit: '%' },
      { label: 'Active Smart EV Chargers', value: 142, change: 12.6, trend: 'up', unit: 'units' }
    ]
  },
  {
    id: 'environment',
    name: 'Climate & Smart Utilities',
    description: 'Monitors carbon footprints, air quality index, solar energy generation, municipal solid waste diversion, and water grid leaks.',
    iconName: 'Leaf',
    metrics: [
      { label: 'Air Quality Index (AQI)', value: 84, change: -12.5, trend: 'down', unit: 'index' }, // lower is better
      { label: 'Solar Power Output', value: 18.5, change: 5.2, trend: 'up', unit: 'MW' },
      { label: 'Waste Diversion Rate', value: 42.1, change: 1.8, trend: 'up', unit: '%' },
      { label: 'Water Infrastructure Leakage', value: 11.2, change: -4.5, trend: 'down', unit: '%' }
    ]
  },
  {
    id: 'safety',
    name: 'Safety & Disaster Readiness',
    description: 'Analyzes emergency dispatch logs, incident heatmaps, community crime rates, and fire response preparedness.',
    iconName: 'ShieldAlert',
    metrics: [
      { label: '911 Emergency Dispatch Delay', value: 6.8, change: -5.5, trend: 'down', unit: 'mins' },
      { label: 'Community Crime Index', value: 41.2, change: -3.1, trend: 'down', unit: 'index' },
      { label: 'Active Emergency Incidents', value: 12, change: 0, trend: 'stable', unit: 'cases' },
      { label: 'Disaster Kit Readiness Ratio', value: 68.4, change: 8.1, trend: 'up', unit: '%' }
    ]
  },
  {
    id: 'wellness',
    name: 'Healthcare & Wellness',
    description: 'Measures neighborhood clinical wait times, senior citizen support programs, and local nutrition/wellness program access.',
    iconName: 'HeartPulse',
    metrics: [
      { label: 'Local Clinic Wait Time', value: 34.5, change: 12.3, trend: 'up', unit: 'mins' },
      { label: 'Senior Support Enrollment', value: 1450, change: 9.2, trend: 'up', unit: 'people' },
      { label: 'Wellness Reach Score', value: 65.8, change: 2.4, trend: 'up', unit: '%' },
      { label: 'Chronic Disease Prevalence', value: 14.2, change: -0.8, trend: 'down', unit: '%' }
    ]
  },
  {
    id: 'feedback',
    name: 'Citizen Engagement & Surveys',
    description: 'Interprets public feedback forums, community sentiment scorecards, and civic complaint response times.',
    iconName: 'MessageSquareText',
    metrics: [
      { label: 'Civic Sentiment Index', value: 72.5, change: 3.5, trend: 'up', unit: '%' },
      { label: 'Resolved Public Petitions', value: 88.2, change: 1.5, trend: 'up', unit: '%' },
      { label: 'Civic Feedback Submissions', value: 342, change: 18.2, trend: 'up', unit: 'monthly' },
      { label: 'Average Resolution Time', value: 4.2, change: -15.4, trend: 'down', unit: 'days' }
    ]
  }
];

export const historyData: MetricHistoryPoint[] = [
  { time: 'Jan', mobilityCongestion: 55, environmentAQI: 95, safetyResponseTime: 8.1, wellnessCapacity: 58, feedbackSatisfaction: 68 },
  { time: 'Feb', mobilityCongestion: 58, environmentAQI: 92, safetyResponseTime: 7.9, wellnessCapacity: 60, feedbackSatisfaction: 69 },
  { time: 'Mar', mobilityCongestion: 62, environmentAQI: 89, safetyResponseTime: 7.5, wellnessCapacity: 62, feedbackSatisfaction: 71 },
  { time: 'Apr', mobilityCongestion: 65, environmentAQI: 88, safetyResponseTime: 7.1, wellnessCapacity: 64, feedbackSatisfaction: 70 },
  { time: 'May', mobilityCongestion: 63, environmentAQI: 85, safetyResponseTime: 6.9, wellnessCapacity: 65, feedbackSatisfaction: 72 },
  { time: 'Jun', mobilityCongestion: 64, environmentAQI: 84, safetyResponseTime: 6.8, wellnessCapacity: 65.8, feedbackSatisfaction: 72.5 }
];

export const anomalyReports = [
  {
    id: 'anom-1',
    sector: 'mobility',
    title: 'Downtown Transit Gridlock Detected',
    time: '2 hours ago',
    severity: 'high',
    description: 'Average traffic speeds near Market Street dropped by 42% during off-peak hours. Primary correlation: sudden construction bottleneck combined with signal synchronization failure.',
    recommendation: 'Optimize signal duration on adjacent corridors; advise bus routes 14 & 21 to bypass with adaptive lanes.'
  },
  {
    id: 'anom-2',
    sector: 'environment',
    title: 'Anomalous Spikes in PM2.5 Levels',
    time: 'Today, 08:30 AM',
    severity: 'medium',
    description: 'Air Quality Index near the industrial buffer zone momentarily peaked at 142. The wind speed was minimal, which indicates stagnant industrial emission dispersion.',
    recommendation: 'Instruct district wardens to monitor particulate filters; send real-time warnings to surrounding school districts.'
  },
  {
    id: 'anom-3',
    sector: 'wellness',
    title: 'Primary Care Wait Times Surge',
    time: 'Yesterday',
    severity: 'medium',
    description: 'Wait times at the Central Clinic surged past 50 minutes. Staff-to-patient ratio was lower due to regional wellness program reassignments.',
    recommendation: 'Temporarily dispatch mobile medical units to offset patient volume; automate non-urgent check-in routines.'
  }
];
