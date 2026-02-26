import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import Emergency from "./pages/Emergency";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./pages/admin/Dashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import ConversationsMonitor from "./pages/admin/ConversationsMonitor";
import EmergenciesManagement from "./pages/admin/EmergenciesManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Mobile */}
          <Route path="/" element={<HomePage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Admin */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<UsersManagement />} />
          <Route path="/admin/conversations" element={<ConversationsMonitor />} />
          <Route path="/admin/emergencies" element={<EmergenciesManagement />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
