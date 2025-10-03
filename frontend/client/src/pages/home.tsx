import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg animate-gradient bg-pattern flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating elements for depth - hidden on mobile for better performance */}
      <div className="hidden md:block absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="hidden md:block absolute top-1/4 right-16 w-12 h-12 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="hidden lg:block absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="max-w-md w-full text-center relative z-10">
        <div className="mb-8">
          <div className="relative">
            <Heart className="w-16 h-16 text-white mx-auto mb-4 animate-pulse-slow" />
            <div className="absolute inset-0 w-16 h-16 mx-auto animate-ping">
              <Heart className="w-16 h-16 text-white/30" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
            СвойЧеловек+
          </h1>
          <p className="text-white/80 text-xl font-medium">Найдите свою половинку ✨</p>
        </div>
        
        <div className="space-y-4">
          <Link href="/auth">
            <Button 
              className="w-full btn-primary py-4 rounded-2xl font-semibold text-lg hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-300 card-hover"
              size="lg"
              data-testid="button-get-started"
            >
              Начать! 💖
            </Button>
          </Link>
          <Link href="/auth">
            <Button 
              variant="outline"
              className="w-full border-2 border-white/80 text-white py-4 rounded-2xl font-semibold text-lg hover:transform hover:scale-105 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300"
              style={{ background: 'rgba(248, 222, 197, 0.15)', backdropFilter: 'blur(10px)' }}
              size="lg"
              data-testid="button-sign-in"
            >
              Войти
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-white/70 text-base">
          <p className="font-medium">Присоединяйтесь к тысячам людей в поиске любви 💕</p>
          <div className="flex justify-center items-center space-x-2 mt-3">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
