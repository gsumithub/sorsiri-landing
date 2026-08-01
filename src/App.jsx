import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import TakeawaysForm from "./components/TakeawaysForm";

const LOGO = "/logo.png";

export default function App() {
  return (
    <div className="sl-root">
      {/* Background Video (20% opacity with black overlay) */}
      <div className="bg-video-wrap" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="bg-video-element"
        >
          <source src="/vedio.mp4" type="video/mp4" />
          <img src="/vedioGIF.gif" alt="" className="bg-video-element" />
        </video>
        <div className="bg-black-overlay" />
      </div>

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

        {/* MAIN SPLIT LAYOUT */}
        <main className="sl-main">

          {/* LEFT HALF: Headline + Subtitle */}
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
                Sorsiri captures your founder's context into a<br />
                structured Brand OS, then generates a culture-<br />
                aware copy kit for every market.
              </p>
            </div>
          </section>

          {/* RIGHT HALF: Session Takeaways Form Card */}
          <section className="sl-right" aria-label="Session Takeaways">
            <TakeawaysForm />
          </section>

        </main>
      </div>
    </div>
  );
}
