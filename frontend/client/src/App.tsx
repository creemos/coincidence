import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/test" component={Test} />
      <Route path="/results" component={Results} />
      <Route path="/feed" component={Feed} />
      <Route path="/chats" component={Chats} />
      <Route path="/chat/:id" component={Chat} />
      <Route path="/profile" component={Profile} />
      <Route path="/prime" component={Prime} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
