import { Link } from "wouter";
import { MessageCircle, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const mockChats = [
  {
    id: "1",
    name: "Эмма",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    lastMessage: "Звучит замечательно! Когда свободны?",
    timestamp: "2 мин назад",
    unread: true,
  },
  {
    id: "2", 
    name: "Яков",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    lastMessage: "Мне очень понравился ресторан, который вы посоветовали!",
    timestamp: "1 час назад",
    unread: false,
  },
  {
    id: "3",
    name: "София",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    lastMessage: "Урок йоги был прекрасным, спасибо 🧘‍♀️",
    timestamp: "3 часа назад",
    unread: false,
  },
  {
    id: "4",
    name: "Алекс",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    lastMessage: "С нетерпением жду нашего похода на этих выходных!",
    timestamp: "Вчера",
    unread: true,
  },
];

export default function Chats() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <MessageCircle className="w-8 h-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-foreground">Ваши чаты</h1>
        </div>
        
        <div className="space-y-4">
          {mockChats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <Card className="card-shadow hover:transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={`${chat.name} avatar`}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      {chat.unread && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {chat.name}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${
                        chat.unread 
                          ? 'text-foreground font-medium' 
                          : 'text-muted-foreground'
                      }`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {mockChats.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Пока нет чатов
            </h3>
            <p className="text-muted-foreground">
              Начните общение, поставив лайк кому-то в ленте!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}