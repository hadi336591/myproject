import { PaymentForm } from "@/components/payment/PaymentForm";
import { AppSidebar } from "@/components/layout/Sidebar";

export default function Payment() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 w-full min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Make a Payment</h1>
          <PaymentForm />
        </div>
      </main>
    </div>
  );
}