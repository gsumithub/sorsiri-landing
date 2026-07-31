import React, { useState, useEffect } from "react";
import { heroData } from "../data/mockData";
import { fetchProductMetrics } from "../services/api";
import { BsArrowRight, BsPlayCircle, BsCheckCircleFill, BsLightningCharge, BsShieldCheck } from "react-icons/bs";

export default function Hero({ onOpenWaitlistModal }) {
  const [metrics, setMetrics] = useState(heroData.trustMetrics);
  const [liveCard, setLiveCard] = useState(heroData.livePreviewCard);
  const [activeTab, setActiveTab] = useState("stream");

  useEffect(() => {
    fetchProductMetrics().then((res) => {
      if (res.success) {
        setMetrics(res.metrics);
        setLiveCard(res.liveCard);
      }
    });
  }, []);

  const scrollToDemo = (e) => {
    e.preventDefault();
    const showcaseSection = document.querySelector("#showcase");
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      {/* Background glow graphics */}
      <div className="hero-bg-glow hero-glow-purple"></div>
      <div className="hero-bg-glow hero-glow-teal"></div>
      <div className="hero-grid-pattern"></div>

      <div className="hero-container">
        {/* Left/Main Column: Text content */}
        <div className="hero-content">
          <div className="hero-badge-pill">
            <span className="badge-sparkle">✨</span>
            <span className="badge-text">{heroData.badge}</span>
          </div>

          <h1 className="hero-title">
            Architect Your Brand Presence with{" "}
            <span className="text-gradient-purple-lime">Autonomous AI Intelligence</span>
          </h1>

          <p className="hero-subtitle">{heroData.subtitle}</p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-primary-glow btn-hero-lg"
              onClick={onOpenWaitlistModal}
            >
              <span>{heroData.primaryCta}</span>
              <BsArrowRight className="btn-icon-right" />
            </button>

            <button
              type="button"
              className="btn-secondary-glass btn-hero-lg"
              onClick={scrollToDemo}
            >
              <BsPlayCircle className="btn-icon-left" />
              <span>{heroData.secondaryCta}</span>
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="hero-metrics-bar">
            {metrics.map((item, idx) => (
              <div key={idx} className="metric-item">
                <span className="metric-value">{item.value}</span>
                <span className="metric-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Visual Asset (Interactive Mockup Dashboard Card) */}
        <div className="hero-visual-wrapper">
          <div className="hero-card-frame">
            {/* Card Top Header */}
            <div className="hero-card-header">
              <div className="card-window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="card-header-status">
                <span className="status-indicator-pulsing"></span>
                <span className="status-label">{liveCard.status}</span>
              </div>
            </div>

            {/* Main Mockup Body */}
            <div className="hero-card-body">
              {/* Score Bar Banner */}
              <div className="card-score-banner">
                <div className="score-main">
                  <span className="score-label">Executive Presence Index</span>
                  <div className="score-val-group">
                    <span className="score-num">{liveCard.currentScore}</span>
                    <span className="score-trend">{liveCard.presenceScoreChange}</span>
                  </div>
                </div>
                <div className="score-progress-bar">
                  <div className="score-progress-fill" style={{ width: `${liveCard.currentScore}%` }}></div>
                </div>
              </div>

              {/* Live Generator Simulation Box */}
              <div className="hero-live-box">
                <div className="live-box-header">
                  <div className="live-box-title">
                    <BsLightningCharge className="icon-lime" />
                    <span>{liveCard.streamTitle}</span>
                  </div>
                  <span className="tone-pill">{liveCard.activeTone}</span>
                </div>

                <div className="live-box-content">
                  <div className="live-typing-line">
                    <span className="text-quote">"The real competitive advantage in 2026 isn't just generating content—it's maintaining 100% brand voice alignment at enterprise velocity..."</span>
                  </div>
                </div>

                <div className="live-box-footer">
                  <div className="platform-badges">
                    {liveCard.platformSync.map((plat, i) => (
                      <span key={i} className="platform-tag">
                        <BsCheckCircleFill className="tag-check" />
                        {plat}
                      </span>
                    ))}
                  </div>
                  <span className="sync-status">Synced</span>
                </div>
              </div>

              {/* Floating Metric Badges */}
              <div className="floating-badge badge-top-right">
                <BsShieldCheck className="float-icon" />
                <div>
                  <div className="float-title">BrandOS Security</div>
                  <div className="float-sub">0 Compliance Risks</div>
                </div>
              </div>

              <div className="floating-badge badge-bottom-left">
                <div className="float-pulse"></div>
                <div>
                  <div className="float-title">LinkedIn Reach</div>
                  <div className="float-sub">+18.4K views today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
