import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll";
import GlassContainer from "./GlassContainer";

function RecapProjects() {
    const { horizontalOffset } = useHorizontalScroll(false);
    const translateX = horizontalOffset * 50;

    // Example project data - replace with real data
    const project = {
        image: "/images/FH24_1.jpeg",
        makerName: "John Doe",
        projectName: "Awesome Project",
        devpostUrl: "https://devpost.com/software/awesome-project",
        description: "An innovative solution that solves real-world problems using cutting-edge technology. Built during the hackathon with passion and dedication.",
        makerInfo: "Computer Science student passionate about web development and AI. Loves building projects that make a difference.",
        quote: "\"This hackathon was an incredible experience! I learned so much and met amazing people. The atmosphere was electric and the projects were inspiring.\""
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 relative p-8 w-1/3"
            style={{ transform: `translateY(-200px) translateX(${translateX}px)` }}
        >
            {/* Section 1: Large wide rectangular box on top - Image, Maker Name, Project Name, Devpost Button */}
            <GlassContainer 
                translateX={translateX * 0.1} 
                className="p-6 relative z-10 flex flex-row "
            >
                <img 
                        src={project.image} 
                        alt={project.projectName}
                        className="object-cover rounded-lg h-64"
                />
                <div className="flex flex-col h-64 pl-8 relative">
                    {/* Image on the left */}
    
                    
                    {/* Project name, maker name, and description stacked */}
                    <div className="flex flex-col justify-center text-white flex-1 pr-8">
                        <div className="text-3xl font-bold mb-2">{project.projectName}</div>
                        <div className="text-lg opacity-70 mb-3">{project.makerName}</div>
                        <div className="text-base opacity-70 leading-6">{project.description}</div>
                    </div>

                    {/* Small Devpost button on bottom right */}
                    <div>
                        <a
                            href={project.devpostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-2 text-sm bg-white/20 hover:bg-white/30 rounded-lg border border-white/30 transition-all duration-200 text-white font-semibold"
                        >
                            Devpost →
                        </a>
                    </div>
                </div>
               
            </GlassContainer>

            {/* Bottom row: Two boxes side by side, together equaling top box width */}
            <div className="flex gap-6 relative">
                {/* Section 2: Left box - About the Maker */}
                <GlassContainer 
                    translateX={(translateX * 0.1)} 
                    className="flex-1 px-6 py-4 relative z-20"
                >
                    <div className="text-xl font-bold text-white mb-3">About the Maker</div>
                    <div className="text-lg text-white leading-8 opacity-70">
                        {project.makerInfo}
                    </div>
                </GlassContainer>

                {/* Section 3: Right box - Quote from Maker */}
                <GlassContainer 
                    translateX={(translateX * 0.1)} 
                    className="flex-1 px-5 py-4 relative z-30"
                >
                    <div className="text-xl font-bold text-white mb-3">Maker's Reflection</div>
                    <div className="text-lg text-white leading-8 opacity-70 italic">
                        {project.quote}
                    </div>
                </GlassContainer>
            </div>
        </div>
    );
}

export default RecapProjects;

