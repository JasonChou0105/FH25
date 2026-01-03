import { scrollFromNavbar } from "../../hooks/useHorizontalScroll";

export default function Navbar() {
  const scrollToVH = (vh) => {
    scrollFromNavbar(vh);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex gap-6 p-4 text-white bg-black/50 backdrop-blur-md text-lg">
      <button
        onClick={() => scrollToVH(0)}
        className="hover:text-blue-400 transition-colors"
      >
        Home
      </button>
      <button
        onClick={() => scrollToVH(100)}
        className="hover:text-blue-400 transition-colors"
      >
        Intro
      </button>
      <button
        onClick={() => scrollToVH(200)}
        className="hover:text-blue-400 transition-colors"
      >
        Recap
      </button>
      <button
        onClick={() => scrollToVH(400)}
        className="hover:text-blue-400 transition-colors"
      >
        FAQ
      </button>
      <button
        onClick={() => scrollToVH(500)}
        className="hover:text-blue-400 transition-colors"
      >
        Sponsors
      </button>
    </nav>
  );
}
