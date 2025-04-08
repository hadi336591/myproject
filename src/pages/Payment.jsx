import { useLocation, useNavigate } from "react-router-dom";
import { SafepayCheckout } from "@/components/SafepayCheckout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get payment data from location state
  const paymentData = location.state?.paymentData;
  
  // If no payment data is provided, redirect to home
  if (!paymentData) {
    navigate("/");
    return null;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Complete Your Payment</h1>
        <p className="text-muted-foreground mt-2">
          Secure payment powered by Safepay
        </p>
      </div>
      
      <SafepayCheckout 
        amount={paymentData.amount}
        orderId={paymentData.orderId}
        customerInfo={paymentData.customerInfo}
      />
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Your payment information is secured with Safepay's encryption.</p>
      </div>
    </div>
  );
}