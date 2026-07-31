import React from "react";
import { BsStars } from "react-icons/bs";

// GIF animation served directly from /public/vedioGIF.gif
const GIF_SRC = "/vedioGIF.gif";

export default function VideoPlayer() {
  return (
    <div className="sorsiri-video-container">
      <div className="video-player-frame">
        {/* Animated GIF demonstration */}
        <img
          src={GIF_SRC}
          alt="Sorsiri Demo Animation"
          className="video-element"
        />

        {/* Top-left watermark badge */}
        <div className="video-watermark" aria-hidden="true">
          <BsStars size={12} />
          <span>Build Global. Sound Local.</span>
        </div>
      </div>
    </div>
  );
}
