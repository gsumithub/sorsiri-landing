import React, { useState } from "react";
import { submitTakeawaysForm } from "../services/api";
import {
  BsEnvelope,
  BsWhatsapp,
  BsCheckSquareFill,
  BsSquare,
  BsArrowRight,
  BsLock,
  BsArrowRepeat,
} from "react-icons/bs";

/* ── Figma-spec form content ── */
const FORM = {
  title: "Session Takeaways",
  subtitle: "Get the one-pager from today's talk, sent straight to your inbox.",
  subtitleLine2: "You don't need louder marketing.",
  subtitleBold: "You need clearer marketing.",
  waitlistLabel: "Put me on the Sorsiri waitlist:",
  waitlistSubLabel: "Pick either, or both. We're onboarding in small batches.",
  osOptions: [
    {
      id: "global-os",
      title: "Global OS",
      tagline: "Building brands beyond borders",
      taglineColor: "os-opt-tagline-lime",
      desc: "For founders expanding into new markets.",
    },
    {
      id: "presence-os",
      title: "Presence OS",
      tagline: "Personal branding, systemized",
      taglineColor: "os-opt-tagline-purple",
      desc: "For founders, consultants, freelancers, creators, anyone whose name is the brand.",
    },
  ],
  communityLabel: "Founder Community:",
  communityItems: [
    "Join an exclusive list of founders in the Sorsiri WhatsApp Community",
    "Send me future event updates",
  ],
  submitCta: "GET THE TAKEAWAYS",
  securityNote: "Your data is safe and secure with us.",
};

export default function TakeawaysForm() {
  const [email, setEmail]             = useState("");
  const [whatsapp, setWhatsapp]       = useState("");
  // multi-select: track a Set of selected option IDs (unselected by default)
  const [selectedOS, setSelectedOS]   = useState(new Set());
  const [joinCommunity, setJoin]      = useState(false);
  const [getUpdates, setUpdates]      = useState(false);

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(null);

  const toggleOS = (id) => {
    setSelectedOS((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: Backend Integration Point — src/services/api.js:submitTakeawaysForm
      const res = await submitTakeawaysForm({
        email,
        whatsappNumber: whatsapp,
        selectedProducts: [...selectedOS],
        joinWhatsappCommunity: joinCommunity,
        sendEventUpdates: getUpdates,
      });
      if (res.success) setSuccess(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ── */
  if (success) {
    return (
      <div className="takeaways-card">
        <h2 className="card-title">{FORM.title}</h2>
        <div className="form-divider" />
        <div className="success-state">
          <div className="success-icon-wrap">
            <BsCheckSquareFill className="success-check" />
          </div>
          <h3 className="success-title">Takeaways on the way!</h3>
          <p className="success-desc">
            Insights dispatched to <strong>{success.email}</strong> and
            WhatsApp <strong>{success.whatsappNumber}</strong>.
          </p>
          <button
            type="button"
            className="sl-btn-submit"
            style={{ marginTop: 8 }}
            onClick={() => setSuccess(null)}
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="takeaways-card">
      {/* ── Header ── */}
      <h2 className="card-title">{FORM.title}</h2>
      <p className="card-subtitle">
        {FORM.subtitle}
        <br />
        {FORM.subtitleLine2} <strong>{FORM.subtitleBold}</strong>
      </p>
      <div className="form-divider" />

      {/* ── Form ── */}
      <form className="takeaways-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="lt-email">Email</label>
          <div className="input-row">
            <span className="input-icon"><BsEnvelope /></span>
            <input
              id="lt-email"
              type="email"
              className="sl-input"
              placeholder="Use event registration email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="form-group">
          <label className="form-label" htmlFor="lt-wa">WhatsApp Number</label>
          <div className="input-row">
            <span className="input-icon">
              <BsWhatsapp />
            </span>
            <input
              id="lt-wa"
              type="tel"
              className="sl-input"
              placeholder="+91..."
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Waitlist — OS Option Cards */}
        <div className="waitlist-section">
          <div className="waitlist-label-row">
            <span className="waitlist-label">{FORM.waitlistLabel}</span>
            <span className="waitlist-sublabel">{FORM.waitlistSubLabel}</span>
          </div>
          <div className="os-options">
            {FORM.osOptions.map((opt) => {
              const selected = selectedOS.has(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`os-option-card${selected ? " selected" : ""}`}
                  onClick={() => toggleOS(opt.id)}
                >
                  {selected
                    ? <BsCheckSquareFill className="os-opt-check active" />
                    : <BsSquare className="os-opt-check" />}
                  <div className="os-opt-content">
                    <span className="os-opt-title">{opt.title}</span>
                    <span className={opt.taglineColor}>{opt.tagline}</span>
                    <span className="os-opt-desc">{opt.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Community checkboxes */}
        <div className="community-section">
          <span className="community-label">{FORM.communityLabel}</span>
          <div className="checkbox-list">
            <div className="checkbox-row" onClick={() => setJoin(v => !v)}>
              {joinCommunity
                ? <BsCheckSquareFill className="cb-icon checked" />
                : <BsSquare className="cb-icon" />}
              <span className="cb-text">{FORM.communityItems[0]}</span>
            </div>
            <div className="checkbox-row" onClick={() => setUpdates(v => !v)}>
              {getUpdates
                ? <BsCheckSquareFill className="cb-icon checked" />
                : <BsSquare className="cb-icon" />}
              <span className="cb-text">{FORM.communityItems[1]}</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="lt-submit-btn"
          className="sl-btn-submit"
          disabled={loading}
        >
          {loading
            ? <><BsArrowRepeat className="spin-icon" /><span>Sending…</span></>
            : <><span>{FORM.submitCta}</span><BsArrowRight className="btn-arrow" /></>}
        </button>

        {/* Security note */}
        <div className="security-note">
          <BsLock size={11} />
          <span>{FORM.securityNote}</span>
        </div>
      </form>
    </div>
  );
}
