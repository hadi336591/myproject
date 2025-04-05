import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-12 w-12 text-destructive" />
            <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Your payment process was cancelled. No charges were made.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
          <Button 
            onClick={() => navigate("/checkout")}
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}