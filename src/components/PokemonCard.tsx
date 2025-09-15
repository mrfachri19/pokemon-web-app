import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface PokemonCardProps {
  name: string;
  image: string;
}

export default function PokemonCard({ name, image }: PokemonCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center"
    >
      <img
        src={image || "https://via.placeholder.com/100x100?text=No+Image"}
        alt={name}
        className="w-24 h-24 object-contain"
      />
      <h3 className="mt-2 text-lg font-semibold capitalize">{name}</h3>
      <Link
        to={`/pokemon/${name}`}
        className="mt-3 px-4 py-2 text-sm bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
      >
        Detail
      </Link>
    </motion.div>
  );
}
