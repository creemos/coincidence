import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type TestAnswers } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    id: "q1",
    question: "Что для вас самое важное в отношениях?",
    options: [
      { value: "trust", label: "Доверие и честность" },
      { value: "communication", label: "Открытое общение" },
      { value: "adventure", label: "Совместные приключения" },
      { value: "stability", label: "Эмоциональная стабильность" },
    ],
  },
  {
    id: "q2",
    question: "Как вы предпочитаете проводить выходные?",
    options: [
      { value: "outdoors", label: "Активности на свежем воздухе и природа" },
      { value: "home", label: "Уютное время дома" },
      { value: "social", label: "Социальные мероприятия и вечеринки" },
      { value: "culture", label: "Музеи и культурные мероприятия" },
    ],
  },
  {
    id: "q3",
    question: "Каково ваше идеальное первое свидание?",
    options: [
      { value: "coffee", label: "Кофе и беседа" },
      { value: "dinner", label: "Романтический ужин" },
      { value: "activity", label: "Веселое занятие вместе" },
      { value: "walk", label: "Прогулка в парке" },
    ],
  },
  {
    id: "q4",
    question: "Насколько важна для вас семья?",
    options: [
      { value: "very", label: "Очень важна" },
      { value: "important", label: "Важна" },
      { value: "somewhat", label: "В некоторой степени важна" },
      { value: "not", label: "Не очень важна" },
    ],
  },
  {
    id: "q5",
    question: "Каков ваш стиль общения?",
    options: [
      { value: "direct", label: "Прямой и откровенный" },
      { value: "thoughtful", label: "Вдумчивый и осторожный" },
      { value: "emotional", label: "Эмоциональный и выразительный" },
      { value: "analytical", label: "Аналитический и логичный" },
    ],
  },
];

export default function Test() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<TestAnswers>>({});
  const { toast } = useToast();

  const totalQuestions = questions.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    const questionId = currentQuestionData.id as keyof TestAnswers;
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const onSubmit = async () => {
    try {
      // Check if all questions are answered
      if (Object.keys(answers).length < totalQuestions) {
        toast({
          title: "Тест не завершён",
          description: "Пожалуйста, ответьте на все вопросы перед отправкой.",
          variant: "destructive",
        });
        return;
      }

      console.log("Test answers:", answers);
      toast({
        title: "Тест завершён!",
        description: "Ваш тест на совместимость был отправлен.",
      });
      setLocation("/results");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить тест. Пожалуйста, попробуйте ещё раз.",
        variant: "destructive",
      });
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id as keyof TestAnswers];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Вопрос {currentQuestion + 1} из {totalQuestions}</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        
        <Card className="card-shadow">
          <CardContent className="p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {currentQuestionData.question}
              </h2>
              
              <RadioGroup
                key={currentQuestionData.id}
                value={currentAnswer}
                onValueChange={handleAnswerChange}
                className="space-y-4"
                data-testid={`radiogroup-${currentQuestionData.id}`}
              >
                {currentQuestionData.options.map((option) => {
                  const optionId = `${currentQuestionData.id}-${option.value}`;
                  return (
                    <div key={option.value} className="flex items-center p-4 border border-border rounded-xl hover:bg-muted/50 cursor-pointer transition-all">
                      <RadioGroupItem
                        value={option.value}
                        id={optionId}
                        className="mr-4"
                        data-testid={`radio-${option.value}`}
                      />
                      <Label htmlFor={optionId} className="text-foreground cursor-pointer flex-1">
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
              
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="px-6 py-3 rounded-xl"
                  style={{ visibility: currentQuestion === 0 ? 'hidden' : 'visible' }}
                  data-testid="button-previous"
                >
                  Назад
                </Button>
                
                <div className="flex-1" />
                
                {currentQuestion < totalQuestions - 1 ? (
                  <Button
                    type="button"
                    onClick={nextQuestion}
                    className="px-6 py-3 btn-primary text-primary-foreground rounded-xl font-semibold"
                    data-testid="button-next"
                  >
                    Далее
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={onSubmit}
                    className="px-6 py-3 btn-primary text-primary-foreground rounded-xl font-semibold"
                    data-testid="button-finish"
                  >
                    Посмотреть результаты
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
