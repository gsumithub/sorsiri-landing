import React, { useState } from "react";
import {
  BsEnvelope,
  BsWhatsapp,
  BsCheckSquareFill,
  BsSquare,
  BsArrowRight,
  BsLock,
  BsArrowRepeat,
} from "react-icons/bs";

const BREVO_ENDPOINT =
  "https://89b8da08.sibforms.com/serve/MUIFAIyNndpD27capw_Df5mW8Cw1_qqfRjGMUxGSye6EArBf2mp9ACLb6YuPFy5Phv4ch33c2r-oSCFTARt4JbJdzra984Z9h14-tKdTq6mR6CBIs9NwTaNnBO1efsUN3ZOvVxD5xM4VpKFcIFVoSwyTKN4zcOaUWVU1gbUWr-fTIcEWlulwhejQg2YqEGkjTC-5ceZomTgMqw7NiA==";

/* ── Figma-spec form content ── */
const FORM = {
  title: "Session Takeaways",
  subtitle: "Download the one-pager from today's talk.",
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
  communityLabel: "Community:",
  communityItems: [
    "Join an exclusive list of founders in the Sorsiri WhatsApp Community",
    "Send me future event updates",
  ],
  submitCta: "GET THE TAKEAWAYS",
  securityNote: "Your data is safe and secure with us.",
};

export default function TakeawaysForm() {
  const [email, setEmail]           = useState("");
  const [whatsapp, setWhatsapp]     = useState("");
  const [selectedOS, setSelectedOS] = useState(new Set());
  const [joinCommunity, setJoin]    = useState(false);
  const [getUpdates, setUpdates]    = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(null);

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
      const formData = new FormData();
      formData.append("EMAIL", email);
      formData.append("SMS", whatsapp);
      formData.append("SMS__COUNTRY_CODE", "+91");
      formData.append("email_address_check", "");
      formData.append("locale", "en");

      // Submit form data to Brevo serve endpoint
      await fetch(BREVO_ENDPOINT, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setSuccess({ email, whatsappNumber: whatsapp });
    } catch (err) {
      setError("Your subscription could not be saved. Please try again.");
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
        <span>{FORM.subtitle}</span>
        <span className="card-subtitle-tagline">
          {FORM.subtitleLine2} <strong>{FORM.subtitleBold}</strong>
        </span>
      </p>
      <div className="form-divider" />

      {/* ── Brevo-Integrated Form ── */}
      <form
        id="sib-form"
        className="takeaways-form"
        method="POST"
        action={BREVO_ENDPOINT}
        onSubmit={handleSubmit}
        data-type="subscription"
      >
        <input type="hidden" name="SMS__COUNTRY_CODE" value="+91" />
        <input type="hidden" name="email_address_check" value="" className="input--hidden" />
        <input type="hidden" name="locale" value="en" />

        {error && <div className="form-error">{error}</div>}

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="EMAIL">Email</label>
          <div className="input-row">
            <span className="input-icon"><BsEnvelope /></span>
            <input
              id="EMAIL"
              name="EMAIL"
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
          <label className="form-label" htmlFor="SMS">WhatsApp Number</label>
          <div className="input-row">
            <span className="input-icon">
              <BsWhatsapp />
            </span>
            <input
              id="SMS"
              name="SMS"
              type="tel"
              className="sl-input"
              placeholder="+918431745550"
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
