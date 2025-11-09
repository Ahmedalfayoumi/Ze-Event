import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";
import Auth from "./pages/Auth";
import ProposalSelection from "./pages/ProposalSelection";
import ControlPanel from "./pages/ControlPanel";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPages from "./pages/admin/AdminPages";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/proposal-selection" element={<ProposalSelection />} />
            <Route path="/control-panel" element={<ControlPanel />}>
              <Route index element={<AdminDashboard />} /> {/* Default route for /control-panel */}
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;