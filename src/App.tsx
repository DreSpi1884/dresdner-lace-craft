import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Contact from "./pages/Contact.tsx";
import Jobs from "./pages/Jobs.tsx";
import NotFound from "./pages/NotFound.tsx";
import Imprint from "./pages/Imprint.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import ApplicantPrivacy from "./pages/ApplicantPrivacy.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/agb" element={<Terms />} />
          <Route path="/bewerber-datenschutz" element={<ApplicantPrivacy />} />

          {/* Legacy URLs from the previous website. These client-side fallbacks
              prevent old search-engine results from ever landing on the 404 page,
              even if an edge redirect is bypassed or cached. */}
          <Route path="/index.php/de" element={<Navigate to="/" replace />} />
          <Route path="/index.php/de/" element={<Navigate to="/" replace />} />
          <Route path="/index.php/en" element={<Navigate to="/" replace />} />
          <Route path="/index.php/en/" element={<Navigate to="/" replace />} />
          <Route path="/index.php/de/unsere-spitze" element={<Navigate to="/services" replace />} />
          <Route path="/index.php/en/our-lace" element={<Navigate to="/services" replace />} />
          <Route path="/index.php/de/unternehmen" element={<Navigate to="/about" replace />} />
          <Route path="/index.php/en/company" element={<Navigate to="/about" replace />} />
          <Route path="/index.php/de/kontakt" element={<Navigate to="/contact" replace />} />
          <Route path="/index.php/en/contact" element={<Navigate to="/contact" replace />} />
          <Route path="/index.php/de/karriere" element={<Navigate to="/jobs" replace />} />
          <Route path="/index.php/en/career" element={<Navigate to="/jobs" replace />} />
          <Route path="/index.php/de/*" element={<Navigate to="/" replace />} />
          <Route path="/index.php/en/*" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics
        beforeSend={(event) => {
          if (typeof window !== "undefined" && localStorage.getItem("ds-analytics-optout") === "1") {
            return null;
          }

          try {
            const url = new URL(event.url);
            url.search = "";
            url.hash = "";
            return { ...event, url: url.toString() };
          } catch {
            return event;
          }
        }}
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
