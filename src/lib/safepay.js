/**
 * Safepay integration service
 */

// Safepay sandbox environment URL (use production URL for live environment)
const SAFEPAY_BASE_URL = "https://sandbox.api.getsafepay.com";

/**
 * Initialize a Safepay checkout session
 * @param {Object} paymentData - Payment information including amount, currency, etc.
 * @returns {Promise<Object>} - Safepay checkout URL and token
 */
export const initializeSafepayCheckout = async (paymentData) => {
  try {
    // In a real implementation, this would be a server-side API call
    // For demo purposes, we're doing it client-side
    const response = await fetch(`${SAFEPAY_BASE_URL}/order/v1/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // In production, you would use environment variables for these
        "x-sfpy-merchant-id": import.meta.env.VITE_SAFEPAY_MERCHANT_ID || "your_merchant_id",
        "x-sfpy-key": import.meta.env.VITE_SAFEPAY_API_KEY || "your_api_key",
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        currency: "PKR", // or USD depending on your requirements
        order_id: paymentData.orderId || `order-${Date.now()}`,
        customer_name: paymentData.customerName,
        customer_email: paymentData.customerEmail,
        customer_phone: paymentData.customerPhone,
        redirect_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancel`,
        webhook_url: `${window.location.origin}/api/safepay-webhook`, // For server-side notifications
      }),
    });

    if (!response.ok) {
      throw new Error(`Safepay API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      checkoutUrl: data.checkout_url,
      token: data.token,
    };
  } catch (error) {
    console.error("Safepay initialization error:", error);
    throw error;
  }
};

/**
 * Redirect to Safepay checkout page
 * @param {string} checkoutUrl - The URL provided by Safepay init API
 */
export const redirectToSafepay = (checkoutUrl) => {
  window.location.href = checkoutUrl;
};

/**
 * Verify Safepay payment (typically done server-side)
 * @param {string} token - Safepay token
 * @returns {Promise<Object>} - Payment verification result
 */
export const verifySafepayPayment = async (token) => {
  try {
    // In a real implementation, this would be a server-side API call
    const response = await fetch(`${SAFEPAY_BASE_URL}/order/v1/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sfpy-merchant-id": import.meta.env.VITE_SAFEPAY_MERCHANT_ID || "your_merchant_id",
        "x-sfpy-key": import.meta.env.VITE_SAFEPAY_API_KEY || "your_api_key",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (!response.ok) {
      throw new Error(`Safepay verification error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Safepay verification error:", error);
    throw error;
  }
};