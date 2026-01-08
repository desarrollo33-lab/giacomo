/**
 * App Component
 * DCR Motors - Giacomo Project
 * 
 * Main application component with routing configuration
 */

import { Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* TODO: Add more routes as they are created */}
      {/* <Route path="/collection" element={<Collection />} /> */}
      {/* <Route path="/raffles" element={<Raffles />} /> */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      
      {/* Catch-all route must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
