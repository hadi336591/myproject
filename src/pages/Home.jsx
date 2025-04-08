import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Prize Draws</h1>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Win Amazing Prizes with Our Online Draws</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Enter our prize draws for a chance to win the latest tech gadgets, luxury items, and more!
            </p>
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              View Available Draws
            </Button>
          </div>
        </section>

        <section className="bg-muted py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">1</div>
                <h3 className="text-xl font-semibold text-center mb-3">Choose a Draw</h3>
                <p className="text-center text-muted-foreground">
                  Browse our selection of prize draws and choose the ones you want to enter.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">2</div>
                <h3 className="text-xl font-semibold text-center mb-3">Pay Entry Fee</h3>
                <p className="text-center text-muted-foreground">
                  Pay the entry fee securely using Safepay, our trusted payment partner.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">3</div>
                <h3 className="text-xl font-semibold text-center mb-3">Win Prizes</h3>
                <p className="text-center text-muted-foreground">
                  Winners are randomly selected after the draw closing date. Good luck!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Prize Draws. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}