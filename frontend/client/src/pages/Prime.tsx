import { useState, useEffect } from "react";
import { Crown, Heart, Eye, Filter, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Prime() {
  const [isPrime, setIsPrime] = useState(false);
  const [showActivated, setShowActivated] = useState(false);

  // Загрузка статуса Prime при монтировании компонента
  useEffect(() => {
    const primeStatus = localStorage.getItem('prime');
    if (primeStatus === 'true') {
      setIsPrime(true);
    }
  }, []);

  // Активация Prime аккаунта
  const activatePrime = () => {
    localStorage.setItem('prime', 'true');
    setIsPrime(true);
    setShowActivated(true);
    
    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
      setShowActivated(false);
    }, 3000);
  };

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Безлимитные свайпы",
      description: "Лайкай без ограничений каждый день"
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      title: "Видеть, кто лайкнул вас",
      description: "Узнай, кому ты нравишься"
    },
    {
      icon: <Filter className="w-6 h-6 text-green-500" />,
      title: "Расширенные фильтры",
      description: "По интересам, возрасту, городу"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
      title: "Приоритетные сообщения",
      description: "Твои сообщения всегда в топе"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Crown className="w-10 h-10 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Prime-аккаунт
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
            Найди своего человека быстрее
          </p>
        </div>

        {/* Сообщение об активации */}
        {showActivated && (
          <div className="mb-8 text-center">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white max-w-md mx-auto">
              <CardContent className="py-4">
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-6 h-6" />
                  <span className="font-semibold">Prime-аккаунт активирован 🎉</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Активированный Prime статус */}
        {isPrime && !showActivated && (
          <div className="mb-8 text-center">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 text-lg" data-testid="prime-status-active">
              <Crown className="w-5 h-5 mr-2" />
              У вас активен Prime-аккаунт
            </Badge>
          </div>
        )}

        {/* Преимущества Prime */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            Преимущества Prime
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Карточка тарифа */}
        {!isPrime && (
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-gradient-to-r from-orange-400 to-pink-400 shadow-2xl relative overflow-hidden">
              
              {/* Фоновый градиент */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-50 to-rose-100 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-rose-900/20"></div>
              
              <CardHeader className="relative z-10 text-center">
                <div className="flex justify-center mb-2">
                  <Crown className="w-12 h-12 text-yellow-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Prime
                </CardTitle>
                <CardDescription className="text-lg">
                  Полный доступ ко всем функциям
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 text-center">
                
                {/* Цена */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    400 ₽
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    на месяц
                  </div>
                </div>

                {/* Список возможностей */}
                <div className="space-y-3 mb-8 text-left">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {benefit.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Кнопка активации */}
                <Button 
                  onClick={activatePrime}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-activate-prime"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Активировать Prime
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  * Это демо-версия. Никакие платежи не обрабатываются.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Если Prime уже активен */}
        {isPrime && !showActivated && (
          <div className="max-w-md mx-auto text-center">
            <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300">
              <CardContent className="py-8">
                <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Добро пожаловать в Prime!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Теперь у вас есть доступ ко всем премиальным функциям приложения СвойЧеловек+
                </p>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}