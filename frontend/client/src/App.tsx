import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import Test from "@/pages/test";
import Results from "@/pages/results";
import Feed from "@/pages/feed";
import Chats from "@/pages/chats";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import Prime from "@/pages/Prime";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Публичные маршруты */}
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      
      {/* Защищённые маршруты */}
      <Route path="/test">
        <PrivateRoute>
          <Test />
        </PrivateRoute>
      </Route>
      <Route path="/results">
        <PrivateRoute>
          <Results />
        </PrivateRoute>
      </Route>
      <Route path="/feed">
        <PrivateRoute>
          <Feed />
        </PrivateRoute>
      </Route>
      <Route path="/chats">
        <PrivateRoute>
          <Chats />
        </PrivateRoute>
      </Route>
      <Route path="/chat/:id">
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      </Route>
      <Route path="/profile">
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </Route>
      <Route path="/prime">
        <PrivateRoute>
          <Prime />
        </PrivateRoute>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <Toaster />
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
