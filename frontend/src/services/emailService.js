import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Get from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Get from EmailJS dashboard
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Get from EmailJS dashboard

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send contact form email
 * @param {Object} formData - Form data to send
 * @returns {Promise} - EmailJS promise
 */
export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company,
      timeline: formData.timeline,
      message: formData.message,
      to_email: 'hello@shravo.com',
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
};

/**
 * Send investor inquiry email
 * @param {Object} formData - Investor form data
 * @returns {Promise} - EmailJS promise
 */
export const sendInvestorEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      organization: formData.organization,
      investment_range: formData.investmentRange,
      message: formData.message,
      to_email: 'hello@shravo.com',
      reply_to: formData.email,
      inquiry_type: 'Investor Inquiry',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Investor email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Investor email send failed:', error);
    return { success: false, error };
  }
};

/**
 * Send chat widget inquiry email
 * @param {Object} data - Chat data
 * @returns {Promise} - EmailJS promise
 */
export const sendChatEmail = async (data) => {
  try {
    const templateParams = {
      message: data.message,
      timestamp: new Date().toLocaleString(),
      to_email: 'hello@shravo.com',
      inquiry_type: 'Chat Widget Inquiry',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Chat email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Chat email send failed:', error);
    return { success: false, error };
  }
};
