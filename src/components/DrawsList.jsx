import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DrawEntryForm } from "./DrawEntryForm";
import { CalendarDays, Users, Trophy } from "lucide-react";

// Sample draws data - in a real app, this would come from an API
const sampleDraws = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    description: "Win the latest iPhone 15 Pro Max (256GB)",
    price: 1000,
    endDate: "2023-12-31",
    participants: 145,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484426d3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "PlayStation 5",
    description: "Win a brand new PlayStation 5 with extra controller",
    price: 750,
    endDate: "2023-12-15",
    participants: 98,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2427&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "MacBook Air M2",
    description: "Win the latest MacBook Air with M2 chip",
    price: 1500,
    endDate: "2024-01-15",
    participants: 76,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2426&auto=format&fit=crop"
  }
];

export function DrawsList() {
  const [selectedDraw, setSelectedDraw] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleJoinDraw = (draw) => {
    setSelectedDraw(draw);
    setIsDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleDraws.map((draw) => (
        <Card key={draw.id} className="overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img 
              src={draw.image} 
              alt={draw.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle>{draw.title}</CardTitle>
            <CardDescription>{draw.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-4">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Ends: {new Date(draw.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{draw.participants} participants</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Entry Fee</p>
                <p className="text-lg font-bold">PKR {draw.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-1 text-amber-500" />
                <span className="text-sm font-medium">1 Winner</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleJoinDraw(draw)}>
              Join Draw
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Draw</DialogTitle>
            <DialogDescription>
              Complete the form below to enter this draw.
            </DialogDescription>
          </DialogHeader>
          {selectedDraw && (
            <DrawEntryForm 
              drawAmount={selectedDraw.price} 
              drawTitle={selectedDraw.title} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}