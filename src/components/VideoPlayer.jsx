import React from "react";

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
      </div>
    </div>
  );
}
