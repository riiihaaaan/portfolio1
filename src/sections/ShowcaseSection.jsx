import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  const mainProject = projects.find((p) => p.id === "main");
  const secondaryProjects = projects.filter((p) => p.id !== "main");

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img 
                src={mainProject?.imgPath} 
                alt={mainProject?.alt || "Project Image"} 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="text-content">
              <h2>{mainProject?.title}</h2>
              <p className="text-white-50 md:text-xl">
                {mainProject?.description}
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper" style={{ backgroundColor: secondaryProjects[0]?.bgColor || "#FFEFDB" }}>
                <img
                  src={secondaryProjects[0]?.imgPath}
                  alt={secondaryProjects[0]?.alt || "Project Image"}
                />
              </div>
              <h2>{secondaryProjects[0]?.title}</h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper" style={{ backgroundColor: secondaryProjects[1]?.bgColor || "#FFE7EB" }}>
                <img 
                  src={secondaryProjects[1]?.imgPath} 
                  alt={secondaryProjects[1]?.alt || "Project Image"} 
                />
              </div>
              <h2>{secondaryProjects[1]?.title}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
