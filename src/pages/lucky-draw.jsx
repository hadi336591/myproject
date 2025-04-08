import { LuckyDrawPayment } from "@/components/payment/LuckyDrawPayment";

export default function LuckyDrawPage() {
  return (
    <main className="w-full min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <LuckyDrawPayment />
      </div>
    </main>
  );
}