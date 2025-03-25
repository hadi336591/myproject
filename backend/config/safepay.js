// Safepay configuration
const safepayConfig = {
  apiKey: process.env.SAFEPAY_API_KEY || 'sec_test_e8b27564-95bf-4f5d-9ed3-4ce3f0a77124',
  sandboxMode: process.env.NODE_ENV !== 'production',
  webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET || 'whsec_test_8927564-95bf-4f5d-9ed3-4ce3f0a77124',
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.getsafepay.com' 
    : 'https://sandbox.api.getsafepay.com'
};

export default safepayConfig;