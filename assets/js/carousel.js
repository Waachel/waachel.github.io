const ProjectCarousel = {
  currentSlide: 0,
  projects: [
    {
      title: "Hybrid Game Engine",
      image: "/assets/img/Game Engine.png"
    },
    {
      title: "C.L.E.A.R. F.A.C.T.O.R.Y.", 
      image: "/assets/img/ClearFactory.png"
    },
    {
      title: "Omega Race",
      image: "/assets/img/OmegaRace.png"
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
