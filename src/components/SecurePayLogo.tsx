import React from 'react';

const SecurePayLogo: React.FC = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    <div
      className="absolute w-24 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg"
      style={{ transform: 'rotate(-30deg)' }}
    ></div>
    <div
      className="absolute w-24 h-16 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 shadow-lg"
      style={{ transform: 'rotate(30deg)' }}
    ></div>
  </div>
);

export default SecurePayLogo;
