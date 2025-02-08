import React, { useState, useEffect } from 'react';

export default function MatchSystem() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position),
        (error) => console.error(error)
      );
    }
  }, []);

  const nearbyPlayers = [
    { id: 1, name: '张伟', level: '4.0', distance: '1.2km' },
    { id: 2, name: '李娜', level: '3.5', distance: '0.8km' },
    // 更多模拟数据...
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">附近球友</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyPlayers.map(player => (
          <div key={player.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{player.name}</h3>
            <div className="mt-2 text-sm">
              <p>水平等级: {player.level}</p>
              <p>距离: {player.distance}</p>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              发起挑战
            </button>
          </div>
        ))}
      </div>
    </section>
  );
} 