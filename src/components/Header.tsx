import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Pocket Monster
        </Link>
        <nav className="space-x-3 opacity-90">
          <Link to="/" className="hover:underline">
            List
          </Link>
        </nav>
      </div>
    </header>
  );
}
