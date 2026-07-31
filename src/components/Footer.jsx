import React from "react";
import { footerData, brandMetadata } from "../data/mockData";
import { BsStars, BsLinkedin, BsTwitterX, BsGithub, BsDiscord, BsArrowUpShort } from "react-icons/bs";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-section">
      <div className="section-container">
        <div className="footer-top-row">
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">
              <div className="logo-icon-wrapper">
                <BsStars className="logo-sparkle-icon" />
              </div>
              <span className="logo-text">{brandMetadata.name}</span>
              <span className="logo-tag-badge">OS</span>
            </a>

            <p className="footer-brand-desc">{footerData.description}</p>

            <div className="footer-social-row">
              <a href={brandMetadata.socials.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <BsLinkedin />
              </a>
              <a href={brandMetadata.socials.twitter} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter X">
                <BsTwitterX />
              </a>
              <a href={brandMetadata.socials.github} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
                <BsGithub />
              </a>
              <a href={brandMetadata.socials.discord} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Discord">
                <BsDiscord />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links-grid">
            {footerData.columns.map((col, idx) => (
              <div key={idx} className="footer-link-col">
                <h4 className="footer-col-title">{col.title}</h4>
                <ul className="footer-link-list">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={link.href} className="footer-link-item">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <div className="footer-divider"></div>

        {/* Bottom Copyright Row */}
        <div className="footer-bottom-row">
          <span className="copyright-text">{footerData.copyright}</span>
          
          <button type="button" className="btn-back-top" onClick={scrollToTop} aria-label="Scroll to top">
            <span>Back to top</span>
            <BsArrowUpShort size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
