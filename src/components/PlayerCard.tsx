
import React from 'react';
import { Player, getRiskLevel } from '../data/players';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertCircle } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onSelect: (player: Player) => void;
  isActive: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onSelect, isActive }) => {
  const riskLevel = getRiskLevel(player.riskScore);
  
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isActive ? 'ring-2 ring-highlight' : 'hover:shadow-md'
      }`}
      onClick={() => onSelect(player)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-full overflow-hidden bg-neutral-light border border-neutral">
              <img 
                src={player.profileImage} 
                alt={player.name} 
                className="h-full w-full object-cover"
              />
            </div>
            {riskLevel === 'High' && (
              <div className="absolute -top-1 -right-1">
                <Alert size={16} className="text-risk-high animate-pulse-alert" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm">{player.name}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <span className="text-xs text-neutral-dark">{player.position}</span>
              <span className="text-xs text-neutral-dark">•</span>
              <span className="text-xs text-neutral-dark">{player.age} yrs</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Badge className={`
                ${riskLevel === 'High' ? 'bg-risk-high' : 
                  riskLevel === 'Medium' ? 'bg-risk-medium text-neutral-dark' : 'bg-risk-low'}
              `}>
                {riskLevel} Risk
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
