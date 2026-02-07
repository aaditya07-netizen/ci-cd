'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      
      // Set greeting based on time of day
      const hour = now.getHours();
      if (hour < 12) {
        setGreeting('Good Morning');
      } else if (hour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Load name from localStorage
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
    }

    return () => clearInterval(interval);
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem('nameInput') as HTMLInputElement;
    const newName = input.value.trim();
    if (newName) {
      setName(newName);
      localStorage.setItem('userName', newName);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            {greeting}{name && `, ${name}`}!
          </h1>
          <p className="text-2xl text-gray-600">{currentTime}</p>
        </div>

        <div>
          <h1>demo para</h1>
        </div>

        {!name && (
          <form onSubmit={handleNameSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                name="nameInput"
                placeholder="Enter your name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-700">Dashboard</h3>
            <p className="text-sm text-gray-500">Overview</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-semibold text-gray-700">Tasks</h3>
            <p className="text-sm text-gray-500">0 pending</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-700">Goals</h3>
            <p className="text-sm text-gray-500">Stay productive</p>
          </div>
        </div>

        {name && (
          <button
            onClick={() => {
              setName('');
              localStorage.removeItem('userName');
            }}
            className="mt-6 w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Change name
          </button>
        )}
      </div>
    </div>
  );
}