import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createSafePayCheckout, loadSafePaySDK } from "@/lib/safepay";
import { v4 as uuidv4 } from "uuid";

interface SafePayCheckoutProps {
  amount: number;
  currency?: string;
  description?: string;
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
}

export function SafePayCheckout({
  amount,
  currency = "PKR",
  description = "Payment for products",
  onSuccess,
  onCancel
}: SafePayCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load SafePay SDK when component mounts
    loadSafePaySDK()
      .catch(error => {
        console.error("Failed to load SafePay SDK:", error);
        toast({
          title: "Error",
          description: "Failed to load payment gateway. Please try again later.",
          variant: "destructive",
        });
      });
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.name) {
      newErrors.name = "Name is required";
    }

    if (!customerInfo.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Generate a unique order ID
      const orderId = uuidv4();
      
      // Create a checkout session with SafePay
      const checkoutData = await createSafePayCheckout({
        amount,
        currency,
        orderId,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        description,
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>
          Pay {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
          }).format(amount / 100)} via SafePay
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={customerInfo.name}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={customerInfo.email}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              You'll be redirected to SafePay to complete your payment securely.
            </p>
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
              `Pay ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency,
              }).format(amount / 100)}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}