import { Link, useLocation } from "wouter";
import { Heart, Home, Users, MessageCircle, User, Target, Crown, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/auth";
  };

  const navItems = [
    { path: "/", label: "Главная", icon: Home },
    { path: "/feed", label: "Лента", icon: Users },
    { path: "/results", label: "Совпадения", icon: Target },
    { path: "/chats", label: "Чаты", icon: MessageCircle },
    { path: "/prime", label: "Prime", icon: Crown },
    { path: "/profile", label: "Профиль", icon: User },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <header className="border-b border-primary/20 sticky top-0 z-50" style={{ background: 'rgba(248, 222, 197, 0.35)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group" data-testid="link-logo">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 animate-pulse-slow">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">СвойЧеловек+</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transform scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:backdrop-blur-sm hover:transform hover:scale-105"
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Logout button для авторизованных пользователей */}
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300"
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Выход</span>
              </Button>
            )}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              data-testid="button-mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className="md:hidden mt-4 pt-4 border-t border-white/20">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground transform scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:backdrop-blur-sm hover:transform hover:scale-105"
                  }`}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}