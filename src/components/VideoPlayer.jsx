import React, { useState, useRef } from "react";
import { BsPlayFill, BsPauseFill, BsVolumeUpFill, BsVolumeMuteFill, BsFullscreen, BsStars } from "react-icons/bs";

// Video served from /public/ — no poster, plays directly
const VIDEO_SRC = "/sorsiri-demo.mp4";

export default function VideoPlayer() {
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef  = useRef(null);
  const frameRef  = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      playing ? videoRef.current.pause() : videoRef.current.play();
    }
    setPlaying(p => !p);
  };

  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !muted;
    setMuted(m => !m);
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    const pct = (videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100;
    setProgress(pct);
  };

  const scrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    setProgress(pct * 100);
    if (videoRef.current) {
      videoRef.current.currentTime = pct * (videoRef.current.duration || 0);
    }
  };

  const fullscreen = () => {
    if (!frameRef.current) return;
    document.fullscreenElement ? document.exitFullscreen() : frameRef.current.requestFullscreen();
  };

  return (
    <div className="sorsiri-video-container" ref={frameRef}>
      <div className="video-player-frame">

        {/* ── HTML5 video — no poster ── */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="video-element"
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setPlaying(false)}
          playsInline
        />

        {/* ── Centre play button (shown when paused) ── */}
        {!playing && (
          <button
            type="button"
            className="video-play-overlay-btn"
            onClick={togglePlay}
            aria-label="Play Sorsiri Demo"
          >
            <BsPlayFill className="play-icon-lg" />
          </button>
        )}

        {/* ── Top-left watermark badge ── */}
        <div className="video-watermark" aria-hidden="true">
          <BsStars size={12} />
          <span>Build Global. Sound Local.</span>
        </div>

        {/* ── Bottom controls bar ── */}
        <div className="video-controls-bar">
          <button type="button" className="vctrl-btn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <BsPauseFill size={20} /> : <BsPlayFill size={20} />}
          </button>

          <div className="vctrl-progress" onClick={scrub} role="slider" aria-label="Video progress">
            <div className="vctrl-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="vctrl-right">
            <button type="button" className="vctrl-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
              {muted ? <BsVolumeMuteFill size={17} /> : <BsVolumeUpFill size={17} />}
            </button>
            <button type="button" className="vctrl-btn" onClick={fullscreen} aria-label="Fullscreen">
              <BsFullscreen size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
