
import React from 'react';
import { Player, getRiskLevel } from '../data/players';
import { AlertCircle, Activity, Clipboard, LineChart, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RiskAssessmentProps {
  player: Player;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ player }) => {
  const riskLevel = getRiskLevel(player.riskScore);
  
  const riskFactors = [
    {
      name: 'Training Load',
      value: (player.trainingLoad.current / player.trainingLoad.optimal) * 100,
      icon: <Activity className="h-4 w-4" />,
      detail: `${player.trainingLoad.current} / ${player.trainingLoad.optimal} optimal units`
    },
    {
      name: 'Fatigue Level',
      value: player.fatigueLevel,
      icon: <Zap className="h-4 w-4" />,
      detail: `${player.fatigueLevel}% - ${player.fatigueLevel > 60 ? 'Above threshold' : 'Within normal range'}`
    },
    {
      name: 'Recovery Status',
      value: player.recoveryStatus,
      icon: <LineChart className="h-4 w-4" />,
      detail: `${player.recoveryStatus}% recovered`
    },
    {
      name: 'Injury History',
      value: Math.min(player.injuryHistory.length * 25, 100),
      icon: <Clipboard className="h-4 w-4" />,
      detail: `${player.injuryHistory.length} previous injuries`
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-risk-high" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Risk Score</span>
              <span className={`font-semibold ${
                riskLevel === 'High' ? 'text-risk-high' : 
                riskLevel === 'Medium' ? 'text-risk-medium' : 'text-risk-low'
              }`}>
                {player.riskScore}/100
              </span>
            </div>
            <Progress 
              value={player.riskScore} 
              max={100} 
              className={`h-2 ${
                riskLevel === 'High' ? 'bg-risk-high/20' : 
                riskLevel === 'Medium' ? 'bg-risk-medium/20' : 'bg-risk-low/20'
              }`}
            />
            <span className={`text-xs ${
              riskLevel === 'High' ? 'text-risk-high' : 
              riskLevel === 'Medium' ? 'text-risk-medium' : 'text-risk-low'
            }`}>
              {riskLevel} risk of injury
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contributing Factors</h3>
            {riskFactors.map((factor, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    {factor.icon}
                    <span>{factor.name}</span>
                  </div>
                  <span className="text-muted-foreground">{factor.detail}</span>
                </div>
                <Progress 
                  value={factor.value} 
                  max={100} 
                  className={`h-1.5 ${factor.value > 80 ? 'bg-risk-high/20' : 
                    factor.value > 50 ? 'bg-risk-medium/20' : 'bg-risk-low/20'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
