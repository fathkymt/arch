import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brown-50">
      <style>{`
        @keyframes b {
          100% {
            background-position: 50% 0, 60% 50%;
          }
        }

        .tv-screen {
          background: repeating-radial-gradient(#000 0 0.0001%, #ffffff 0 0.0002%) 50% 0/2500px 2500px,
            repeating-conic-gradient(#000 0 0.0001%, #ffffff 0 0.0002%) 60% 60%/2500px 2500px;
          background-blend-mode: difference;
          animation: b 0.2s infinite alternate;
        }

        .tv-body-texture::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          background: repeating-radial-gradient(#d36604 0 0.0001%, #00000070 0 0.0002%) 50% 0/2500px 2500px,
            repeating-conic-gradient(#d36604 0 0.0001%, #00000070 0 0.0002%) 60% 60%/2500px 2500px;
          background-blend-mode: difference;
          opacity: 0.09;
        }

        .antenna-shadow {
          box-shadow: inset 0px 16px #a85103, inset 0px 16px 1px 1px #a85103;
        }

        .button-shadow {
          box-shadow: inset 2px 2px 1px #b49577, -2px 0px #513721, -2px 0px 0px 1px black;
        }

        .speaker-dot {
          box-shadow: inset 1.25px 1.25px 1px #b49577;
        }
      `}</style>

      <div className="relative w-[30em] h-[30em] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-20">
          {/* Antenna */}
          <div className="relative w-20 h-20 rounded-full border-2 border-black bg-[#f27405] -mb-24 z-[-1]">
            <div className="antenna-shadow absolute w-[50px] h-[56px] ml-[1.68em] rounded-[45%] rotate-[140deg] border-4 border-transparent" />
            <div className="a1 absolute top-[-102%] left-[-130%] w-[12em] h-[5.5em] rounded-[50px] bg-gradient-to-b from-[#171717] via-[#353535] to-[#171717] rotate-[-29deg] [clip-path:polygon(50%_0%,49%_100%,52%_100%)]" />
            <div className="a1d absolute top-[-211%] left-[-35%] rotate-45 w-2 h-2 rounded-full border-2 border-black bg-[#979797] z-[99]" />
            <div className="a2 absolute top-[-210%] left-[-10%] w-[12em] h-16 rounded-[50px] bg-gradient-to-b from-[#171717] via-[#353535] to-[#171717] -rotate-8 [clip-path:polygon(47%_0,47%_0,34%_34%,54%_25%,32%_100%,29%_96%,49%_32%,30%_38%)]" />
            <div className="a2d absolute top-[-294%] left-[94%] w-2 h-2 rounded-full border-2 border-black bg-[#979797] z-[99]" />
          </div>

          {/* TV Body */}
          <div className="relative w-[17em] h-36 mt-12 rounded-[15px] bg-[#d36604] flex justify-center border-2 border-[#1d0e01] shadow-[inset_0.2em_0.2em_#e69635] tv-body-texture">
            {/* Screen */}
            <div className="flex items-center self-center justify-center rounded-[15px] shadow-[3.5px_3.5px_0px_#e69635]">
              <div className="w-[13em] h-[7.85em] border-2 border-[#1d0e01] rounded-[10px] tv-screen flex items-center justify-center">
                <span className="bg-black px-[0.3em] text-[0.75em] text-white rounded-[5px] z-10">
                  NOT FOUND
                </span>
              </div>
            </div>

            {/* Lines under screen */}
            <div className="flex gap-[0.1em] self-end">
              <div className="w-[2px] h-2 bg-black rounded-t-[25px] mt-2" />
              <div className="grow w-[2px] h-4 bg-black rounded-t-[25px]" />
              <div className="w-[2px] h-2 bg-black rounded-t-[25px] mt-2" />
            </div>

            {/* Control Panel */}
            <div className="w-[4.25em] self-center h-32 bg-[#e69635] border-2 border-[#1d0e01] p-[0.6em] rounded-[10px] flex flex-col items-center justify-center gap-3 shadow-[3px_3px_0px_#e69635]">
              {/* Buttons */}
              <div className="w-[1.65em] h-[1.65em] rounded-full bg-[#7f5934] border-2 border-black button-shadow" />
              <div className="w-[1.65em] h-[1.65em] rounded-full bg-[#7f5934] border-2 border-black button-shadow" />
              
              {/* Speakers */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <div className="w-[0.65em] h-[0.65em] rounded-full bg-[#7f5934] border-2 border-black speaker-dot" />
                  <div className="w-[0.65em] h-[0.65em] rounded-full bg-[#7f5934] border-2 border-black speaker-dot" />
                  <div className="w-[0.65em] h-[0.65em] rounded-full bg-[#7f5934] border-2 border-black speaker-dot" />
                </div>
                <div className="w-auto h-[2px] bg-[#171717]" />
                <div className="w-auto h-[2px] bg-[#171717]" />
              </div>
            </div>
          </div>

          {/* Base */}
          <div className="w-full flex items-center justify-center gap-[8.7em]">
            <div className="h-4 w-8 border-2 border-[#171717] bg-[#4d4d4d] -mt-[0.15em] z-[-1]" />
            <div className="h-4 w-8 border-2 border-[#171717] bg-[#4d4d4d] -mt-[0.15em] z-[-1]" />
            <div className="absolute h-[0.15em] w-[17.5em] bg-[#171717] mt-[0.8em]" />
          </div>
        </div>

        {/* Background 404 Text */}
        <div className="absolute flex flex-row gap-24 z-[-5] -mb-8 items-center justify-center opacity-50">
          <div className="scale-[24.5] scale-x-[9]">4</div>
          <div className="scale-[24.5] scale-x-[9]">0</div>
          <div className="scale-[24.5] scale-x-[9]">4</div>
        </div>
      </div>

      {/* Back to Home Link */}
      <Link 
        href="/"
        className="absolute bottom-8 inline-block px-6 py-3 bg-brown-700 text-white rounded-lg hover:bg-brown-900 transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}