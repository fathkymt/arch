import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <style>{`
        @keyframes animate {
          0% {
            transform: rotateX(-30deg) rotateY(0);
          }
          100% {
            transform: rotateX(-30deg) rotateY(360deg);
          }
        }
      `}</style>
      
      <div className="relative w-[75px] h-[75px]" 
           style={{ 
             transformStyle: 'preserve-3d', 
             transform: 'rotateX(-30deg)',
             animation: 'animate 4s linear infinite'
           }}>
        <div className="absolute w-full h-full bg-gray-800"
             style={{ 
               transform: 'rotateX(90deg) translateZ(37.5px)',
               transformStyle: 'preserve-3d'
             }}>
          <div className="absolute w-[75px] h-[75px] blur"
               style={{
                 background: 'rgb(50, 50, 50)',
                 transform: 'translateZ(-90px)',
                 boxShadow: '0 0 10px #323232, 0 0 20px rgba(255,255,255,0.196), 0 0 30px #323232, 0 0 40px rgba(255,255,255,0.196)'
               }}>
          </div>
        </div>
        
        <div className="absolute w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotateY(${90 * i}deg) translateZ(37.5px)`,
                    background: `linear-gradient(to bottom,
                      black 0%,
                      black 5.5%,
                      black 12.1%,
                      white 100%,
                      black 27.9%,
                      black 36.6%,
                      black 45.6%,
                      white 100%,
                      black 63.4%,
                      black 71.7%,
                      black 79.4%,
                      white 100%,
                      black 100%,
                      black 100%,
                      black 100%,
                      white 100%)`
                  }}>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}