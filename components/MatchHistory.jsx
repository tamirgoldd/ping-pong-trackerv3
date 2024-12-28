import React from 'react';
import { History } from 'lucide-react';

export default function MatchHistory({ matches }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/10 shadow-lg shadow-purple-500/5">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-400">
        <History className="w-6 h-6" /> Recent Matches
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Players</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Score</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Winner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            {matches.map((match) => (
              <tr key={match.id} className="hover:bg-purple-500/5 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(match.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-purple-100">
                  {match.player1} vs {match.player2}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <span className="text-purple-400">{match.score1}</span>
                  <span className="mx-2">-</span>
                  <span className="text-purple-400">{match.score2}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300">
                    {match.winner}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
