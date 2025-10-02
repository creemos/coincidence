import { Link } from "wouter";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockMatches = [
  {
    id: 1,
    name: "Emma",
    age: 28,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    compatibility: 95,
    bio: "Loves hiking, coffee shops, and meaningful conversations. Looking for someone genuine and adventurous.",
  },
  {
    id: 2,
    name: "James",
    age: 31,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    compatibility: 92,
    bio: "Photographer and travel enthusiast. Enjoys cooking, museums, and discovering new places together.",
  },
  {
    id: 3,
    name: "Sofia",
    age: 26,
    image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    compatibility: 89,
    bio: "Artist and yoga instructor. Values mindfulness, creativity, and deep connections with nature.",
  },
];

export default function Results() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Ваши совпадения</h1>
          <p className="text-muted-foreground">Основано на результатах теста на совместимость</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockMatches.map((match) => (
            <Card key={match.id} className="card-shadow overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img
                src={match.image}
                alt={`${match.name} profile`}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {match.name}, {match.age}
                  </h3>
                  <div className="flex items-center text-primary">
                    <Heart className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{match.compatibility}%</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{match.bio}</p>
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 btn-primary text-primary-foreground font-medium"
                    data-testid={`button-like-${match.id}`}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Лайк
                  </Button>
                  <Link href={`/chat/${match.id}`}>
                    <Button 
                      variant="outline"
                      className="px-4"
                      data-testid={`button-message-${match.id}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/feed">
            <Button 
              className="btn-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg"
              data-testid="button-explore-more"
            >
              Посмотреть больше профилей
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
