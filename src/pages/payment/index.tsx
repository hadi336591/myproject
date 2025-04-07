import { PaymentForm } from "@/components/payment/PaymentForm";

export default function Payment() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Make a Payment</h1>
        <PaymentForm />
      </div>
    </main>
  );
}