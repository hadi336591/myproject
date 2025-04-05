import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Index = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Store</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Experience secure payments with SafePay integration
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/checkout">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Proceed to Checkout
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Index;