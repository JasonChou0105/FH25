import { useEffect, useRef } from 'react';
import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll";
import GlassContainer from "./GlassContainer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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

function RecapProjects() {
    const { horizontalOffset } = useHorizontalScroll(false);
    const translateX = horizontalOffset * 50;
    const swiperWrapperRef = useRef(null);
    const swiperRef = useRef(null);

    // Intro section data
    const introData = {
        image: "/images/FH24_3.jpeg",
        title: "Featured Projects",
        description: "Explore the innovative projects created during this hackathon. Each project represents creativity, dedication, and technical excellence."
    };

    // Projects data
    const projects = [
        {
            image: "/images/Projects/FraserhacksRhythmConductor.jpg",
            makerName: "Yang Xue",
            projectName: "RhythmConductor"
        },
        {
            image: "/images/Projects/FraserhacksLogicraft.png",
            makerName: "Creator Name",
            projectName: "Logicraft"
        },
        {
            image: "/images/Projects/FraserhacksMartialVision.jpg",
            makerName: "Creator Name",
            projectName: "MartialVision"
        }
    ];

    useEffect(() => {
        if (swiperWrapperRef.current) {
            swiperWrapperRef.current.style.setProperty('--swiper-navigation-color', '#ffffff');
            swiperWrapperRef.current.style.setProperty('--swiper-pagination-color', '#ffffff');
            swiperWrapperRef.current.style.setProperty('--swiper-navigation-size', '24px');
        }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-6 w-1/2"
            style={{ transform: `translateX(${translateX}px) translateY(-${150}px)` }}
        >
            {/* Section 1: Large wide rectangular box on top - Intro to Projects */}
            <div className="z-10 w-2/3">
            <GlassContainer 
                translateX={translateX * 0.1} 
                className="p-6 mb-6 relative z-10 flex flex-row"
            >
                <img 
                    src={introData.image} 
                    alt="Projects Intro"
                    className="object-cover rounded-lg h-64 w-64"
                />
                <div className="flex flex-col h-64 pl-8 justify-center text-white flex-1 pr-8">
                    <div className="text-3xl font-bold mb-3">{introData.title}</div>
                    <div className="text-base opacity-70 leading-6">{introData.description}</div>
                </div>
            </GlassContainer>

            {/* Bottom section: Slideshow of project cards */}
            <div className="w-full relative" style={{ transform: `translateX(${translateX * 0.1}px)`, pointerEvents: 'auto', overflow: 'visible' }}>
                <div ref={swiperWrapperRef} className="swiper-wrapper-custom" style={{ position: 'relative', overflow: 'visible' }}>
                    <div style={{ position: 'relative' }}>
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            modules={[Pagination, EffectFade]}
                            effect="fade"
                            fadeEffect={{
                                crossFade: true
                            }}
                            slidesPerView={1}
                            slidesPerGroup={1}
                            watchOverflow={true}
                            allowTouchMove={false}
                            speed={600}
                            pagination={{ clickable: true }}
                            className="project-swiper"
                            style={{ position: 'relative', zIndex: 100, overflow: 'hidden' }}
                        >
                            {projects.map((project, index) => (
                                <SwiperSlide key={index}>
                                    <GlassContainer 
                                        translateX={0}
                                        className="relative z-20 flex flex-row p-4"
                                    >
                                        <div className="pr-4 flex-shrink-0">
                                            <img 
                                                src={project.image} 
                                                alt={project.projectName}
                                                className="object-cover rounded-lg h-48 w-64"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center gap-2 flex-1">
                                            <div className="text-xl font-bold text-white">{project.projectName}</div>
                                            <div className="text-base opacity-70 text-white">{project.makerName}</div>
                                        </div>
                                    </GlassContainer>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <NavigationButtons swiperRef={swiperRef} />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default RecapProjects;

