export default function TitleMain() {
  return (
    <div className="relative mt-54 ml-48 text-white">
      <span
        className="absolute inset-0 text-8xl font-bold tracking-tight
               text-fuchsia-800
               -z-10
               translate-x-[-6px] translate-y-[6px]"
        style={{
          textShadow: `
        0 0 14px rgba(217,70,239,0.6),
        0 0 34px rgba(217,70,239,0.45),
        0 0 70px rgba(168,85,247,0.35)
      `,
        }}
      >
        FraserHacks26
      </span>
      <h1 className="text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-fuchsia-300 to-purple-500 ">
        FraserHacks26
      </h1>
      <div className="text-2xl">
        <div>December 12-14, 2025 • In-person event</div>
        <div className="flex flex-row">
          <div className="font-black mr-2">Largest</div>
          <div>mississuaga highschool hackathon</div>
        </div>
      </div>
    </div>
  );
}
