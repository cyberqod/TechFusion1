
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PDFMerger from "./pages/PDFMerger";
import QRGenerator from "./pages/QRGenerator";
import ImageOptimizer from "./pages/ImageOptimizer";
import DataConverter from "./pages/DataConverter";
import PerformanceAnalyzer from "./pages/PerformanceAnalyzer";
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
          <Route path="/pdf-merger" element={<PDFMerger />} />
          <Route path="/qr-generator" element={<QRGenerator />} />
          <Route path="/image-optimizer" element={<ImageOptimizer />} />
          <Route path="/data-converter" element={<DataConverter />} />
          <Route path="/performance-analyzer" element={<PerformanceAnalyzer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
