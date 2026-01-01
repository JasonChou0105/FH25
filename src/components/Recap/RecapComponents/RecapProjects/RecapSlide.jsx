import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import GlassContainer from "./GlassContainer";

function NavigationButtons({ swiperRef }) {
  return (
    <>
      <button
        className="swiper-nav-button swiper-nav-button-prev"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="swiper-nav-button swiper-nav-button-next"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
      >
        ›
      </button>
    </>
  );
}

function RecapSlide({ projects, swiperRef, swiperWrapperRef, translateX }) {
  return (
    <div
      className="w-full relative"
      style={{
        transform: `translateX(${translateX * 0.1}px)`,
        pointerEvents: "auto",
        overflow: "visible",
      }}
    >
      <div
        ref={swiperWrapperRef}
        className="swiper-wrapper-custom"
        style={{ position: "relative", overflow: "visible" }}
      >
        <div style={{ position: "relative" }}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            slidesPerView={1}
            slidesPerGroup={1}
            watchOverflow={true}
            allowTouchMove={false}
            speed={600}
            pagination={{ clickable: true }}
            className="project-swiper"
            style={{ position: "relative", zIndex: 100, overflow: "hidden" }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <GlassContainer
                  translateX={0}
                  className="relative z-20 flex flex-row py-8 px-16"
                >
                  <div className="pr-4 flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.projectName}
                      className="object-cover rounded-lg h-48 w-64"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2 flex-1">
                    <div className="text-xl font-bold text-white">
                      {project.projectName}
                    </div>
                    <div className="text-base opacity-70 text-white">
                      {project.makerName}
                    </div>
                  </div>
                </GlassContainer>
              </SwiperSlide>
            ))}
          </Swiper>
          <NavigationButtons swiperRef={swiperRef} />
        </div>
      </div>
    </div>
  );
}

export default RecapSlide;
