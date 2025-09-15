import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
            <Route
              path="*"
              element={<main className="container p-6">Not found</main>}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
