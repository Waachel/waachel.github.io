const ProjectCarousel = {
  currentSlide: 0,
  projects: [
    {
      title: "File Processing Pipeline",
      image: "/assets/img/FileProcessing.png",
      id: "file-processing-project"
    },
    {
      title: "C.L.E.A.R. F.A.C.T.O.R.Y.",
      image: "/assets/img/ClearFactoryBackground.png",
      id: "clear-factory-project"
    },
    {
      title: "Omega Race",
      image: "/assets/img/OmegaRace3.png",
      id: "omega-race-project"
    },
    {
      title: "Hybrid Game Engine",
      image: "/assets/img/Game Engine.png",
      id: "game-engine-project"
    },
    {
      title: "Model & Animation Pipeline",
      image: "/assets/img/ModelandAnimation.png",
      id: "model-animation-project"
    },
    {
      title: "Custom Graphics Engine",
      image: "/assets/img/GraphicsEngine.png",
      id: "graphics-engine-project"
    },
    {
      title: "Real-time Audio Engine",
      image: "/assets/img/AudioEngine.png",
      id: "audio-engine-project"
    },
    {
      title: "Dots and Boxes Game",
      image: "/assets/img/DotsAndBoxes.png",
      id: "dots-boxes-project"
    },
    {
      title: "3D Game Scene",
      image: "/assets/img/Game Scene.png",
      id: "game-scene-project"
    }
  ],
  
  init() {
    this.render();
    this.addProjectIds();
    setInterval(() => this.nextSlide(), 5000);
    
    // Add click handler after initial render
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.style.cursor = 'pointer';
      carousel.addEventListener('click', (e) => {
        // Only navigate if clicking the image or caption, not the navigation buttons
        if (!e.target.classList.contains('prev') && !e.target.classList.contains('next')) {
          this.navigateToCurrentProject();
        }
      });
    }
  },

  addProjectIds() {
    const projectSection = document.getElementById('projects');
    if (!projectSection) return;

    const projectCards = projectSection.getElementsByClassName('card medium');
    
    Array.from(projectCards).forEach(card => {
      const cardTitle = card.querySelector('.card-title');
      if (cardTitle) {
        const projectTitle = cardTitle.textContent.trim();
        const matchingProject = this.projects.find(p => 
          projectTitle.toLowerCase().includes(p.title.toLowerCase()) ||
          p.title.toLowerCase().includes(projectTitle.toLowerCase())
        );
        if (matchingProject) {
          card.id = matchingProject.id;
        }
      }
    });
  },

  navigateToCurrentProject() {
    const currentProject = this.projects[this.currentSlide];
    const projectCard = document.getElementById(currentProject.id);
    
    if (projectCard) {
      // First scroll to projects section to ensure it's in view
      document.getElementById('projects').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });

      // Then after a short delay, scroll to the specific card
      setTimeout(() => {
        projectCard.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });

        // Add a temporary highlight class
        projectCard.classList.add('highlight-card');
        setTimeout(() => {
          projectCard.classList.remove('highlight-card');
        }, 2000); // Remove highlight after 2 seconds
      }, 500);
    }
  },

  render() {
    const root = document.getElementById('carousel-root');
    root.innerHTML = `
      <div class="carousel">
        <div class="carousel-image-container">
          <img src="${this.projects[this.currentSlide].image}" alt="${this.projects[this.currentSlide].title}">
          <div class="carousel-caption">
            <h3>${this.projects[this.currentSlide].title}</h3>
          </div>
        </div>
        <button class="prev" onclick="ProjectCarousel.prevSlide()">&lt;</button>
        <button class="next" onclick="ProjectCarousel.nextSlide()">&gt;</button>
      </div>
    `;

    // Reattach click handler
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.style.cursor = 'pointer';
      carousel.addEventListener('click', (e) => {
        if (!e.target.classList.contains('prev') && !e.target.classList.contains('next')) {
          this.navigateToCurrentProject();
        }
      });
    }
  },

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.projects.length;
    this.render();
  },

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.projects.length) % this.projects.length;
    this.render();
  }
};

document.addEventListener('DOMContentLoaded', () => ProjectCarousel.init());
console.log('Carousel script loaded');
