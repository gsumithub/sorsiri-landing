/**
 * Sorsiri Mock API Service Layer
 * Serves the Figma Session Takeaways form and Video playback actions.
 */

/**
 * Submit the Session Takeaways & Waitlist lead capture form.
 * @param {Object} formData - { email, whatsappNumber, waitlistChoice, joinWhatsappCommunity, sendEventUpdates }
 * @returns {Promise<Object>} API response payload
 */
export async function submitTakeawaysForm(formData) {
  // TODO: Backend Integration Point - Replace mock delay with POST /api/v1/conference/session-takeaways
  // Expected Payload: { email: string, whatsappNumber: string, waitlistOption: string, communityOptIn: boolean, eventUpdatesOptIn: boolean }
  console.log("[API Call] Submitting Session Takeaways Form:", formData);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!formData.email || !formData.email.includes("@")) {
        return reject(new Error("Please enter a valid email address."));
      }

      if (!formData.whatsappNumber || formData.whatsappNumber.trim().length < 8) {
        return reject(new Error("Please enter a valid WhatsApp number."));
      }

      resolve({
        success: true,
        status: 200,
        message: "Your conference takeaways kit has been dispatched to your email & WhatsApp!",
        data: {
          id: `takeaway_${Math.random().toString(36).substring(2, 9)}`,
          email: formData.email,
          whatsappNumber: formData.whatsappNumber,
          waitlistStatus: formData.waitlistChoice,
          communityJoined: formData.joinWhatsappCommunity,
          timestamp: new Date().toISOString()
        }
      });
    }, 1000);
  });
}
