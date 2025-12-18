"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  "LAST WARNING!",
  "YOU ARE TEARING THIS FAMILY APART!",
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
  "SAVE YOUR SOUL",
  "DO IT NOW",
];

const IMAGES = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ0eHR6eW14eHY5aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZoJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/XxvvhtYWjL3zW/giphy.gif", // Avatar Eyes
  "https://media.giphy.com/media/OPU6pkyJKLS9q/giphy.gif", // Crying Cat
  "https://media.giphy.com/media/d2lcHJTG5TSCnT0I/giphy.gif", // Crying Dawson
  "https://media.giphy.com/media/11tTNkZy1TP86k/giphy.gif", // Table Flip
  "https://media.giphy.com/media/l378giAZgxPw3eO52/giphy.gif", // Crying Office
  "https://media.giphy.com/media/26ufcVAp3AiJJsrIs/giphy.gif", // Arrested Development Sad
  "https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif", // Chaos
  "https://media.giphy.com/media/nrXif9YExO9EI/giphy.gif", // Rage
];

const SUCCESS_IMAGE = "https://media.giphy.com/media/9Y6n9TR7U07ew/giphy.gif"; 

const SOUNDS = {
  hover: "https://www.myinstants.com/media/sounds/vine-boom.mp3",
  success: "https://www.myinstants.com/media/sounds/kids-cheering.mp3",
  exile: "https://www.myinstants.com/media/sounds/spongebob-fail.mp3"
};

// Floating seeds of Eywa
const Woodsprites = () => {
  const [sprites, setSprites] = useState<Array<{
    width: string;
    height: string;
    left: string;
    top: string;
    animationDuration: string;
    animationDelay: string;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const newSprites = [...Array(20)].map(() => ({
      width: Math.random() * 10 + 5 + 'px',
      height: Math.random() * 10 + 5 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDuration: Math.random() * 10 + 10 + 's',
      animationDelay: Math.random() * 5 + 's',
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setSprites(newSprites);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sprites.map((sprite, i) => (
        <div
          key={i}
          className="absolute bg-white/60 rounded-full blur-[1px] animate-float"
          style={sprite}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

const MovieInvitation = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isShaking, setIsShaking] = useState(false);
  const [isExiled, setIsExiled] = useState(false);
  const [rotation, setRotation] = useState(0);

  const yesButtonSize = noCount * 20 + 16;
  const currentImage = yesPressed ? SUCCESS_IMAGE : IMAGES[Math.min(noCount, IMAGES.length - 1)];
  const currentYesText = YES_TEXTS[Math.min(noCount, YES_TEXTS.length - 1)];
  const traitorLevel = Math.min(noCount * 10, 100);

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play failed", e));
  };

  // Check for exile condition
  useEffect(() => {
    if (noCount >= 12) {
      setIsExiled(true);
      playSound(SOUNDS.exile);
    }
  }, [noCount]);

  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    const newRotation = Math.random() * 360;
    
    setPosition({ x, y });
    setRotation(newRotation);
    setNoCount(prev => prev + 1);
    
    playSound(SOUNDS.hover);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    playSound(SOUNDS.success);
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00BFFF', '#1E90FF', '#0000FF', '#FFD700']
    });
    
    setTimeout(() => {
        confetti({ particleCount: 100, spread: 60, origin: { x: 0.2 }, colors: ['#00BFFF', '#1E90FF'] });
        confetti({ particleCount: 100, spread: 60, origin: { x: 0.8 }, colors: ['#00BFFF', '#1E90FF'] });
    }, 500);
  };

  const getNoText = () => {
    return PHRASES[Math.min(noCount, PHRASES.length - 1)];
  };

  if (isExiled) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-600 p-8 text-center animate-in fade-in duration-1000">
        <h1 className="text-6xl font-bold mb-8 tracking-widest uppercase">Exiled</h1>
        <img src="https://media.giphy.com/media/8abAbOrQ9rvLG/giphy.gif" alt="Sad walk" className="w-full max-w-md rounded-lg opacity-80 mb-8 grayscale" />
        <p className="text-2xl mb-8 text-red-400">You have betrayed the clan too many times.</p>
        <Button 
          variant="destructive" 
          size="lg"
          onClick={() => window.location.reload()}
          className="animate-pulse"
        >
          Beg for Forgiveness (Try Again)
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-teal-800 p-4 text-white overflow-hidden relative transition-all duration-500 ease-in-out"
      style={{
        filter: noCount > 0 ? `hue-rotate(${noCount * 5}deg) contrast(${100 + noCount * 2}%)` : 'none',
        transform: noCount > 5 ? `rotate(${Math.sin(noCount) * 2}deg) scale(${1 + noCount * 0.005})` : 'none',
      }}
    >
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
        .cursor-target {
          cursor: crosshair;
        }
        @keyframes flashbang {
          0% { background-color: white; opacity: 1; }
          100% { background-color: transparent; opacity: 0; }
        }
        .animate-flashbang {
          animation: flashbang 1s ease-out forwards;
        }
      `}</style>

      {yesPressed && <div className="absolute inset-0 z-50 pointer-events-none animate-flashbang"></div>}

      <Woodsprites />

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-teal-400 blur-3xl"></div>
      </div>

      <Card className={cn(
        "w-full max-w-md bg-black/40 backdrop-blur-md border-blue-500/30 text-white shadow-2xl z-10 transition-colors duration-300 cursor-target",
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
              <div className="text-6xl mb-4 animate-bounce">💙 🍿 🌳</div>
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
                        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
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