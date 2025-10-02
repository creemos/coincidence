import { useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const mockUsers = {
  "1": { name: "Эмма", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
  "2": { name: "Яков", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
  "3": { name: "София", avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
  "4": { name: "Алекс", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
};

const mockMessages = {
  "1": [
    { id: 1, text: "Привет! Я видела ваш профиль и мне очень понравились фото с походов! 📸", sender: "user", timestamp: "10:30" },
    { id: 2, text: "Спасибо! Я люблю исследовать новые маршруты. Часто ходите в походы?", sender: "other", timestamp: "10:32" },
    { id: 3, text: "Да! Кстати, планирую поездку в горы на этих выходных", sender: "user", timestamp: "10:35" },
    { id: 4, text: "Звучит замечательно! Когда свободны?", sender: "other", timestamp: "10:36" },
  ],
  "2": [
    { id: 1, text: "Привет! Спасибо за рекомендацию ресторана", sender: "other", timestamp: "Вчера" },
    { id: 2, text: "Как всё прошло? Пробовали десерт?", sender: "user", timestamp: "Вчера" },
    { id: 3, text: "Мне очень понравился ресторан, который вы посоветовали!", sender: "other", timestamp: "1 час назад" },
  ],
  "3": [
    { id: 1, text: "Урок йоги был потрясающим!", sender: "other", timestamp: "3 часа назад" },
    { id: 2, text: "Я так рада, что вам понравилось! В то же время на следующей неделе?", sender: "user", timestamp: "3 часа назад" },
    { id: 3, text: "Урок йоги был прекрасным, спасибо 🧘‍♀️", sender: "other", timestamp: "3 часа назад" },
  ],
  "4": [
    { id: 1, text: "Не могу дождаться нашего приключения на выходных!", sender: "user", timestamp: "Вчера" },
    { id: 2, text: "С нетерпением жду нашего похода на этих выходных!", sender: "other", timestamp: "Вчера" },
  ],
};

export default function Chat() {
  const [, params] = useRoute("/chat/:id");
  const chatId = params?.id as keyof typeof mockUsers;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages[chatId] || []);
  
  const user = mockUsers[chatId];
  
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Чат не найден</h2>
          <Link href="/chats">
            <Button variant="outline">Вернуться к чатам</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user" as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link href="/chats">
            <Button variant="ghost" size="sm" className="mr-4" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <img
            src={user.avatar}
            alt={`${user.name} avatar`}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <h1 className="text-xl font-semibold text-foreground">{user.name}</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'order-2' : 'order-1'
              }`}>
                <Card className={`${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}>
                      {message.timestamp}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border px-4 py-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex space-x-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите сообщение..."
            className="flex-1"
            data-testid="input-message"
          />
          <Button 
            onClick={handleSendMessage}
            className="btn-primary text-primary-foreground"
            data-testid="button-send"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}