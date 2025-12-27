import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll";
import GlassContainer from "./GlassContainer";

function RecapProjects() {
    const { horizontalOffset } = useHorizontalScroll(false);
    const translateX = horizontalOffset * 50;

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
        },
        {
            image: "/images/Projects/FraserhacksTamoTeach.png",
            makerName: "Creator Name",
            projectName: "TamoTeach"
        }
    ];

    return (
        <div className="flex flex-col justify-start items-center min-h-screen gap-6 relative p-8 w-3/4 pt-8"
            style={{ transform: `translateX(${translateX}px) translateY(-${150}px)` }}
        >
            {/* Section 1: Large wide rectangular box on top - Intro to Projects */}
            <div className="relative z-10 w-1/2">
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

            {/* Bottom section: Grid of project cards */}
            <div className="grid grid-cols-1 gap-6 w-full relative">
                {projects.map((project, index) => (
                    <GlassContainer 
                        key={index}
                        translateX={translateX * 0.1} 
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
                ))}
            </div>
            </div>
        </div>
    );
}

export default RecapProjects;

