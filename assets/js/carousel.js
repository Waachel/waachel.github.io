import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const projects = [
    {
      title: "Game Engine Development",
      description: "Custom graphics and physics engine with DirectX and OpenGL",
      image: "/assets/img/Game Engine.png"
    },
    {
      title: "C.L.E.A.R. F.A.C.T.O.R.Y.",
      description: "First-person recycling simulation game built in Unity",
      image: "/assets/img/ClearFactory.png"
    },
    {
      title: "Real-time Audio Engine",
      description: "Advanced multithreaded audio system with XAudio2",
      image: "/assets/img/AudioEngine.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 relative">
      <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              transform: `translateX(${100 * (index - currentSlide)}%)`
            }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;