import { useState } from "react";
import { SafePayCheckout } from "@/components/payment/SafePayCheckout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Sample product data - in a real app, this would come from your cart state or API
const sampleProducts = [
  { id: 1, name: "Product 1", price: 2500, quantity: 1 },
  { id: 2, name: "Product 2", price: 1500, quantity: 2 },
];

export default function CheckoutPage() {
  const [products] = useState(sampleProducts);
  
  // Calculate subtotal
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  
  // Calculate tax (example: 5%)
  const taxRate = 0.05;
  const tax = Math.round(subtotal * taxRate);
  
  // Calculate total
  const total = subtotal + tax;

  return (
    <main className="w-full min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {product.quantity}</p>
                      </div>
                      <p>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'PKR',
                        }).format(product.price * product.quantity / 100)}
                      </p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PKR',
                      }).format(subtotal / 100)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p>Tax (5%)</p>
                    <p>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PKR',
                      }).format(tax / 100)}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PKR',
                      }).format(total / 100)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Form */}
          <div className="md:col-span-2">
            <SafePayCheckout 
              amount={total} 
              currency="PKR"
              description="Payment for your order"
            />
          </div>
        </div>
      </div>
    </main>
  );
}