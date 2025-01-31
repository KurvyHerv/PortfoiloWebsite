import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowDown, FaGithub, FaGlobe } from "react-icons/fa";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [heroComplete, setHeroComplete] = useState(false); // Track Hero completion
  const [textIndex, setTextIndex] = useState(0); // Track current Hero text index
  const [isReturningToHero, setIsReturningToHero] = useState(false);

  const sections = ["hero", "education", "work", "achievements", "projects"];
  const textOptions = [
    { title: "Hey, I'm Hervin", description: "" },
    {
      title: ``,
      description: `I'm a hardworking and driven problem-solver with a talent for creative
      solutions. Eager to tackle challenges, quickly learn new skills and
      develop real world solutions to solve real world problems`,
    },
  ];

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();

      if (currentSection === 0 && !isReturningToHero) {
        if (event.deltaY > 0 && textIndex < textOptions.length - 1) {
          setTextIndex((prev) => prev + 1);
        } else if (event.deltaY < 0 && textIndex > 0) {
          setTextIndex((prev) => prev - 1);
        }

        if (textIndex === textOptions.length - 2 && event.deltaY > 0) {
          setHeroComplete(true);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [textIndex, heroComplete, currentSection, isReturningToHero]);

  // Enable section scrolling after Hero completes
  useEffect(() => {
    if (!heroComplete) return;

    const handleSectionScroll = (event) => {
      event.preventDefault();

      if (event.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));

        // Detect returning to Hero section
        if (currentSection === 1) {
          setHeroComplete(false);
          setTextIndex(textOptions.length - 1);
          setIsReturningToHero(true);
          setTimeout(() => setIsReturningToHero(false), 500);
        }
      }
    };

    window.addEventListener("wheel", handleSectionScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleSectionScroll);
  }, [heroComplete, currentSection]);

  // Scroll to section when `currentSection` changes
  useEffect(() => {
    const targetElement = document.getElementById(sections[currentSection]);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSection]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden min-h-screen bg-gray-800 flex flex-col items-center justify-center">
        <div className="container mx-auto text-center">
          {/* Background SVG */}
          <div className="absolute inset-0 overflow-hidden">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle
                cx={`${115 - (scrollY / window.innerHeight) * 10}%`}
                cy={`${-25 + (scrollY / window.innerHeight) * 25}%`}
                r="35%"
                fill="white"
                fillOpacity="0.05"
                transition={{ ease: "linear", duration: 0.2 }}
              />
              <motion.circle
                cx="90%"
                cy="125%"
                r={`${75 + (scrollY / window.innerHeight) * 10}%`}
                fill="white"
                fillOpacity="0.1"
                transition={{ ease: "linear", duration: 0.2 }}
              />
              <motion.circle
                cx="5%"
                cy="125%"
                r={`${50 + (scrollY / window.innerHeight) * 20}%`}
                stroke="white"
                strokeOpacity="0.2"
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </svg>
          </div>
          {/* Animated Title */}
          <motion.h1
            key={textIndex}
            className="text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {textOptions[textIndex].title}
          </motion.h1>

          {/* Animated Description */}
          {textOptions[textIndex].description && (
            <motion.p
              key={`${textIndex}-desc`}
              className="text-5xl text-white mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {textOptions[textIndex].description}
            </motion.p>
          )}
        </div>

        {/* Scroll Down Indicator */}
        <motion.span
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: textIndex === textOptions.length - 1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaArrowDown size={24} />
        </motion.span>
      </section>

      {/* Education Section */}
      <div id="education" className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">📚Education</h2>
          <p className="text-gray-400 mb-10"></p>

          {/* Education Cards */}
          <div className="space-y-6">
            {[
              {
                title: "Ngee Ann Polytechnic",
                duration: "Apr 2023 - Apr 2026 | Information Technology",
                description: "",
              },
              {
                title: "Institute of Technical Education",
                duration: "Mar 2021 - Mar 2023 | IT Web Application Development",
                description: "",
              },
              {
                title: "Holy Innocents' High School",
                duration: "Jan 2017 - Jan 2021 | GCE N Levels",
                description: "",
              },
            ].map((edu, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
                <h3 className="text-2xl font-bold">{edu.title}</h3>
                <p className="text-gray-400 text-sm">{edu.duration}</p>
                <p className="mt-3">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work Experience Section */}
      <div id="work" className="min-h-screen flex items-center justify-center bg-gray-800 text-white px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">💼 Work Experience</h2>

          {/* Work Experience Cards */}
          <div className="space-y-6">
            {[
              {
                title: "Project Specialist",
                duration: "Sep 2023 - Dec 2024 | Singapore FinTech Association (SFA)",
                description: `As an Project Specialist at SFA, I Maintained and enhanced existing webpages under SFA, ensuring optimal performance and user experience. 
                I also developed new webpages and custom plugins using HubSpot, streamlining operations and improving functionality.`,
              },
              {
                title: "Secretariat",
                duration: "Oct 2022 - Dec 2022 | Singapore FinTech Association (SFA)",
                description: `As a Secretariat at SFA, I Coordinated with companies and individuals under the association to create and manage corporate events,
                partnered with catering providers to plan and oversee food and beverage logistics and organized and managed furniture setups in collaboration with vendors.`,
              },
            ].map((work, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg text-left">
                <h3 className="text-2xl font-bold">{work.title}</h3>
                <p className="text-gray-400 text-sm">{work.duration}</p>
                <p className="mt-3">{work.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div id="achievements" className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">🏆 Achievements</h2>

          <div className="space-y-12">
            {/* Academic Awards */}
            <div className="text-left">
              <h3 className="text-3xl font-bold text-purple-400 mb-4">🎓 Academic Awards</h3>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <ul className="list-disc list-inside text-gray-300">
                  <li>Certificate of Academic Achievement (2022, 2023)</li>
                  <li>Lee Kuan Yew Technology Award – Commendation (2022)</li>
                  <li>Student Commendation Award (2022)</li>
                </ul>
              </div>
            </div>

            {/* Competitions */}
            <div className="text-left">
              <h3 className="text-3xl font-bold text-green-400 mb-4">🏅 Competitions</h3>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <ul className="list-disc list-inside text-gray-300">
                  <li>AISG Student Hackathon – Consolation Award (2021)</li>
                  <li>International Exhibition for Young Inventors – Silver Award (2021)</li>
                  <li>6th Sense Competition – Bronze Award (2021)</li>
                </ul>
              </div>
            </div>

            {/* Leadership */}
            <div className="text-left">
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">👑 Leadership</h3>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <ul className="list-disc list-inside text-gray-300">
                  <li>EAGLES Award for Good Leadership and Service (2022, 2023)</li>
                  <li>Class Chairman (2019-2020)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white px-6 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">🛠️ Projects</h2>
          <p className="text-gray-400 mb-10"></p>

          {/* Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AttendanceGO!",
                tech: "React (TypeScript), Firebase, Express.js, GPT 4o",
                category: "Web App",
                description: "Streamline attendance tracking by incorporating Facial Recognition technology along with additional quality-of-life features.",
                github: "https://github.com/WTH24-DropTable/DropTable-FrontEnd",
                website: "https://devpost.com/software/attendancego",
                image: "AttendanceGO.png",
              },
              {
                title: "Live Chat and AI-Enhanced FAQ",
                tech: "React (JavaScript), Express.js, Supabase, Google Cloud",
                category: "Web App",
                description: "Reducing branch and call center traffic while enhancing and standardizing customer support.",
                github: "https://github.com/Ethan-Chew/Empiler",
                image: "OCBC.jpg",
              },
              {
                title: "Quizzzy",
                tech: "Java, Firebase",
                category: "Mobile Development",
                description: "Quizzzy helps users study for exams with interactive flashcards, making it easier to memorize keywords and concepts.",
                github: "https://github.com/Ethan-Chew/Quizzzy",
                image: "quizzzy.png",
              },
            ].map((project, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                <img src={project.image} alt={project.title} className="w-full rounded-lg mb-4" />

                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-center">{project.title}</h3>
                  <div className="flex justify-center">
                    <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full mt-2">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm text-center mt-2">{project.tech}</p>

                  {/* Fixed Height Description for Consistency */}
                  <p className="mt-3 text-center min-h-[64px]">
                    {project.description}
                  </p>
                </div>

                {/* Button Section - Ensures Alignment */}
                <div className="flex justify-left gap-4 mt-6">
                  {project.github && (
                    <a href={project.github} className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 flex items-center gap-2 text-lg">
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {project.website && (
                    <a href={project.website} className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 flex items-center gap-2 text-lg">
                      <FaGlobe /> Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;