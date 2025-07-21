import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4">🏠 Главная</h1>
            <p className="text-gray-700 mb-6">
              Красивый интерфейс с помощью Tailwind.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
              Нажми меня
            </button>
          </div>
        </div>
  );
}