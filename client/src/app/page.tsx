"use client";

import React, { useEffect, useRef } from "react";
import VisualComponent from "../components/visual";
import { useSpidermanContext } from "@/context/useSpidermanContext";

export default function Home() {
  const { isSpiderman } = useSpidermanContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      const newSrc = isSpiderman ? "/fast.mp3" : "/slow.mp3";
      audioRef.current.src = newSrc;
      audioRef.current.load(); 
      audioRef.current.play(); 
    }
  }, [isSpiderman]);

  return (
    <div>
      <div className="center-screen">
        <h1>Beating Hearts</h1>
      </div>
      <div className="center-screen flex flex-col">
        <VisualComponent />
        <audio controls autoPlay={true} ref={audioRef}>
          <source
            src={isSpiderman ? "/fast.mp3" : "/slow.mp3"}
            type="audio/mpeg"
          />
        </audio>
      </div>
    </div>
  );
}
