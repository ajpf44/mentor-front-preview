
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import UniversalLogin from "./pages/UniversalLogin";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages for better performance
const Mentors = lazy(() => import("./pages/Mentors"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const MentorDashboard = lazy(() => import("./pages/MentorDashboard"));
const MentorProfile = lazy(() => import("./pages/MentorProfile"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={
              <div className="w-full h-[70vh] flex items-center justify-center">
                <div className="animate-pulse text-neki-blue">Carregando...</div>
              </div>
            }>
              <Routes>
                <Route path="/login" element={<UniversalLogin />} />
                <Route path="/home" element={<Index />} />
                <Route path="/mentores" element={<Mentors />} />
                <Route path="/agendar" element={<Schedule />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/mentor-dashboard" element={<MentorDashboard />} />
                <Route path="/mentor-profile" element={<MentorProfile />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
