import { Button } from "@/components/ui/button";
import { DrawsList } from "@/components/DrawsList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Prize Draws</h1>
          <p className="text-muted-foreground">Enter draws to win amazing prizes</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/")}>
          Home
        </Button>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Available Draws</h2>
        <DrawsList />
      </section>

      <section className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mb-3">1</div>
            <h3 className="font-medium mb-2">Choose a Draw</h3>
            <p className="text-sm text-muted-foreground">Browse through available prize draws and select one you'd like to enter</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mb-3">2</div>
            <h3 className="font-medium mb-2">Pay Entry Fee</h3>
            <p className="text-sm text-muted-foreground">Complete the secure payment process with Safepay</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mb-3">3</div>
            <h3 className="font-medium mb-2">Wait for Results</h3>
            <p className="text-sm text-muted-foreground">Winners are announced after the draw closing date</p>
          </div>
        </div>
      </section>
    </div>
  );
}