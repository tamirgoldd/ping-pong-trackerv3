import React, { useState, useEffect } from 'react';
import AddPlayer from '../components/AddPlayer';
import Leaderboard from '../components/Leaderboard';
import MatchHistory from '../components/MatchHistory';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');

  // Add a match and update player stats
  const recordMatch = () => {
    if (player1 && player2 && player1 !== player2 && score1 && score2) {
      const match = {
        id: Date.now(),
        player1,
        player2,
        score1: parseInt(score1),
        score2: parseInt(score2),
        date: new Date().toISOString(),
        winner: score1 > score2 ? player1 : player2,
      };

      setMatches([match, ...matches]);

      setPlayers(players.map(player => {
        if (player.name === player1) {
          const wins = score1 > score2 ? player.wins + 1 : player.wins;
          const losses = score1 < score2 ? player.losses + 1 : player.losses;
          return {
            ...player,
            wins,
            losses,
            winRate: ((wins / (wins + losses)) * 100).toFixed(1),
            pointsScored: player.pointsScored + parseInt(score1),
            pointsConceded: player.pointsConceded + parseInt(score2),
          };
        }
        if (player.name === player2) {
          const wins = score2 > score1 ? player.wins + 1 : player.wins;
          const losses = score2 < score1 ? player.losses + 1 : player.losses;
          return {
            ...player,
            wins,
            losses,
            winRate: ((wins / (wins + losses)) * 100).toFixed(1),
            pointsScored: player.pointsScored + parseInt(score2),
            pointsConceded: player.pointsConceded + parseInt(score1),
          };
        }
        return player;
      }));

      // Reset fields
      setPlayer1('');
      setPlayer2('');
      setScore1('');
      setScore2('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-3">
            Ping Pong Tracker
          </h1>
          <h2 className="text-3xl font-semibold text-purple-300">Record Matches and Track Scores</h2>
        </div>
        <AddPlayer players={players} setPlayers={setPlayers} />
        <div className="bg-black/40 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Record Match</h2>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={player1}
              onChange={e => setPlayer1(e.target.value)}
              className="p-3 rounded bg-gray-800"
            >
              <option value="">Select Player 1</option>
              {players.map(player => (
                <option key={player.name} value={player.name}>{player.name}</option>
              ))}
            </select>
            <input
              type="number"
              value={score1}
              onChange={e => setScore1(e.target.value)}
              placeholder="Score 1"
              className="p-3 rounded bg-gray-800"
            />
            <select
              value={player2}
              onChange={e => setPlayer2(e.target.value)}
              className="p-3 rounded bg-gray-800"
            >
              <option value="">Select Player 2</option>
              {players.map(player => (
                <option key={player.name} value={player.name}>{player.name}</option>
              ))}
            </select>
            <input
              type="number"
              value={score2}
              onChange={e => setScore2(e.target.value)}
              placeholder="Score 2"
              className="p-3 rounded bg-gray-800"
            />
          </div>
          <button
            onClick={recordMatch}
            className="mt-4 p-3 bg-purple-600 rounded text-white"
          >
            Record Match
          </button>
        </div>
        <Leaderboard players={players} />
        <MatchHistory matches={matches} />
      </div>
    </div>
  );
}
