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
];

const MovieInvitation = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const yesButtonSize = noCount * 20 + 16;

  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    setPosition({ x, y });
    setNoCount(noCount + 1);
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
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-teal-400 blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-blue-500/30 text-white shadow-2xl z-10">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold tracking-widest text-blue-200" style={{ fontFamily: 'Papyrus, fantasy' }}>
            {yesPressed ? "Oel Ngati Kameie" : "A QUEST AWAITS"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          {yesPressed ? (
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
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
              <div className="text-center space-y-2">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ0eHR6eW14eHY5aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZ6aHZoJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/XxvvhtYWjL3zW/giphy.gif" 
                  alt="Avatar Eyes" 
                  className="rounded-lg shadow-lg mb-6 w-full object-cover h-48"
                />
                <h2 className="text-xl font-medium">
                  Will you go see the new <span className="text-blue-400 font-bold">Avatar</span> movie with me?
                </h2>
                <p className="text-sm opacity-70">The Way of Popcorn depends on it.</p>
              </div>

              <div className="flex flex-col items-center w-full gap-4 relative h-32 justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 ease-in-out shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  style={{ fontSize: yesButtonSize, height: 'auto', padding: '0.5em 1em' }}
                  onClick={handleYesClick}
                >
                  YES 💙
                </Button>

                <div
                    className="absolute transition-all duration-200 ease-linear"
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