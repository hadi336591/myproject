import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createCheckoutSession, loadSafePaySDK, initSafePayCheckout } from "@/lib/safepay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  amount?: number;
  currency?: string;
  productName?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function PaymentForm({ 
  amount = 0, 
  currency = "PKR", 
  productName = "Product",
  onSuccess,
  onError
}: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(amount);
  const [paymentCurrency, setPaymentCurrency] = useState(currency);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate a unique order ID
      const orderId = uuidv4();
      
      // Create checkout session
      const session = await createCheckoutSession({
        amount: paymentAmount,
        currency: paymentCurrency,
        orderId,
        customerName,
        customerEmail,
        customerPhone,
        redirectUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
        metadata: {
          product: productName
        }
      });

      // Load SafePay SDK
      await loadSafePaySDK();
      
      // Initialize checkout
      initSafePayCheckout(session.token, {
        onSuccess: (data) => {
          toast({
            title: "Payment Successful",
            description: "Your payment has been processed successfully",
          });
          
          if (onSuccess) {
            onSuccess(data);
          } else {
            navigate("/payment/success", { 
              state: { 
                paymentId: data.id,
                amount: paymentAmount,
                currency: paymentCurrency
              } 
            });
          }
        },
        onError: (error) => {
          toast({
            title: "Payment Failed",
            description: error.message || "There was an error processing your payment",
            variant: "destructive",
          });
          
          if (onError) {
            onError(error);
          }
        },
        onCancel: () => {
          toast({
            title: "Payment Cancelled",
            description: "You have cancelled the payment process",
          });
          setIsLoading(false);
        }
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initialize payment",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information</CardDescription>
      </CardHeader>
      <form onSubmit={handlePayment}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              placeholder="Enter amount"
              disabled={isLoading || amount > 0}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select 
              value={paymentCurrency} 
              onValueChange={setPaymentCurrency}
              disabled={isLoading}
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PKR">Pakistani Rupee (PKR)</SelectItem>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="John Doe"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="john@example.com"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+92 300 1234567"
              disabled={isLoading}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${paymentAmount} ${paymentCurrency}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}