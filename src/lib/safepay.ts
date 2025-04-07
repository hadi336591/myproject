// SafePay integration utility

// SafePay credentials
const SAFEPAY_PUBLIC_KEY = "sec_ce6c9b79-dfc9-4989-9c6f-1d4ae8ed8c6a";
const SAFEPAY_SECRET_KEY = "d07275608ddb0e385a3ff0b599e4b0315f4f5230d1859b7369dcb8c89a32984c";
const SAFEPAY_SANDBOX_MODE = true; // Set to false for production

// SafePay API endpoints
const SAFEPAY_BASE_URL = SAFEPAY_SANDBOX_MODE 
  ? "https://sandbox.api.getsafepay.com"
  : "https://api.getsafepay.com";

// SafePay checkout options
export type SafePayCheckoutOptions = {
  amount: number;
  currency: string;
  orderId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  redirectUrl?: string;
  cancelUrl?: string;
  webhookUrl?: string;
  metadata?: Record<string, any>;
};

// Create a checkout session with SafePay
export async function createCheckoutSession(options: SafePayCheckoutOptions) {
  try {
    const response = await fetch(`${SAFEPAY_BASE_URL}/v1/checkout/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SAFEPAY_SECRET_KEY}`
      },
      body: JSON.stringify({
        amount: options.amount,
        currency: options.currency,
        order_id: options.orderId,
        customer: {
          name: options.customerName,
          email: options.customerEmail,
          phone: options.customerPhone
        },
        redirect_url: options.redirectUrl,
        cancel_url: options.cancelUrl,
        webhook_url: options.webhookUrl,
        metadata: options.metadata
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create checkout session');
    }

    return await response.json();
  } catch (error) {
    console.error('SafePay checkout session creation failed:', error);
    throw error;
  }
}

// Verify a payment with SafePay
export async function verifyPayment(token: string) {
  try {
    const response = await fetch(`${SAFEPAY_BASE_URL}/v1/checkout/payment/${token}/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SAFEPAY_SECRET_KEY}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify payment');
    }

    return await response.json();
  } catch (error) {
    console.error('SafePay payment verification failed:', error);
    throw error;
  }
}

// Load the SafePay JS SDK
export function loadSafePaySDK() {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById('safepay-js')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'safepay-js';
    script.src = SAFEPAY_SANDBOX_MODE 
      ? 'https://sandbox.api.getsafepay.com/v1/safepay.js'
      : 'https://api.getsafepay.com/v1/safepay.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load SafePay SDK'));
    document.head.appendChild(script);
  });
}

// Initialize SafePay checkout
export function initSafePayCheckout(token: string, options: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}) {
  if (typeof window === 'undefined' || !window.Safepay) {
    throw new Error('SafePay SDK not loaded');
  }

  window.Safepay.init({
    token,
    env: SAFEPAY_SANDBOX_MODE ? 'sandbox' : 'production',
    key: SAFEPAY_PUBLIC_KEY,
    onSuccess: (data: any) => {
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error: any) => {
      if (options.onError) options.onError(error);
    },
    onCancel: () => {
      if (options.onCancel) options.onCancel();
    }
  });

  window.Safepay.checkout();
}

// Declare global Safepay type
declare global {
  interface Window {
    Safepay: {
      init: (options: any) => void;
      checkout: () => void;
    };
  }
}