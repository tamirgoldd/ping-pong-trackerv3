import React, { useState } from 'react';
import AddPlayer from '../components/AddPlayer';
import Leaderboard from '../components/Leaderboard';
import MatchHistory from '../components/MatchHistory';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-3">
            Darrow Employees
          </h1>
          <h2 className="text-3xl font-semibold text-purple-300">Ping Pong Tracker</h2>
        </div>
        <AddPlayer players={players} setPlayers={setPlayers} />
        <Leaderboard players={players} />
        <MatchHistory matches={matches} />
      </div>
    </div>
  );
}
