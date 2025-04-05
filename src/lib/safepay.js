/**
 * SafePay integration utility
 * Documentation: https://docs.getsafepay.com/docs/getting-started
 */

// SafePay sandbox credentials
const SAFEPAY_PUBLIC_KEY = "sec_ce6c9b79-dfc9-4989-9c6f-1d4ae8ed8c6a";
const SAFEPAY_SECRET_KEY = "5a049d47c5023bd0fa00c706645f51c0a0dd00d47fe74f5f9652d4383af7a4f9";
const SAFEPAY_ENVIRONMENT = "sandbox"; // Use 'production' for live environment

// SafePay API endpoints
const SAFEPAY_API_BASE = "https://sandbox.api.getsafepay.com"; // Use https://api.getsafepay.com for production

/**
 * Creates a SafePay checkout session
 */
export async function createSafePayCheckout(options) {
  try {
    const response = await fetch(`${SAFEPAY_API_BASE}/v1/checkout/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SAFEPAY_SECRET_KEY}`
      },
      body: JSON.stringify({
        client: SAFEPAY_PUBLIC_KEY,
        environment: SAFEPAY_ENVIRONMENT,
        amount: options.amount,
        currency: options.currency,
        order_id: options.orderId,
        customer_email: options.customerEmail,
        customer_name: options.customerName,
        description: options.description,
        redirect_url: options.redirectUrl || window.location.origin + "/payment-success",
        cancel_url: options.cancelUrl || window.location.origin + "/payment-cancel",
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create SafePay checkout");
    }

    const data = await response.json();
    return {
      token: data.token,
      checkoutUrl: data.checkout_url
    };
  } catch (error) {
    console.error("SafePay checkout creation error:", error);
    throw error;
  }
}

/**
 * Verifies a SafePay payment
 */
export async function verifySafePayPayment(token) {
  try {
    const response = await fetch(`${SAFEPAY_API_BASE}/v1/checkout/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SAFEPAY_SECRET_KEY}`
      },
      body: JSON.stringify({
        token
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify SafePay payment");
    }

    return await response.json();
  } catch (error) {
    console.error("SafePay payment verification error:", error);
    throw error;
  }
}

/**
 * Loads the SafePay JS SDK
 */
export function loadSafePaySDK() {
  return new Promise((resolve, reject) => {
    if (window.SafePay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sandbox.api.getsafepay.com/v1/safepay.js'; // Use https://api.getsafepay.com/v1/safepay.js for production
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load SafePay SDK'));
    document.body.appendChild(script);
  });
}