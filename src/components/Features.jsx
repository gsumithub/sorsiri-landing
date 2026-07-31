import React, { useState } from "react";
import { featuresData } from "../data/mockData";
import { 
  BsFillLayersFill, 
  BsGraphUpArrow, 
  BsCpu, 
  BsShieldCheck, 
  BsDiagram3, 
  BsBarChartLine,
  BsCheck2Circle
} from "react-icons/bs";

const ICON_MAP = {
  BsFillLayersFill: BsFillLayersFill,
  BsGraphUpArrow: BsGraphUpArrow,
  BsCpu: BsCpu,
  BsShieldCheck: BsShieldCheck,
  BsDiagram3: BsDiagram3,
  BsBarChartLine: BsBarChartLine,
};

export default function Features() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFeatures = activeCategory === "All"
    ? featuresData.items
    : featuresData.items.filter(item => item.category === activeCategory);

  return (
    <section id="features" className="features-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag-pill">{featuresData.sectionTag}</div>
          <h2 className="section-title">{featuresData.sectionTitle}</h2>
          <p className="section-subtitle">{featuresData.sectionSubtitle}</p>
        </div>

        {/* Category Filters */}
        <div className="category-filter-bar">
          {featuresData.categories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              className={`category-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {filteredFeatures.map((feature) => {
            const IconComponent = ICON_MAP[feature.icon] || BsCpu;
            return (
              <div key={feature.id} className="feature-card">
                <div className="card-top-bar">
                  <div className="feature-icon-box">
                    <IconComponent className="feature-icon" />
                  </div>
                  <span className="feature-badge-pill">{feature.badge}</span>
                </div>

                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-description">{feature.description}</p>

                <div className="feature-metric-row">
                  <span className="metric-tag-label">Impact Metric:</span>
                  <span className="metric-tag-value">{feature.metric}</span>
                </div>

                <div className="feature-highlights-list">
                  {feature.highlights.map((h, i) => (
                    <div key={i} className="highlight-item">
                      <BsCheck2Circle className="highlight-check" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
