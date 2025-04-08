import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-center">Payment Cancelled</CardTitle>
          <CardDescription className="text-center">
            Your payment process was cancelled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            You can try again or choose a different payment method.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Try Again
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}