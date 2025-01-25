const ProjectCarousel = {
  currentSlide: 0,
  projects: [
    {
      title: "Game Engine Development",
      image: "/assets/img/Game Engine.png"
    },
    {
      title: "C.L.E.A.R. F.A.C.T.O.R.Y.", 
      image: "/assets/img/ClearFactory.png"
    },
    {
      title: "Real-time Audio Engine",
      image: "/assets/img/AudioEngine.png"
    }
  ],
  
  init() {
    this.render();
    setInterval(() => this.nextSlide(), 5000);
  },

  getVisibleSlides() {
    const prevIndex = (this.currentSlide - 1 + this.projects.length) % this.projects.length;
    const nextIndex = (this.currentSlide + 1) % this.projects.length;
    return [
      this.projects[prevIndex],
      this.projects[this.currentSlide],
      this.projects[nextIndex]
    ];
  },

  render() {
    const root = document.getElementById('carousel-root');
    const visibleSlides = this.getVisibleSlides();
    root.innerHTML = `
      <div class="carousel">
        ${visibleSlides.map(project => `
          <img src="${project.image}" alt="${project.title}">
        `).join('')}
        <div class="carousel-caption">
          <h3>${this.projects[this.currentSlide].title}</h3>
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
