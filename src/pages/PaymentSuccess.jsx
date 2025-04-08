import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { verifySafepayPayment } from "@/lib/safepay";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!token) {
        setVerifying(false);
        return;
      }
      
      try {
        const result = await verifySafepayPayment(token);
        setPaymentStatus(result);
      } catch (error) {
        console.error("Payment verification failed:", error);
      } finally {
        setVerifying(false);
      }
    };
    
    verifyPayment();
  }, [token]);

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-center">Payment Successful!</CardTitle>
          <CardDescription className="text-center">
            Thank you for your payment. Your transaction has been completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {verifying ? (
            <p className="text-center">Verifying your payment...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-center">Your draw entry has been confirmed.</p>
              <p className="text-center text-sm text-muted-foreground">
                A confirmation email has been sent to your email address.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}