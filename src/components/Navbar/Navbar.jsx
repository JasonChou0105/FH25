import { scrollFromNavbar } from "../../hooks/useHorizontalScroll";
import GlassContainer from "../Recap/RecapComponents/RecapProjects/GlassContainer";

function NavItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative font-semibold tracking-tight"
    >
      {/* shadow stays in the original position */}
      <span
        className="pointer-events-none absolute inset-0 -z-10
                   opacity-0 transition-opacity duration-200 ease-out
                   group-hover:opacity-100
                   text-fuchsia-800
                    group-hover:text-xl"
        style={{
          textShadow: `
            0 0 14px rgba(217,70,239,0.6),
            0 0 34px rgba(217,70,239,0.45),
            0 0 70px rgba(168,85,247,0.35)
          `,
        }}
      >
        {label}
      </span>

      {/* main text moves up on hover */}
      <span
        className="relative inline-block transition-all duration-200 ease-out
                   group-hover:-translate-y-[4px]
                   group-hover:-translate-x-[-4px]
                   group-hover:text-xl
                   group-hover:text-transparent group-hover:bg-clip-text
                   group-hover:bg-gradient-to-r group-hover:from-blue-100
                   group-hover:via-fuchsia-300 group-hover:to-purple-500"
      >
        {label}
      </span>
    </button>
  );
}

export default function Navbar() {
  const scrollToVH = (vh) => scrollFromNavbar(vh);

  return (
    <div className="flex flex-row justify-center items-center w-full">
      <GlassContainer className="flex justify-between items-center w-4/5 mt-8 z-50 py-4 px-16 text-white text-lg">
        <NavItem label="Home" onClick={() => scrollToVH(0)} />

        <div className="flex flex-row items-center justify-center gap-6">
          <NavItem label="Intro" onClick={() => scrollToVH(100)} />
          <NavItem label="Recap" onClick={() => scrollToVH(200)} />
          <NavItem label="FAQ" onClick={() => scrollToVH(400)} />
          <NavItem label="Sponsors" onClick={() => scrollToVH(500)} />
        </div>
      </GlassContainer>
    </div>
  );
}
