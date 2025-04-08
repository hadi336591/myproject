import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createSafePayCheckout } from "@/lib/safepay.js";
import { v4 as uuidv4 } from "uuid";

export function SimplePaymentButton({ amount = 300000, description = "Payment" }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Generate a unique order ID
      const orderId = uuidv4();
      
      // Create a checkout session with SafePay
      const checkoutData = await createSafePayCheckout({
        amount, // Amount in cents (e.g., 300000 = 3000 PKR)
        currency: "PKR",
        orderId,
        description,
        redirectUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      });

      console.log("Payment checkout created:", checkoutData);

      // Redirect to SafePay checkout page
      window.location.href = checkoutData.checkoutUrl;
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      className="w-full bg-blue-500 hover:bg-blue-600"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Pay ${(amount / 100).toLocaleString()} PKR`
      )}
    </Button>
  );
}