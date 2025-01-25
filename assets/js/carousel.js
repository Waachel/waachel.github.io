// Update /assets/js/carousel.js to:
const ProjectCarousel = {
  currentSlide: 0,
  projects: [
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
  ],
  
  init() {
    this.render();
    setInterval(() => this.nextSlide(), 5000);
  },

  render() {
    const root = document.getElementById('carousel-root');
    root.innerHTML = `
      <div class="carousel">
        <img src="${this.projects[this.currentSlide].image}" alt="${this.projects[this.currentSlide].title}">
        <div class="carousel-caption">
          <h3>${this.projects[this.currentSlide].title}</h3>
          <p>${this.projects[this.currentSlide].description}</p>
        </div>
        <button class="prev" onclick="ProjectCarousel.prevSlide()">&lt;</button>
        <button class="next" onclick="ProjectCarousel.nextSlide()">&gt;</button>
      </div>
    `;
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

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => ProjectCarousel.init());
