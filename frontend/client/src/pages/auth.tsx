import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema, type SignInData, type SignUpData } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, login } = useAuth();

  // Редирект для уже авторизованных пользователей
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/profile");
    }
  }, [isAuthenticated, setLocation]);

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: '',
      surname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSignIn = async (data: SignInData) => {
    try {
        const response = await fetch(`/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          const errorMessage = result.message || 'Не удалось авторизоваться. Попробуйте снова.';
          toast({
            title: "Ошибка",
            description: errorMessage,
            variant: "destructive",
          });
          return;
        }

        const { token } = result;

        if (!token) {
          throw new Error('Токен не получен');
        }

        // Используем метод login из AuthContext
        login(token);

        toast({
          title: "Успешно",
          description: "Вы вошли!",
        });

        setLocation("/profile");

      } catch (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось подключиться к серверу. Попробуйте позже.",
          variant: "destructive",
        });
      }
  };

  const onSignUp = async (data: SignUpData) => {
    try {
        const response = await fetch(`/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          const errorMessage = result.message || 'Не удалось создать аккаунт. Попробуйте снова.';
          toast({
            title: "Ошибка",
            description: errorMessage,
            variant: "destructive",
          });
          return;
        }

        const { token } = result;

        if (!token) {
          throw new Error('Токен не получен');
        }

        // Используем метод login из AuthContext
        login(token);

        toast({
          title: "Успешно",
          description: "Аккаунт создан!",
        });

        setLocation("/profile");

      } catch (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось подключиться к серверу. Попробуйте позже.",
          variant: "destructive",
        });
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 bg-pattern flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="card-shadow card-hover border-primary/20" style={{ background: 'rgba(248, 222, 197, 0.35)', backdropFilter: 'blur(10px)' }}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="relative">
                <Heart className="w-10 h-10 text-primary mx-auto mb-4 animate-pulse-slow" />
                <div className="absolute inset-0 w-10 h-10 mx-auto animate-ping">
                  <Heart className="w-10 h-10 text-primary/30" />
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">Добро пожаловать</h2>
              <p className="text-muted-foreground">Войдите, чтобы продолжить своё путешествие ✨</p>
            </div>

            <div className="flex space-x-2 mb-6">
              <Button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 ${!isSignUp ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                data-testid="button-signin-tab"
              >
                Войти
              </Button>
              <Button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 ${isSignUp ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                data-testid="button-signup-tab"
              >
                Регистрация
              </Button>
            </div>

            {!isSignUp ? (
              <Form {...signInForm}>
                <form key="signin" onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4" data-testid="form-signin">
                  <FormField
                    control={signInForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Имя пользователя"
                            type="text"
                            className="p-4 rounded-xl input-focus border-2"
                            data-testid="input-username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Пароль"
                            type="password"
                            className="p-4 rounded-xl input-focus border-2"
                            data-testid="input-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full btn-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg card-hover"
                    data-testid="button-signin-submit"
                  >
                    Войти ✨
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...signUpForm}>
                <form key="signup" onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4" data-testid="form-signup">
                  <FormField
                    control={signUpForm.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Имя"
                            className="p-4 rounded-xl input-focus border-2"
                            data-testid="input-firstname"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                      control={signUpForm.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Фамилия"
                              className="p-4 rounded-xl input-focus border-2"
                              data-testid="input-surname"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  <FormField
                    control={signUpForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Имя пользователя"
                            className="p-4 rounded-xl input-focus border-2"
                            data-testid="input-username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Адрес эл. почты"
                            type="email"
                            className="p-4 rounded-xl input-focus border-2"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Пароль"
                            type="password"
                            className="p-4 rounded-xl input-focus border-2"
                            data-testid="input-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Подтвердите пароль"
                            type="password"
                            className="p-4 rounded-xl input-focus border-2"
                            data-testid="input-confirm-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full btn-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg card-hover"
                    data-testid="button-signup-submit"
                  >
                    Зарегистрироваться ✨
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Продолжая, вы соглашаетесь с нашими{" "}
                <a href="#" className="text-primary hover:underline">
                  Условиями использования
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}