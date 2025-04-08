import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Info } from "lucide-react";
import { createSafePayCheckout } from "@/lib/safepay";
import { v4 as uuidv4 } from "uuid";

export function LuckyDrawPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("safepay");
  const { toast } = useToast();
  
  const handlePayment = async () => {
    if (selectedMethod !== "safepay") {
      toast({
        title: "Payment Method Not Available",
        description: "Currently, only SafePay payments are supported.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Generate a unique order ID
      const orderId = uuidv4();
      
      // Create a checkout session with SafePay
      const checkoutData = await createSafePayCheckout({
        amount: 300000, // 3000 PKR in cents
        currency: "PKR",
        orderId,
        customerEmail: "", // This will be collected on SafePay's page
        customerName: "",  // This will be collected on SafePay's page
        description: "Lucky Draw Entry - Visa Processing",
        redirectUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      });

      // Redirect to SafePay checkout page
      window.location.href = checkoutData.checkoutUrl;
      
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Lucky Draw Payment</h2>
      <p className="text-center mb-6">
        Please pay 3000 PKR to join the lucky draw and get a chance to win free visa processing.
      </p>
      
      <div className="mb-6">
        <h3 className="mb-3">Select Payment Method</h3>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              value="credit" 
              checked={selectedMethod === "credit"}
              onChange={() => setSelectedMethod("credit")}
              className="h-4 w-4"
            />
            <span>Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              value="bank" 
              checked={selectedMethod === "bank"}
              onChange={() => setSelectedMethod("bank")}
              className="h-4 w-4"
            />
            <span>Bank Transfer</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              value="easypaisa" 
              checked={selectedMethod === "easypaisa"}
              onChange={() => setSelectedMethod("easypaisa")}
              className="h-4 w-4"
            />
            <span>Easypaisa</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              value="jazzcash" 
              checked={selectedMethod === "jazzcash"}
              onChange={() => setSelectedMethod("jazzcash")}
              className="h-4 w-4"
            />
            <span>Jazz Cash</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              value="safepay" 
              checked={selectedMethod === "safepay"}
              onChange={() => setSelectedMethod("safepay")}
              className="h-4 w-4"
            />
            <span>Safepay (Recommended)</span>
          </label>
        </div>
      </div>
      
      {selectedMethod === "safepay" && (
        <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start">
          <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <p className="text-sm text-blue-700">
            Pay securely using Safepay - Pakistan's trusted payment gateway. 
            You'll be redirected to Safepay's secure checkout page.
          </p>
        </div>
      )}
      
      <div className="flex justify-center mb-6">
        <img 
          src="/safepay-logo.png" 
          alt="Safepay" 
          className="h-8"
          onError={(e) => {
            e.currentTarget.src = "https://www.getsafepay.com/assets/images/logo.svg";
          }}
        />
      </div>
      
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
          "PAY 3000 PKR & JOIN DRAW"
        )}
      </Button>
    </div>
  );
}