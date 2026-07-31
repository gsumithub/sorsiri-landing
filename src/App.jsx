import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import TakeawaysForm from "./components/TakeawaysForm";

const LOGO = "/logo.png";

export default function App() {
  return (
    <div className="sl-root">
      {/* Ambient background glows */}
      <div className="bg-glow bg-glow-purple" aria-hidden="true" />
      <div className="bg-glow bg-glow-lime"   aria-hidden="true" />

      <div className="sl-page-container">
        {/* LOGO HEADER (above both halves) */}
        <header className="sl-header">
          <a href="#" className="sl-logo-link">
            <img src={LOGO} alt="Sorsiri logo" className="sl-logo-img" />
            <span className="sl-logo-text">Sorsiri</span>
          </a>
        </header>

        {/* MAIN SPLIT LAYOUT (two equal-height halves below logo) */}
        <main className="sl-main">

          {/* LEFT HALF: Headline + Subtitle + Video */}
          <section className="sl-left" aria-label="Sorsiri pitch">
            <div className="sl-left-top">
              <h1 className="sl-headline">
                {/* Figma: "Build" = purple, "Global." = white */}
                <span className="hw-purple">Build </span>
                <span className="hw-white">Global.</span>
                <br />
                {/* Figma: "Sound" = lime, "Local." = white */}
                <span className="hw-lime">Sound </span>
                <span className="hw-white">Local.</span>
              </h1>

              <p className="sl-subtitle">
                Sorsiri captures your founder's context into a structured Brand OS,
                then generates a culture-aware copy kit for every market.
              </p>
            </div>

            {/* VIDEO PLAYER — bottom of left half */}
            <div className="sl-video-wrap">
              <VideoPlayer />
            </div>
          </section>

          {/* RIGHT HALF: Session Takeaways Form Card (equal height to left half) */}
          <section className="sl-right" aria-label="Session Takeaways">
            <TakeawaysForm />
          </section>

        </main>
      </div>
    </div>
  );
}
