'use client';

import React from 'react';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 排名数据
const rankings = [
  { rank: 1, name: '诺瓦克·德约科维奇', points: 11245, country: 'SRB' },
  { rank: 2, name: '卡洛斯·阿尔卡拉斯', points: 8805, country: 'ESP' },
  // 更多数据...
];

// 中国选手数据
const chinesePlayers = [
  { rank: 1, name: '张之臻', points: 890, country: 'CHN' },
  { rank: 2, name: '郑钦文', points: 4520, country: 'CHN' },
];

// 在组件内顶部添加图片数据
const bannerImages = [
  { 
    id: 1,
    url: 'https://images.unsplash.com/photo-1616512659455-111d3367649f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: '网球比赛'
  },
  { 
    id: 2,
    url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: '网球训练'
  },
  { 
    id: 3,
    url: 'https://images.unsplash.com/photo-1622279454407-986530c37b9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: '网球场地'
  }
];

export default function Home() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const nearbyPlayers = [
    { id: 1, name: '张伟', level: '4.0', distance: '1.2km' },
    { id: 2, name: '李娜', level: '3.5', distance: '0.8km' },
  ];
  const news = [
    { id: 1, title: 'ATP最新排名公布', category: 'ATP', excerpt: '德约科维奇继续领跑...' },
    { id: 2, title: '郑钦文闯入澳网四强', category: 'WTA', excerpt: '中国金花再创佳绩...' },
  ];

  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position),
        (error) => console.error(error)
      );
    }
  }, []);

  const handleChallenge = (playerId: number) => {
    if (!location) {
      alert('请先允许定位权限');
      return;
    }
    const confirmChallenge = window.confirm(`确定要挑战${nearbyPlayers.find(p => p.id === playerId)?.name}吗？`);
    if (confirmChallenge) {
      // 这里可以添加API调用
      alert('挑战请求已发送！');
    }
  };

  const handleNewsClick = (newsId: number) => {
    router.push(`/news/${newsId}`);
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      {/* 导航栏 */}
      <nav className="w-full flex justify-between items-center sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur z-50 py-4 px-8 sm:px-20">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Logo"
          width={100}
          height={24}
        />
        <div className="flex gap-4">
          <a href="/auth/login" className="text-sm hover:underline">登录</a>
          <a href="/auth/register" className="text-sm hover:underline">注册</a>
        </div>
      </nav>

      {/* 轮播区域 */}
      <section className="w-full relative z-0 max-w-5xl mx-auto mt-8 aspect-[3/1]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="h-full w-full rounded-lg overflow-hidden"
        >
          {bannerImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="relative h-full">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover object-center brightness-90"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                  <h3 className="text-xl font-bold text-white">{image.alt}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 核心功能区域 */}
      <main className="flex-1 space-y-16 pt-20">
        {/* 附近球友匹配 */}
        <section className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">附近球友</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyPlayers.map(player => (
              <div key={player.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{player.name}</h3>
                <div className="mt-2 text-sm">
                  <p>水平等级: {player.level}</p>
                  <p>距离: {player.distance}</p>
                </div>
                <button 
                  onClick={() => handleChallenge(player.id)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  发起挑战
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 网球资讯 */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">最新资讯</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.map(item => (
              <div 
                key={item.id} 
                onClick={() => handleNewsClick(item.id)}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 text-xs rounded ${item.category === 'ATP' ? 'bg-blue-100' : 'bg-pink-100'}`}>
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 中国选手排名 */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">中国选手排名</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-2">排名</th>
                  <th className="px-4 py-2">选手</th>
                  <th className="px-4 py-2">积分</th>
                  <th className="px-4 py-2">国家</th>
                </tr>
              </thead>
              <tbody>
                {chinesePlayers.map(player => (
                  <tr key={player.rank} className="border-b">
                    <td className="px-4 py-2">{player.rank}</td>
                    <td className="px-4 py-2">{player.name}</td>
                    <td className="px-4 py-2">{player.points}</td>
                    <td className="px-4 py-2">{player.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 全球排名 */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">实时全球排名</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-2">排名</th>
                  <th className="px-4 py-2">选手</th>
                  <th className="px-4 py-2">积分</th>
                  <th className="px-4 py-2">国家</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map(player => (
                  <tr key={player.rank} className="border-b">
                    <td className="px-4 py-2">{player.rank}</td>
                    <td className="px-4 py-2">{player.name}</td>
                    <td className="px-4 py-2">{player.points}</td>
                    <td className="px-4 py-2">{player.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
