import React, { useState } from 'react';
import { Users, Trash2 } from 'lucide-react';

export default function AddPlayer({ players, setPlayers }) {
  const [newPlayer, setNewPlayer] = useState('');

  const addPlayer = () => {
    if (newPlayer.trim() && !players.some(p => p.name === newPlayer.trim())) {
      setPlayers([...players, {
        name: newPlayer.trim(),
        wins: 0,
        losses: 0,
        winRate: 0,
        pointsScored: 0,
        pointsConceded: 0
      }]);
      setNewPlayer('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  const deletePlayer = (playerName) => {
    setPlayers(players.filter(player => player.name !== playerName));
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/10 shadow-lg shadow-purple-500/5">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-400">
        <Users className="w-6 h-6" /> Players
      </h2>
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter player name"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 max-w-xs px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-gray-100 focus:outline-none focus:border-purple-500/50 transition-colors"
        />
        <button
          onClick={addPlayer}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-600/20"
        >
          Add Player
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map(player => (
          <div key={player.name} 
            className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 group"
          >
            <span className="font-medium text-purple-100">{player.name}</span>
            <button
              onClick={() => deletePlayer(player.name)}
              className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors group-hover:scale-105"
              title="Delete player"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
