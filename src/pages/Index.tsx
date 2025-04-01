
import React, { useState } from 'react';
import Header from '@/components/Header';
import PlayerCard from '@/components/PlayerCard';
import RiskAssessment from '@/components/RiskAssessment';
import InjuryHistory from '@/components/InjuryHistory';
import PreventionTips from '@/components/PreventionTips';
import { players, Player } from '@/data/players';
import { Search, UserRound } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(players[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/3 lg:w-1/4 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <UserRound className="mr-2 h-5 w-5 text-pitch" />
                Players
              </h2>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search players..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map(player => (
                    <PlayerCard 
                      key={player.id}
                      player={player}
                      onSelect={setSelectedPlayer}
                      isActive={selectedPlayer.id === player.id}
                    />
                  ))
                ) : (
                  <div className="text-center p-4 text-muted-foreground">
                    No players found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          {selectedPlayer && (
            <div className="md:w-2/3 lg:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-neutral-light border border-neutral mr-4">
                      <img 
                        src={selectedPlayer.profileImage} 
                        alt={selectedPlayer.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPlayer.name}</h2>
                      <p className="text-muted-foreground">
                        {selectedPlayer.position} • {selectedPlayer.age} years • 
                        {selectedPlayer.height}cm • {selectedPlayer.weight}kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <RiskAssessment player={selectedPlayer} />
                <InjuryHistory player={selectedPlayer} />
                <div className="md:col-span-2">
                  <PreventionTips player={selectedPlayer} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-pitch text-white py-4 text-center text-sm">
        <div className="container mx-auto">
          <p>Football Injury Guardian © 2023 • Powered by Machine Learning</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
