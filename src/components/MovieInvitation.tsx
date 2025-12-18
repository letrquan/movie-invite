"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PHRASES = [
  "No",
  "Are you sure?",
  "You're a Skxawng!",
  "Eywa is watching...",
  "Don't be a traitor!",
  "Blue people cry when you say no",
  "Unobtainium is expensive!",
  "I see you... ignoring me",
  "Seriously?",
  "I'll tell Toruk Makto!",
];

const YES_TEXTS = [
  "YES 💙",
  "YES (Please)",
  "YES (Don't be mean)",
  "YES (I'll buy popcorn)",
  "YES (UNOBTAINIUM!)",
  "JUST CLICK YES!",
  "SIVAKO! (Rise!)",
  "CLICK ME OR I CRY",
  "PLEASEEEEEEE",
  "OKAY FINE CLICK ME",
];

const IMAGES = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ0eHR6eW14eHY5aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZoJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/XxvvhtYWjL3zW/giphy.gif", // Avatar Eyes
  "https://media.giphy.com/media/OPU6pkyJKLS9q/giphy.gif", // Crying Cat
  "https://media.giphy.com/media/d2lcHJTG5TSCnT0I/giphy.gif", // Crying Dawson
  "https://media.giphy.com/media/11tTNkZy1TP86k/giphy.gif", // Table Flip
  "https://media.giphy.com/media/l378giAZgxPw3eO52/giphy.gif", // Crying Office
  "https://media.giphy.com/media/26ufcVAp3AiJJsrIs/giphy.gif", // Arrested Development Sad
];

const SUCCESS_IMAGE = "https://media.giphy.com/media/9Y6n9TR7U07ew/giphy.gif"; // Flying Banshee or similar cool Avatar gif

const MovieInvitation = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isShaking, setIsShaking] = useState(false);

  const yesButtonSize = noCount * 20 + 16;
  const currentImage = yesPressed ? SUCCESS_IMAGE : IMAGES[Math.min(noCount, IMAGES.length - 1)];
  const currentYesText = YES_TEXTS[Math.min(noCount, YES_TEXTS.length - 1)];
  const traitorLevel = Math.min(noCount * 10, 100);

  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    setPosition({ x, y });
    setNoCount(noCount + 1);
    
    // Trigger shake
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00BFFF', '#1E90FF', '#0000FF', '#FFD700'] // Avatar blues and gold
    });
    
    // Launch a few more bursts
    setTimeout(() => {
        confetti({ particleCount: 100, spread: 60, origin: { x: 0.2 }, colors: ['#00BFFF', '#1E90FF'] });
        confetti({ particleCount: 100, spread: 60, origin: { x: 0.8 }, colors: ['#00BFFF', '#1E90FF'] });
    }, 500);
  };

  const getNoText = () => {
    return PHRASES[Math.min(noCount, PHRASES.length - 1)];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-teal-800 p-4 text-white overflow-hidden relative">
      <style jsx>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.5s;
          animation-iteration-count: 1;
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-teal-400 blur-3xl"></div>
      </div>

      <Card className={cn(
        "w-full max-w-md bg-black/40 backdrop-blur-md border-blue-500/30 text-white shadow-2xl z-10 transition-colors duration-300",
        isShaking && "border-red-500/50 bg-red-900/20 animate-shake"
      )}>
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold tracking-widest text-blue-200" style={{ fontFamily: 'Papyrus, fantasy' }}>
            {yesPressed ? "Oel Ngati Kameie" : "A QUEST AWAITS"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          {yesPressed ? (
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
              <img 
                src={SUCCESS_IMAGE} 
                alt="Success" 
                className="rounded-lg shadow-lg mb-4 w-full object-cover h-48"
              />
              <div className="text-6xl mb-4">💙 🍿 🌳</div>
              <h2 className="text-2xl font-bold text-blue-300">Great Success!</h2>
              <p className="text-lg">I See You... at the movie theater!</p>
              <p className="text-sm opacity-70 italic">Don&apos;t forget your tail.</p>
              <Button 
                variant="outline" 
                className="mt-4 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() => window.location.reload()}
              >
                Send prayer to Eywa (Reset)
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2 w-full">
                <div className="relative">
                    <img 
                    src={currentImage} 
                    alt="Reaction" 
                    className="rounded-lg shadow-lg mb-6 w-full object-cover h-48 transition-all duration-300"
                    />
                    {noCount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                            !
                        </div>
                    )}
                </div>
                
                <h2 className="text-xl font-medium">
                  Will you go see the new <span className="text-blue-400 font-bold">Avatar</span> movie with me?
                </h2>
                
                {noCount > 0 && (
                    <div className="w-full space-y-1 pt-2">
                        <div className="flex justify-between text-xs text-red-300">
                            <span>Traitor Level</span>
                            <span>{traitorLevel}%</span>
                        </div>
                        <div className="h-2 w-full bg-blue-950 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-red-500 transition-all duration-300 ease-out" 
                                style={{ width: `${traitorLevel}%` }} 
                            />
                        </div>
                    </div>
                )}
              </div>

              <div className="flex flex-col items-center w-full gap-4 relative h-40 justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 ease-in-out shadow-[0_0_15px_rgba(37,99,235,0.5)] z-20"
                  style={{ fontSize: yesButtonSize, height: 'auto', padding: '0.5em 1em' }}
                  onClick={handleYesClick}
                >
                  {currentYesText}
                </Button>

                <div
                    className="absolute transition-all duration-200 ease-linear z-10"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                    }}
                >
                    <Button
                    variant="ghost"
                    className="bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/30 text-sm whitespace-nowrap"
                    onMouseEnter={handleNoHover}
                    onClick={handleNoHover}
                    >
                    {getNoText()}
                    </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <div className="absolute bottom-4 text-xs text-blue-300/50">
        Powered by Unobtainium & Dyad
      </div>
    </div>
  );
};

export default MovieInvitation;