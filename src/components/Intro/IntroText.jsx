import ThreeDImage from "../3dAssets/ThreeDImage";

export default function IntroText() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col relative w-1/4">
          <div className="text-white text-4xl flex flex-col mb-12">
            Welcome to the{" "}
            <div className="text-7xl font-bold text-shadow-2xs tracking-widest">
              Largest
            </div>
            Peel Hackathon
          </div>
          <div className="text-gray-300 text-base leading-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            praesentium ex dolor possimus dolores aliquid, similique sunt
            inventore odit, consectetur magni! Ipsa beatae distinctio id soluta
            cupiditate laudantium iusto voluptas. Quae magnam eligendi
            perferendis quam saepe non aliquam,
          </div>
        </div>

        {/* Photobooth stack */}
        <div className="relative h-[28rem] w-[32rem]">
          {/* 1) Left */}
          <img
            src="/images/FH24_1.jpeg"
            alt="Photobooth 1"
            className="
              absolute top-6 left-1/2 -translate-x-[70%]
              w-52 sm:w-56 md:w-64 aspect-[3/4] object-cover
              bg-white p-2 rounded-lg shadow-2xl ring-1 ring-black/10
              -rotate-6 z-30
            "
          />
          {/* 2) Right (overlapping) */}
          <img
            src="/images/FH24_2.jpeg"
            alt="Photobooth 2"
            className="
              absolute top-16 left-1/2 translate-x-[10%]
              w-52 sm:w-56 md:w-64 aspect-[3/4] object-cover
              bg-white p-2 rounded-lg shadow-2xl ring-1 ring-black/10
              rotate-3 z-20
            "
          />
          {/* 3) Left (overlapping further) */}
          <img
            src="/images/FH24_3.jpeg"
            alt="Photobooth 3"
            className="
              absolute top-24 left-1/2 -translate-x-[85%]
              w-52 sm:w-56 md:w-64 aspect-[3/4] object-cover
              bg-white p-2 rounded-lg shadow-2xl ring-1 ring-black/10
              -rotate-1 z-10
            "
          />
        </div>
      </div>
    </div>
  );
}
