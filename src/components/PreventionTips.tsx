
import React from 'react';
import { Player, getPreventionTips } from '../data/players';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface PreventionTipsProps {
  player: Player;
}

const PreventionTips: React.FC<PreventionTipsProps> = ({ player }) => {
  const tips = getPreventionTips(player);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Prevention Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex">
              <CheckCircle2 className="h-5 w-5 text-pitch mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreventionTips;
