import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { initializeSafepayCheckout, redirectToSafepay } from "@/lib/safepay";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function SafepayCheckout({ amount, orderId, customerInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // Initialize Safepay checkout
      const paymentData = {
        amount,
        orderId,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
      };
      
      const { checkoutUrl } = await initializeSafepayCheckout(paymentData);
      
      // Redirect to Safepay checkout page
      redirectToSafepay(checkoutUrl);
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "There was a problem processing your payment. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>
          You will be redirected to Safepay to complete your payment securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-semibold">PKR {amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="font-semibold">Safepay</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handlePayment} 
          disabled={isLoading} 
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Now with Safepay"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}