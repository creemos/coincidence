import { Link, useLocation } from "wouter";
import { Heart, MessageCircle } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-card border-b border-border px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">СвойЧеловек+</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link 
            href="/" 
            className={`transition-colors ${location === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            data-testid="link-nav-home"
          >
            Главная
          </Link>
          <Link 
            href="/auth" 
            className={`transition-colors ${location === '/auth' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            data-testid="link-nav-auth"
          >
            Войти
          </Link>
          <Link 
            href="/feed" 
            className={`transition-colors ${location === '/feed' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            data-testid="link-nav-feed"
          >
            Обзор
          </Link>
          <Link 
            href="/chats" 
            className={`transition-colors ${location === '/chats' || location?.startsWith('/chat/') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            data-testid="link-nav-chats"
          >
            <MessageCircle className="w-4 h-4 inline mr-1" />
            Чаты
          </Link>
        </div>
      </div>
    </nav>
  );
}
