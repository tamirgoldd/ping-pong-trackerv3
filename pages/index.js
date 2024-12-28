import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut, db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);

  // Sign in with Google
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        name: result.user.displayName,
        email: result.user.email,
      });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Sign out
  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
  };

  // Record a new match
  const recordMatch = async (player2, score1, score2) => {
    if (!user) return alert("Please sign in first!");

    const match = {
      player1: user.name,
      player2,
      score1: parseInt(score1, 10),
      score2: parseInt(score2, 10),
      date: new Date().toISOString(),
      winner: score1 > score2 ? user.name : player2,
    };

    try {
      await addDoc(collection(db, 'matches'), match);
    } catch (error) {
      console.error("Error recording match:", error);
    }
  };

  // Fetch matches in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'matches'), (snapshot) => {
      const fetchedMatches = snapshot.docs.map(doc => doc.data());
      setMatches(fetchedMatches);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {!user ? (
          <button
            onClick={handleSignIn}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Sign in with Google
          </button>
        ) : (
          <div>
            <p className="text-lg">Welcome, {user.name}</p>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        )}

        {user && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Record a Match</h2>
            <input
              type="text"
              placeholder="Opponent's Name"
              id="player2"
              className="p-3 rounded bg-gray-800"
            />
            <input
              type="number"
              placeholder="Your Score"
              id="score1"
              className="p-3 rounded bg-gray-800"
            />
            <input
              type="number"
              placeholder="Opponent's Score"
              id="score2"
              className="p-3 rounded bg-gray-800"
            />
            <button
              onClick={() =>
                recordMatch(
                  document.getElementById('player2').value,
                  document.getElementById('score1').value,
                  document.getElementById('score2').value
                )
              }
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Record Match
            </button>
          </div>
        )}

        <h2 className="text-2xl font-bold mt-6">Match History</h2>
        <ul>
          {matches.map((match, index) => (
            <li key={index} className="p-2 bg-gray-800 rounded mb-2">
              {match.date} - {match.player1} ({match.score1}) vs {match.player2} ({match.score2}) - Winner: {match.winner}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
