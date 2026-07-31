import React, { useState } from "react";
import { submitWaitlist } from "../services/api";
import { HiX } from "react-icons/hi";
import { BsCheckCircleFill, BsLock, BsArrowRepeat, BsArrowRight } from "react-icons/bs";

export default function WaitlistModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Founder / CEO",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await submitWaitlist(formData);
      if (res.success) {
        setSuccessData(res.data);
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit waitlist registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <HiX size={22} />
        </button>

        {successData ? (
          <div className="modal-success-state">
            <div className="success-icon-wrapper">
              <BsCheckCircleFill className="success-check-icon" />
            </div>
            <h3 className="modal-title">Priority Seat Reserved!</h3>
            <p className="modal-desc">
              Welcome aboard, <strong>{successData.fullName}</strong>. You are position <strong>#{successData.positionInLine}</strong> on the early access queue.
            </p>
            <button type="button" className="btn-primary-glow full-width mt-md" onClick={onClose}>
              <span>Close Window</span>
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <span className="modal-tag-pill">PRIORITY ACCESS</span>
              <h3 className="modal-title">Get Sorsiri 2.0 Early Access</h3>
              <p className="modal-desc">Enter your details to claim priority onboarding for your executive team.</p>
            </div>

            {errorMsg && (
              <div className="form-error-banner">
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="modalFullName">Full Name *</label>
              <input
                id="modalFullName"
                type="text"
                name="fullName"
                className="form-input"
                placeholder="e.g. Alex Rivera"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="modalEmail">Work Email *</label>
              <input
                id="modalEmail"
                type="email"
                name="email"
                className="form-input"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="modalRole">Your Role</label>
              <select
                id="modalRole"
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

            <button type="submit" className="btn-primary-glow full-width btn-modal-submit" disabled={loading}>
              {loading ? (
                <>
                  <BsArrowRepeat className="spin-icon" />
                  <span>Reserving Seat...</span>
                </>
              ) : (
                <>
                  <span>Claim Early Access</span>
                  <BsArrowRight />
                </>
              )}
            </button>

            <div className="form-privacy-note">
              <BsLock className="icon-lock" />
              <span>AES-256 Encrypted • Zero Spam Guarantee</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
