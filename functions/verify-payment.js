import { createClient } from "@fine-dev/fine-js/server";

// SafePay sandbox credentials
const SAFEPAY_SECRET_KEY = "5a049d47c5023bd0fa00c706645f51c0a0dd00d47fe74f5f9652d4383af7a4f9";
const SAFEPAY_API_BASE = "https://sandbox.api.getsafepay.com"; // Use https://api.getsafepay.com for production

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ error: "Payment token is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Verify the payment with SafePay
    const response = await fetch(`${SAFEPAY_API_BASE}/v1/checkout/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SAFEPAY_SECRET_KEY}`
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ 
        error: errorData.message || "Failed to verify payment" 
      }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const paymentData = await response.json();

    // Here you would typically update your database to record the payment
    // For example:
    // const fine = createClient();
    // await fine.db.insert("payments", {
    //   orderId: paymentData.order_id,
    //   amount: paymentData.amount,
    //   currency: paymentData.currency,
    //   status: paymentData.status,
    //   customerEmail: paymentData.customer_email,
    //   timestamp: new Date().toISOString()
    // });

    return new Response(JSON.stringify(paymentData), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}