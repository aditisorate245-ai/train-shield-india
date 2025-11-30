import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MobileApp from "./pages/MobileApp";
import NotFound from "./pages/NotFound";
import PartnerView from "./pages/PartnerView";
import NotAuthorized from "./pages/NotAuthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import CreateTraining from "./pages/CreateTraining";
import ParticipantDashboard from "./pages/ParticipantDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-training" 
            element={
              <ProtectedRoute>
                <CreateTraining />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant-dashboard" 
            element={
              <ProtectedRoute>
                <ParticipantDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/mobile" element={<MobileApp />} />
          <Route path="/partner-view" element={<PartnerView />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/signin" element={<SignIn />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL \"*\" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
