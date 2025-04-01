
export interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  profileImage: string;
  riskScore: number; // 0-100
  injuryHistory: Injury[];
  trainingLoad: {
    current: number; // arbitrary units
    optimal: number; // arbitrary units
  };
  fatigueLevel: number; // 0-100
  recoveryStatus: number; // 0-100
}

export interface Injury {
  id: number;
  type: string;
  location: string;
  severity: 'Minor' | 'Moderate' | 'Severe';
  date: string;
  recoveryTimeInDays: number;
  recurrence: boolean;
}

export const players: Player[] = [
  {
    id: 1,
    name: 'Marcus Johnson',
    position: 'Forward',
    age: 27,
    height: 183,
    weight: 76,
    profileImage: '/placeholder.svg',
    riskScore: 78,
    injuryHistory: [
      {
        id: 1,
        type: 'Hamstring Strain',
        location: 'Left Leg',
        severity: 'Moderate',
        date: '2023-09-15',
        recoveryTimeInDays: 28,
        recurrence: true
      },
      {
        id: 2,
        type: 'Ankle Sprain',
        location: 'Right Ankle',
        severity: 'Minor',
        date: '2023-05-02',
        recoveryTimeInDays: 14,
        recurrence: false
      }
    ],
    trainingLoad: {
      current: 850,
      optimal: 700
    },
    fatigueLevel: 65,
    recoveryStatus: 40
  },
  {
    id: 2,
    name: 'David Reynolds',
    position: 'Midfielder',
    age: 24,
    height: 175,
    weight: 70,
    profileImage: '/placeholder.svg',
    riskScore: 45,
    injuryHistory: [
      {
        id: 3,
        type: 'Knee Contusion',
        location: 'Left Knee',
        severity: 'Minor',
        date: '2023-08-10',
        recoveryTimeInDays: 7,
        recurrence: false
      }
    ],
    trainingLoad: {
      current: 620,
      optimal: 650
    },
    fatigueLevel: 40,
    recoveryStatus: 75
  },
  {
    id: 3,
    name: 'James Wilson',
    position: 'Defender',
    age: 29,
    height: 188,
    weight: 84,
    profileImage: '/placeholder.svg',
    riskScore: 28,
    injuryHistory: [],
    trainingLoad: {
      current: 580,
      optimal: 600
    },
    fatigueLevel: 30,
    recoveryStatus: 85
  },
  {
    id: 4,
    name: 'Thomas Miller',
    position: 'Goalkeeper',
    age: 31,
    height: 192,
    weight: 90,
    profileImage: '/placeholder.svg',
    riskScore: 15,
    injuryHistory: [
      {
        id: 4,
        type: 'Shoulder Dislocation',
        location: 'Right Shoulder',
        severity: 'Severe',
        date: '2022-11-20',
        recoveryTimeInDays: 60,
        recurrence: false
      }
    ],
    trainingLoad: {
      current: 420,
      optimal: 450
    },
    fatigueLevel: 25,
    recoveryStatus: 90
  }
];

export const getRiskLevel = (score: number): 'High' | 'Medium' | 'Low' => {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
};

export const getPreventionTips = (player: Player): string[] => {
  const tips: string[] = [];
  
  // Training load recommendations
  if (player.trainingLoad.current > player.trainingLoad.optimal * 1.2) {
    tips.push('Reduce training intensity by 20-30% for the next 5-7 days');
    tips.push('Increase focus on recovery protocols including cold therapy and compression');
  }
  
  // Fatigue-based recommendations
  if (player.fatigueLevel > 60) {
    tips.push('Schedule additional rest day within next 48 hours');
    tips.push('Monitor sleep quality and aim for 8-9 hours during high fatigue periods');
  }
  
  // Recovery-based recommendations
  if (player.recoveryStatus < 50) {
    tips.push('Implement active recovery sessions instead of high-intensity training');
    tips.push('Consider limiting minutes in upcoming matches');
  }
  
  // Injury history recommendations
  if (player.injuryHistory.some(injury => injury.recurrence)) {
    tips.push('Focus on specific strengthening exercises for previously injured areas');
    tips.push('Schedule biomechanical assessment to identify movement patterns that may lead to recurrence');
  }
  
  // General recommendations
  tips.push('Maintain proper hydration (minimum 3L daily)');
  tips.push('Ensure sufficient protein intake (1.6-1.8g per kg of body weight)');
  
  return tips;
};
