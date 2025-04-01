
import React from 'react';
import { Player } from '../data/players';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface InjuryHistoryProps {
  player: Player;
}

const InjuryHistory: React.FC<InjuryHistoryProps> = ({ player }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-risk-high';
      case 'Moderate': return 'bg-risk-medium';
      case 'Minor': return 'bg-risk-low';
      default: return 'bg-neutral';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Injury History</CardTitle>
      </CardHeader>
      <CardContent>
        {player.injuryHistory.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No previous injuries recorded
          </div>
        ) : (
          <div className="space-y-4">
            {player.injuryHistory.map((injury) => (
              <div key={injury.id} className="border-l-2 pl-4 py-1 space-y-1 relative">
                <div className={`w-3 h-3 rounded-full absolute -left-[7px] top-2 ${getSeverityColor(injury.severity)}`} />
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{injury.type}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(injury.severity)} text-white`}>
                    {injury.severity}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{injury.location}</p>
                <div className="flex items-center text-xs text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{format(parseISO(injury.date), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{injury.recoveryTimeInDays} days recovery</span>
                  </div>
                </div>
                {injury.recurrence && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full inline-block mt-1">
                    Recurring
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InjuryHistory;
