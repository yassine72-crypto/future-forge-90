import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Formations from "./pages/Formations";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Some preview hosts serve the app under a path prefix (e.g. /future-forge-90/).
// Treat any first path segment that is not a known route as that prefix.
const KNOWN_ROUTES = ["formations", "evenements", "galerie", "auth", "admin"];
const firstSegment = window.location.pathname.split("/")[1] ?? "";
const routerBasename =
  firstSegment && !KNOWN_ROUTES.includes(firstSegment) ? `/${firstSegment}` : "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={routerBasename}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/evenements" element={<Events />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;