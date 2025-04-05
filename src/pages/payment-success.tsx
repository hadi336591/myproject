import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { verifySafePayPayment } from "@/lib/safepay";
import { useToast } from "@/hooks/use-toast";

export default function PaymentSuccessPage() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get token from URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
          throw new Error("Payment token not found");
        }

        // Verify the payment with SafePay
        const verificationResult = await verifySafePayPayment(token);
        setPaymentDetails(verificationResult);
        
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        });
      } catch (error: any) {
        console.error("Payment verification error:", error);
        toast({
          title: "Verification Error",
          description: error.message || "Failed to verify payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [location.search, toast]);

  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          {isVerifying ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <CardTitle className="text-2xl">Verifying Payment</CardTitle>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="text-center">
          {isVerifying ? (
            <p className="text-muted-foreground">
              Please wait while we verify your payment...
            </p>
          ) : (
            <>
              <p className="mb-4">
                Thank you for your payment. Your transaction has been completed successfully.
              </p>
              
              {paymentDetails && (
                <div className="mt-6 text-left bg-muted p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Transaction Details:</h3>
                  <p className="text-sm">Order ID: {paymentDetails.order_id || "N/A"}</p>
                  <p className="text-sm">Amount: {paymentDetails.amount ? 
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: paymentDetails.currency || 'PKR',
                    }).format(paymentDetails.amount / 100) : "N/A"}
                  </p>
                  <p className="text-sm">Status: {paymentDetails.status || "Completed"}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            onClick={() => navigate("/")} 
            disabled={isVerifying}
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}