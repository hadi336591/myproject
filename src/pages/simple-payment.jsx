import { SimplePaymentButton } from "@/components/payment/SimplePaymentButton";

export default function SimplePaymentPage() {
  return (
    <main className="w-full min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Make a Payment</h2>
          <p className="text-center mb-6">
            Click the button below to make a secure payment via SafePay.
          </p>
          
          <SimplePaymentButton amount={300000} description="Test Payment" />
          
          <p className="text-sm text-center mt-4 text-gray-500">
            You'll be redirected to SafePay's secure checkout page.
          </p>
        </div>
      </div>
    </main>
  );
}