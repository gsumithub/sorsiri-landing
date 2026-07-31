import React, { useState, useEffect } from "react";
import { navigationData, brandMetadata } from "../data/mockData";
import { HiMenu, HiX } from "react-icons/hi";
import { BsStars } from "react-icons/bs";

export default function Navbar({ onOpenWaitlistModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <BsStars className="logo-sparkle-icon" />
          </div>
          <span className="logo-text">{navigationData.logoText}</span>
          <span className="logo-tag-badge">OS</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-links-desktop">
          {navigationData.navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="nav-link-item"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="navbar-actions-desktop">
          <button
            type="button"
            className="btn-text-login"
            onClick={() => alert("Redirecting to Sorsiri App Sign In...")}
          >
            {navigationData.loginText}
          </button>
          <button
            type="button"
            className="btn-primary-glow"
            onClick={onOpenWaitlistModal}
          >
            <span>{navigationData.ctaText}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <nav className="mobile-nav-links">
            {navigationData.navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="mobile-nav-link-item"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-nav-actions">
              <button
                type="button"
                className="btn-text-login full-width"
                onClick={() => {
                  setMobileMenuOpen(false);
                  alert("Redirecting to Sorsiri App Sign In...");
                }}
              >
                {navigationData.loginText}
              </button>
              <button
                type="button"
                className="btn-primary-glow full-width"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWaitlistModal();
                }}
              >
                <span>{navigationData.ctaText}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
