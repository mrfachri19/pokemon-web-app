import { useParams, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useGetOnePokemon } from "../hooks/use-get-one-pokemon";

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, error } = useGetOnePokemon((name ?? "") as string);

  if (isLoading)
    return (
      <div className="p-6 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-48 w-48 bg-gray-200 rounded-xl"></div>
      </div>
    );

  if (error) return <div className="p-6 text-red-500">Err from api</div>;
  if (!data) return <div className="p-6">No data</div>;

  const image =
    data.sprites.front_default ||
    data.sprites.front_shiny ||
    "https://via.placeholder.com/150x150?text=No+Image";

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to list
      </Link>

      <div className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center">
          <img
            src={image}
            alt={data.name}
            className="w-48 h-48 object-contain"
          />
          <h1 className="text-2xl font-bold capitalize mt-4">{data.name}</h1>
        </div>

        <div>
          <p>
            <span className="font-semibold">Height:</span> {data.height}
          </p>
          <p>
            <span className="font-semibold">Species:</span> {data.species.name}
          </p>

          <p className="mt-2 font-semibold">Abilities:</p>
          <ul className="list-disc ml-6">
            {data.abilities.map((a, i) => (
              <li key={i} className="capitalize">
                {a.ability.name}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Stats</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                layout="vertical"
                data={data.stats.map((s) => ({
                  name: s.stat.name,
                  value: s.base_stat,
                }))}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  width={120}
                  type="category"
                  tickFormatter={(value: string) =>
                    value.charAt(0).toUpperCase() + value.slice(1)
                  }
                />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
