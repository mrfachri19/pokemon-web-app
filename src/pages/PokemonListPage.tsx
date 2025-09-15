import { useState } from "react";
import { motion } from "framer-motion";
import PokemonCard from "../components/PokemonCard";
import { useFetchPokemon } from "../hooks/use-fetch-pokemon";

export default function PokemonListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 12;

  const {
    data: dataPokemon,
    error,
    isLoading,
  } = useFetchPokemon(
    {
      limit: limit,
      offset: (page - 1) * limit,
    },
    !!page
  );

  const filtered = dataPokemon?.results?.filter((p) =>
    p.name.includes(search.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="p-6 text-center animate-pulse">Loading Pokémon...</div>
    );
  if (error) return <div className="p-6 text-red-500">Error: Err request from api</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 px-5 py-2 rounded-full border-2 border-blue-400 focus:border-yellow-400 
               focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
        />
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
      >
        {filtered?.map((p, idx) => (
          <PokemonCard
            key={idx}
            name={p.name}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              p.url.split("/").slice(-2, -1)[0]
            }.png`}
          />
        ))}
      </motion.div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 
               text-white font-medium shadow-md transition-all
               hover:from-blue-600 hover:to-indigo-600
               disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅ Prev
        </button>

        <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow-inner">
          Page <span className="text-blue-600">{page}</span> /
          <span className="text-blue-600">
            {Math.ceil(dataPokemon?.count ?? 0 / limit)}
          </span>
        </span>
        <button
          disabled={page === Math.ceil(dataPokemon?.count ?? 0 / limit)}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 
               text-white font-medium shadow-md transition-all
               hover:from-blue-600 hover:to-indigo-600
               disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
