import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { AppSidebar } from "@/components/layout/Sidebar";

const Index = () => {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 w-full min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to SafePay Integration</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A simple demonstration of SafePay payment gateway integration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg">
              <Link to="/payment">
                <CreditCard className="mr-2 h-5 w-5" />
                Make a Payment
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">About SafePay Integration</h2>
            <p className="text-muted-foreground mb-4">
              This demo showcases how to integrate SafePay payment gateway into your React application.
              You can process payments securely using the SafePay API.
            </p>
            <p className="text-muted-foreground">
              The integration includes payment form, success and failure handling, and transaction verification.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;