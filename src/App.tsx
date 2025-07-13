import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BrowseCourses from "./pages/BrowseCourses";
import BrowseProfessors from "./pages/BrowseProfessors";
import CourseDetail from "./pages/CourseDetail";
import ProfessorDetail from "./pages/ProfessorDetail";
import SubmitReview from "./pages/SubmitReview";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse-courses" element={<BrowseCourses />} />
          <Route path="/browse-profs" element={<BrowseProfessors />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/professor/:name" element={<ProfessorDetail />} />
          <Route path="/submit-review" element={<SubmitReview />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
