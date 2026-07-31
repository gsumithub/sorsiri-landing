import React from "react";
import { testimonialsData, pricingData, faqData } from "../data/mockData";
import { BsStarFill, BsCheck2, BsChevronDown, BsQuestionCircle } from "react-icons/bs";

export default function Testimonials({ onOpenWaitlistModal }) {
  const [openFaqIndex, setOpenFaqIndex] = React.useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-container">
        {/* Testimonials Header */}
        <div className="section-header text-center">
          <div className="section-tag-pill">{testimonialsData.sectionTag}</div>
          <h2 className="section-title">{testimonialsData.sectionTitle}</h2>
          <p className="section-subtitle">{testimonialsData.sectionSubtitle}</p>
        </div>

        {/* Impact Stats Row */}
        <div className="stats-impact-grid">
          {testimonialsData.stats.map((stat, idx) => (
            <div key={idx} className="stat-card shadow-glass">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {testimonialsData.reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-top-bar">
                <div className="stars-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <BsStarFill key={i} className="star-icon" />
                  ))}
                </div>
                <span className="review-tag">{rev.tag}</span>
              </div>

              <p className="review-quote">"{rev.quote}"</p>

              <div className="reviewer-profile">
                <img src={rev.avatar} alt={rev.name} className="reviewer-avatar" />
                <div className="reviewer-info">
                  <h4 className="reviewer-name">{rev.name}</h4>
                  <p className="reviewer-role">{rev.role}</p>
                  <p className="reviewer-company">{rev.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & Specs Sub-Section */}
        <div id="pricing" className="pricing-subsection">
          <div className="section-header text-center mt-xl">
            <div className="section-tag-pill">{pricingData.sectionTag}</div>
            <h2 className="section-title">{pricingData.sectionTitle}</h2>
            <p className="section-subtitle">{pricingData.sectionSubtitle}</p>
          </div>

          <div className="pricing-grid">
            {pricingData.plans.map((plan, idx) => (
              <div
                key={idx}
                className={`pricing-card ${plan.highlight ? "pricing-card-highlight" : ""}`}
              >
                {plan.badge && (
                  <div className="plan-badge">{plan.badge}</div>
                )}
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price-row">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-period">{plan.period}</span>
                </div>
                <p className="plan-desc">{plan.description}</p>

                <div className="plan-features-list">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="plan-feature-item">
                      <BsCheck2 className="plan-check-icon" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className={`btn-plan ${plan.highlight ? "btn-primary-glow" : "btn-secondary-glass"}`}
                  onClick={onOpenWaitlistModal}
                >
                  <span>{plan.ctaText}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div id="faq" className="faq-subsection">
          <div className="section-header text-center mt-xl">
            <div className="section-tag-pill">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="section-title">Everything You Need to Know</h2>
          </div>

          <div className="faq-accordion-wrapper">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${openFaqIndex === idx ? "faq-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="faq-question-text">
                    <BsQuestionCircle className="faq-icon-q" />
                    {faq.q}
                  </span>
                  <BsChevronDown className={`faq-chevron ${openFaqIndex === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="faq-answer-panel">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
