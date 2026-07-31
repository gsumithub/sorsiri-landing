import React, { useState } from "react";
import { submitWaitlist } from "../services/api";
import { BsArrowRight, BsCheckCircleFill, BsLock, BsArrowRepeat } from "react-icons/bs";

export default function LeadCaptureCTA() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Founder / CEO",
    useCase: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // API call with mock delay & backend integration marker
      const res = await submitWaitlist(formData);
      if (res.success) {
        setSuccessData(res.data);
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit waitlist registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="cta-section">
      <div className="cta-bg-glow"></div>
      
      <div className="section-container">
        <div className="cta-card-wrapper">
          <div className="cta-content-col">
            <div className="section-tag-pill">PRIORITY ACCESS</div>
            <h2 className="cta-title">Ready to Automate Your Executive Presence?</h2>
            <p className="cta-subtitle">
              Join 500+ visionary founders and executives scaling their brand authority with Sorsiri's autonomous AI OS.
            </p>

            <div className="cta-trust-list">
              <div className="trust-item">
                <BsCheckCircleFill className="icon-lime" />
                <span>Priority onboarding access for early members</span>
              </div>
              <div className="trust-item">
                <BsCheckCircleFill className="icon-lime" />
                <span>Dedicated BrandOS Voice Vector setup support</span>
              </div>
              <div className="trust-item">
                <BsCheckCircleFill className="icon-lime" />
                <span>Zero spam guarantee • Unsubscribe anytime</span>
              </div>
            </div>
          </div>

          <div className="cta-form-col">
            {successData ? (
              <div className="form-success-card">
                <div className="success-icon-wrapper">
                  <BsCheckCircleFill className="success-check-icon" />
                </div>
                <h3 className="success-title">You're on the Priority List!</h3>
                <p className="success-desc">
                  Thank you, <strong>{successData.fullName}</strong>. We've reserved position <strong>#{successData.positionInLine}</strong> on the early access queue for <strong>{successData.email}</strong>.
                </p>
                <div className="success-badge-info">
                  <span>Role: {successData.role}</span>
                  <span>Status: Confirmed</span>
                </div>
                <button
                  type="button"
                  className="btn-secondary-glass full-width mt-md"
                  onClick={() => setSuccessData(null)}
                >
                  Register Another Executive
                </button>
              </div>
            ) : (
              <form className="cta-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Request Early Access</h3>
                
                {errorMsg && (
                  <div className="form-error-banner">
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Work Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="sarah@yourcompany.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="role">Your Role / Organization</label>
                  <select
                    id="role"
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="Founder / CEO">Founder / CEO</option>
                    <option value="CMO / Marketing Director">CMO / Marketing Director</option>
                    <option value="Executive Coach / Branding Specialist">Executive Coach / Branding Specialist</option>
                    <option value="Creator / Influencer">Creator / Influencer</option>
                    <option value="Enterprise VP">Enterprise VP</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="useCase">Primary Brand Objective (Optional)</label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    className="form-textarea"
                    rows="2"
                    placeholder="e.g. Scale LinkedIn executive posts & launch weekly AI newsletter"
                    value={formData.useCase}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary-glow full-width btn-form-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <BsArrowRepeat className="spin-icon" />
                      <span>Reserving Your Seat...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Priority Waitlist</span>
                      <BsArrowRight />
                    </>
                  )}
                </button>

                <div className="form-privacy-note">
                  <BsLock className="icon-lock" />
                  <span>Enterprise grade AES-256 data protection. We respect your privacy.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
