/**
 * Sorsiri Static & Mock Data Layer
 * Updated to adhere 100% to the Figma Design Specification.
 */

export const figmaDesignData = {
  brandName: "Sorsiri",
  headline: {
    line1: "Build Global.",
    line2: "Sound Local."
  },
  subtitle: "Sorsiri captures your founder's context into a structured Brand OS, then generates a culture-aware copy kit for every market.",
  video: {
    poster: "/sorsiri_video_poster.png",
    videoSrc: "", // Can be populated with real .mp4 URL
    title: "Sorsiri Brand OS & Copy Kit Demo",
    duration: "1:42",
  },
  form: {
    title: "Session Takeaways",
    subtitle: "Below are the distilled conference insights for you.",
    fields: {
      emailLabel: "Email",
      emailPlaceholder: "Use event registration email",
      whatsappLabel: "WhatsApp Number",
      whatsappDefault: "+918431745550",
      waitlistLabel: "Put me on the Sorsiri waitlist:",
      waitlistOptions: [
        { id: "yes_talk", label: "Yes, let's talk.", defaultChecked: true },
        { id: "just_takeaways", label: "Just the takeaways for now.", defaultChecked: false }
      ],
      communityLabel: "Founder Community:",
      communityCheckboxes: [
        { id: "whatsapp_community", label: "Join an exclusive list of founders in the Sorsiri WhatsApp Community", defaultChecked: false },
        { id: "event_updates", label: "Send me future event updates", defaultChecked: false }
      ],
      submitCta: "GET THE TAKEAWAYS →",
      securityNote: "Your data is safe and secure with us."
    }
  }
};

export const brandMetadata = {
  name: "Sorsiri",
  tagline: "Build Global. Sound Local.",
  description: "Sorsiri captures your founder's context into a structured Brand OS, then generates a culture-aware copy kit for every market.",
  socials: {
    linkedin: "https://linkedin.com/company/sorsiri",
    twitter: "https://twitter.com/sorsiri_ai",
    github: "https://github.com/sorsiri",
    whatsapp: "https://wa.me/918431745550"
  }
};
