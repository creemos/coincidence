import { useState, useEffect } from "react";
import { Heart, X, RotateCcw, Crown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Константы для фильтров
const cities = ['все', 'Москва', 'СПб', 'Казань', 'Новосибирск'];
const availableInterests = ['спорт', 'музыка', 'кино', 'путешествия'];

const mockProfiles = [
  {
    id: 1,
    name: "Мария",
    age: 29,
    city: "Москва",
    profession: "Дизайнер",
    distance: 2,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600",
    bio: "Творческая личность, люблю рисовать и путешествую по выходным. Ищу попутчика для исследования мира! 🎨✈️",
    interests: ["спорт", "путешествия", "фотография"],
  },
  {
    id: 2,
    name: "Александр",
    age: 27,
    city: "СПб",
    profession: "Инженер",
    distance: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600",
    bio: "Интузиаст технологий днём, любитель спортзала ночью. Всегда готов пробовать новые рестораны и свежие досуг!",
    interests: ["спорт", "музыка", "кино"],
  },
  {
    id: 3,
    name: "Рачель",
    age: 32,
    city: "Казань",
    profession: "Учитель",
    distance: 3,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600",
    bio: "Любительница книг и музыки. Убеждена, что лучшие беседы происходят за кофе и хорошую музыку 📚☕",
    interests: ["музыка", "кино", "путешествия"],
  },
  {
    id: 4,
    name: "Давид",
    age: 30,
    city: "Новосибирск",
    profession: "Повар",
    distance: 4,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600",
    bio: "Профессиональный повар, люблю создавать потрясающие блюда. Ценитель вин и любитель походов по выходным 🍷🥾",
    interests: ["кино", "путешествия", "спорт"],
  },
  {
    id: 5,
    name: "София",
    age: 26,
    city: "Москва",
    profession: "Инструктор по йоге",
    distance: 1,
    image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600",
    bio: "Приверженец осознанности и здоровья. Люблю общаться с природой и находить баланс в жизни 🧘‍♀️🌿",
    interests: ["спорт", "музыка", "путешествия"],
  },
  {
    id: 6,
    name: "Михаил",
    age: 33,
    city: "СПб",
    profession: "Фотограф",
    distance: 7,
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600",
    bio: "Запечатлеваю красивые моменты жизни через свой объектив. Ищу приключения и охочусь за закатами 📸🌅",
    interests: ["фотография", "путешествия", "кино"],
  },
  {
    id: 7,
    name: "Анна",
    age: 24,
    city: "Казань",
    profession: "Студентка",
    distance: 6,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600",
    bio: "Изучаю психологию, люблю танцы и активный отдых. В поисках вдохновения и новых знакомств! 💃📖",
    interests: ["музыка", "спорт", "кино"],
  },
  {
    id: 8,
    name: "Дмитрий",
    age: 35,
    city: "Новосибирск",
    profession: "Врач",
    distance: 8,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600",
    bio: "Спасаю жизни днем, читаю книги вечером. Ценю искренность и глубокие разговоры 🩺📚",
    interests: ["путешествия", "кино", "музыка"],
  },
];

interface Filters {
  city: string;
  ageRange: [number, number];
  interests: string[];
}

export default function Feed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState<number[]>([]);
  const [passes, setPasses] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const [isPrime, setIsPrime] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);
  
  // Состояние фильтров
  const [filters, setFilters] = useState<Filters>({
    city: 'все',
    ageRange: [18, 60],
    interests: []
  });
  
  // Список отфильтрованных профилей
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);

  // Проверка Prime статуса и загрузка фильтров
  useEffect(() => {
    const primeStatus = localStorage.getItem('prime');
    if (primeStatus === 'true') {
      setIsPrime(true);
    }
    
    // Загрузка сохраненных фильтров
    const savedFilters = localStorage.getItem('feedFilters');
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters);
        setFilters(parsedFilters);
      } catch (error) {
        console.error('Ошибка при загрузке фильтров:', error);
      }
    }
  }, []);

  // Фильтрация профилей при изменении фильтров
  useEffect(() => {
    let filtered = [...mockProfiles];

    // Фильтр по городу
    if (filters.city !== 'все') {
      filtered = filtered.filter(profile => profile.city === filters.city);
    }

    // Фильтр по возрасту
    filtered = filtered.filter(profile => 
      profile.age >= filters.ageRange[0] && profile.age <= filters.ageRange[1]
    );

    // Фильтр по интересам (только для Prime пользователей)
    if (isPrime && filters.interests.length > 0) {
      filtered = filtered.filter(profile => 
        filters.interests.some(interest => profile.interests.includes(interest))
      );
    }

    setFilteredProfiles(filtered);
    setCurrentIndex(0); // Сбросить индекс при изменении фильтров
  }, [filters, isPrime]);

  // Сохранение фильтров в localStorage
  useEffect(() => {
    localStorage.setItem('feedFilters', JSON.stringify(filters));
  }, [filters]);

  // Обработчики изменений фильтров
  const updateCityFilter = (city: string) => {
    setFilters(prev => ({ ...prev, city }));
  };

  const updateAgeFilter = (ageRange: [number, number]) => {
    setFilters(prev => ({ ...prev, ageRange }));
  };

  const updateInterestsFilter = (interest: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const currentProfile = filteredProfiles[currentIndex];
  const isFinished = currentIndex >= filteredProfiles.length;
  const noResults = filteredProfiles.length === 0;

  const handleAction = (action: 'like' | 'pass') => {
    if (isAnimating || isFinished) return;

    setIsAnimating(true);
    setAnimationDirection(action === 'like' ? 'right' : 'left');

    if (action === 'like') {
      setLikes(prev => [...prev, currentProfile.id]);
    } else {
      setPasses(prev => [...prev, currentProfile.id]);
    }

    // Увеличиваем счетчик свайпов
    setSwipeCount(prev => prev + 1);

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 300);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setLikes([]);
    setPasses([]);
    setIsAnimating(false);
    setAnimationDirection(null);
  };

  // Состояние "нет результатов"
  if (noResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Знакомства</h1>
            {!isPrime && (
              <p className="text-muted-foreground">
                Поиск с фильтрами
              </p>
            )}
            {isPrime && (
              <p className="text-muted-foreground">
                Безлимитные знакомства ✨
              </p>
            )}
          </div>

          {/* Панель фильтров - та же что и в основном состоянии */}
          <Card className="mb-6 bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">Фильтры поиска</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Город</Label>
                  <Select value={filters.city} onValueChange={updateCityFilter}>
                    <SelectTrigger className="w-full" data-testid="select-city">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city} data-testid={`city-${city}`}>
                          {city === 'все' ? 'Все города' : city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Возраст: {filters.ageRange[0]} - {filters.ageRange[1]} лет
                  </Label>
                  <Slider
                    value={filters.ageRange}
                    onValueChange={updateAgeFilter}
                    min={18}
                    max={60}
                    step={1}
                    className="w-full"
                    data-testid="slider-age"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  Интересы
                  {!isPrime && (
                    <Badge variant="secondary" className="text-xs">
                      <Crown className="w-3 h-3 mr-1" />
                      Prime
                    </Badge>
                  )}
                </Label>
                
                {!isPrime ? (
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Фильтр по интересам доступен в Prime
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.location.href = '/prime'}
                      className="text-xs"
                      data-testid="button-prime-interests"
                    >
                      <Crown className="w-3 h-3 mr-1" />
                      Получить Prime
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {availableInterests.map(interest => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={filters.interests.includes(interest)}
                          onCheckedChange={(checked) => 
                            updateInterestsFilter(interest, checked as boolean)
                          }
                          data-testid={`checkbox-${interest}`}
                        />
                        <Label 
                          htmlFor={`interest-${interest}`} 
                          className="text-sm capitalize cursor-pointer"
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Найдено профилей: <span className="font-medium text-foreground">0</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Сообщение об отсутствии результатов */}
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Никого не найдено
              </h2>
              <p className="text-muted-foreground mb-6">
                Попробуйте изменить параметры поиска или сбросить фильтры
              </p>
            </div>
            <Button 
              onClick={() => setFilters({ city: 'все', ageRange: [18, 60], interests: [] })}
              variant="outline"
              className="px-6"
              data-testid="button-clear-filters"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Вы просмотрели всех пользователей!
            </h2>
            <p className="text-muted-foreground mb-6">
              Отлично! Вы поставили {likes.length} лайков. Новые профили появятся скоро!
            </p>
          </div>
          <Button 
            onClick={resetCards}
            className="btn-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold"
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Начать заново
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Знакомства</h1>
          {!isPrime && (
            <p className="text-muted-foreground">
              {currentIndex + 1} из {filteredProfiles.length}
            </p>
          )}
          {isPrime && (
            <p className="text-muted-foreground">
              Безлимитные знакомства ✨
            </p>
          )}
        </div>

        {/* Панель фильтров */}
        <Card className="mb-6 bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Фильтры поиска</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Фильтр по городу */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Город</Label>
                <Select value={filters.city} onValueChange={updateCityFilter}>
                  <SelectTrigger className="w-full" data-testid="select-city">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city} data-testid={`city-${city}`}>
                        {city === 'все' ? 'Все города' : city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Фильтр по возрасту */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Возраст: {filters.ageRange[0]} - {filters.ageRange[1]} лет
                </Label>
                <Slider
                  value={filters.ageRange}
                  onValueChange={updateAgeFilter}
                  min={18}
                  max={60}
                  step={1}
                  className="w-full"
                  data-testid="slider-age"
                />
              </div>
            </div>

            {/* Фильтр по интересам */}
            <div className="mt-4 space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                Интересы
                {!isPrime && (
                  <Badge variant="secondary" className="text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Prime
                  </Badge>
                )}
              </Label>
              
              {!isPrime ? (
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Фильтр по интересам доступен в Prime
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/prime'}
                    className="text-xs"
                    data-testid="button-prime-interests"
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    Получить Prime
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map(interest => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interest-${interest}`}
                        checked={filters.interests.includes(interest)}
                        onCheckedChange={(checked) => 
                          updateInterestsFilter(interest, checked as boolean)
                        }
                        data-testid={`checkbox-${interest}`}
                      />
                      <Label 
                        htmlFor={`interest-${interest}`} 
                        className="text-sm capitalize cursor-pointer"
                      >
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Показать количество найденных профилей */}
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Найдено профилей: <span className="font-medium text-foreground">{filteredProfiles.length}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prime уведомление */}
        {!isPrime && swipeCount >= 3 && (
          <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800 dark:text-yellow-200">Ограничение свайпов</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                Вы использовали 3 свайпа. С Prime — безлимитные свайпы!
              </p>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                onClick={() => window.location.href = '/prime'}
                data-testid="button-prime-upgrade"
              >
                <Crown className="w-4 h-4 mr-2" />
                Получить Prime
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Card Stack */}
        <div className="relative h-[600px] mb-8">
          {/* Current Card */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ${
              isAnimating 
                ? animationDirection === 'right' 
                  ? 'transform translate-x-full rotate-12 opacity-0' 
                  : 'transform -translate-x-full -rotate-12 opacity-0'
                : 'transform translate-x-0 rotate-0 opacity-100'
            }`}
          >
            <div className="bg-card rounded-2xl card-shadow overflow-hidden h-full">
              <img
                src={currentProfile.image}
                alt={`${currentProfile.name} profile`}
                className="w-full h-2/3 object-cover"
              />
              <div className="p-6 h-1/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {currentProfile.name}, {currentProfile.age}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {currentProfile.profession} • {currentProfile.distance} км
                  </p>
                  <p className="text-foreground text-sm mb-4">
                    {currentProfile.bio}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Card Preview */}
          {currentIndex + 1 < filteredProfiles.length && (
            <div className="absolute inset-0 transform scale-95 -z-10 opacity-50">
              <div className="bg-card rounded-2xl card-shadow overflow-hidden h-full">
                <img
                  src={filteredProfiles[currentIndex + 1].image}
                  alt={`${filteredProfiles[currentIndex + 1].name} profile`}
                  className="w-full h-2/3 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">
                    {filteredProfiles[currentIndex + 1].name}, {filteredProfiles[currentIndex + 1].age}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8">
          <Button
            onClick={() => handleAction('pass')}
            disabled={isAnimating || (!isPrime && swipeCount >= 5)}
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
            data-testid="button-pass"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={() => handleAction('like')}
            disabled={isAnimating || (!isPrime && swipeCount >= 5)}
            size="lg"
            className="w-16 h-16 rounded-full btn-primary text-primary-foreground hover:scale-110 transition-all"
            data-testid="button-like"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>

        {/* Лимит свайпов для не-Prime пользователей */}
        {!isPrime && swipeCount >= 5 && (
          <div className="mt-4 text-center">
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200">
              <CardContent className="p-4 text-center">
                <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Лимит свайпов исчерпан
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  Получите Prime для безлимитных свайпов и расширенных возможностей!
                </p>
                <Button 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  onClick={() => window.location.href = '/prime'}
                  data-testid="button-prime-limit"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Активировать Prime
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress indicator - только для не-Prime пользователей */}
        {!isPrime && (
          <div className="mt-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Прогресс</span>
              <span>{Math.round(((currentIndex + 1) / filteredProfiles.length) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredProfiles.length) * 100}%` }}
              />
            </div>
            
            {/* Счетчик свайпов для не-Prime пользователей */}
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Использовано свайпов</span>
              <span className={swipeCount >= 5 ? "text-red-500 font-semibold" : ""}>
                {swipeCount}/5 {swipeCount >= 5 && "(лимит)"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
