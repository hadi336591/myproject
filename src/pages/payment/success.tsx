import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentData = location.state || {};

  useEffect(() => {
    // You could verify the payment here using the token from the URL
    // or handle any post-payment logic
  }, []);

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful</CardTitle>
          <CardDescription>
            Thank you for your payment. Your transaction has been completed successfully.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {paymentData.amount && paymentData.currency && (
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Amount Paid</p>
              <p className="text-2xl font-bold">
                {paymentData.amount} {paymentData.currency}
              </p>
            </div>
          )}
          
          {paymentData.paymentId && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-medium">{paymentData.paymentId}</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}