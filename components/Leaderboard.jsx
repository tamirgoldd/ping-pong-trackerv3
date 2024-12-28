import React from 'react';
import { Trophy } from 'lucide-react';

export default function Leaderboard({ players }) {
  const sortedPlayers = [...players].sort((a, b) => b.winRate - a.winRate);

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/10 shadow-lg shadow-purple-500/5">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-400">
        <Trophy className="w-6 h-6" /> Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Player</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Wins</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Losses</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Win Rate</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Points Scored</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Points Conceded</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            {sortedPlayers.map((player, index) => (
              <tr key={player.name} className="hover:bg-purple-500/5 transition-colors">
                <td className="px-6 py-4 text-sm">
                  <span className="font-semibold text-purple-400">#{index + 1}</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-purple-100">{player.name}</td>
                <td className="px-6 py-4 text-sm text-green-400">{player.wins}</td>
                <td className="px-6 py-4 text-sm text-red-400">{player.losses}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300">
                    {player.winRate}%
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-purple-200">{player.pointsScored}</td>
                <td className="px-6 py-4 text-sm text-purple-200">{player.pointsConceded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
