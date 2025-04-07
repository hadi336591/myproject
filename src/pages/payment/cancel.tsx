import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment process has been cancelled. No charges have been made.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            If you experienced any issues during the payment process, please try again or contact our support team.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            Return to Home
          </Button>
          <Button onClick={() => navigate("/payment")}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}