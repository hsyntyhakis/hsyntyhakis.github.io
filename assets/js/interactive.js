// Enhanced interactive elements for the website

// Typing effect for hero section
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init Typing Effect on DOM Load
document.addEventListener('DOMContentLoaded', function() {
  // Add typing effect to hero section
  initTypeWriter();
  
  // Add scroll progress indicator
  initScrollProgress();
  
  // Add tilt effect to profile image
  initTiltEffect();
  
  // Add animated counters
  initCounters();
  
  // Add scroll to top button
  initScrollToTop();
});

// Initialize typing effect
function initTypeWriter() {
  // Add a span for typing effect in hero section
  const heroText = document.querySelector('.hero-text p');
  const originalText = heroText.textContent;
  
  // Create a new element for typing effect
  const typingElement = document.createElement('p');
  typingElement.className = 'typing';
  
  // Replace original paragraph with typing element
  heroText.parentNode.replaceChild(typingElement, heroText);
  
  // Words to type (including original text)
  const words = [
    originalText,
    "Transforming ideas into successful products",
    "Driving innovation with AI solutions",
    "Building user-centered experiences"
  ];
  
  // Initialize TypeWriter
  new TypeWriter(typingElement, words, 2000);
}

// Initialize scroll progress indicator
function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  // Update progress bar on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
  });
}

// Initialize tilt effect for profile image
function initTiltEffect() {
  const heroImage = document.querySelector('.hero-image img');
  
  heroImage.addEventListener('mousemove', (e) => {
    const rect = heroImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const tiltX = deltaY * 10;
    const tiltY = -deltaX * 10;
    
    heroImage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  heroImage.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
}

// Initialize animated counters
function initCounters() {
  // Add counter elements to About section
  const aboutHighlights = document.querySelector('.about-highlights');
  
  // Create stats container
  const statsContainer = document.createElement('div');
  statsContainer.className = 'stats-container';
  statsContainer.setAttribute('data-aos', 'fade-up');
  statsContainer.setAttribute('data-aos-delay', '300');
  
  // Stats data
  const stats = [
    { value: 7, label: 'Years of Product Management' },
    { value: 17, label: 'Years of Experience' },
    { value: 3, label: 'Countries Worked In' }
  ];
  
  // Create stats items
  stats.forEach(stat => {
    const statItem = document.createElement('div');
    statItem.className = 'stat-item';
    
    statItem.innerHTML = `
      <div class="stat-value" data-count="${stat.value}">0</div>
      <div class="stat-label">${stat.label}</div>
    `;
    
    statsContainer.appendChild(statItem);
  });
  
  // Add stats container after highlights
  aboutHighlights.parentNode.insertBefore(statsContainer, aboutHighlights.nextSibling);
  
  // Animate counters when in viewport
  const counterElements = document.querySelectorAll('.stat-value');
  
  function animateCounters() {
    counterElements.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      
      if (isInViewport && !counter.classList.contains('animated')) {
        counter.classList.add('animated');
        
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // ms
        const increment = Math.ceil(target / (duration / 16)); // 60fps
        
        const updateCount = () => {
          count += increment;
          if (count >= target) {
            counter.textContent = target;
            return;
          }
          
          counter.textContent = count;
          requestAnimationFrame(updateCount);
        };
        
        updateCount();
      }
    });
  }
  
  // Initial check
  window.addEventListener('load', animateCounters);
  
  // Check on scroll
  window.addEventListener('scroll', animateCounters);
}

// Initialize scroll to top button
function initScrollToTop() {
  // Create scroll to top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  // Scroll to top on click
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Update particles.js initialization to use external config
function initParticles() {
  // Load particles config from JSON file
  fetch('assets/js/particles-config.json')
    .then(response => response.json())
    .then(config => {
      particlesJS('particles-js', config);
    })
    .catch(error => {
      console.error('Error loading particles config:', error);
      // Fallback to inline config if JSON fails to load
      particlesJS('particles-js', {
        particles: {
          number: { value: 80 },
          color: { value: '#3498db' },
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: 3 },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#3498db',
            opacity: 0.4,
            width: 1
          },
          move: { enable: true, speed: 2 }
        }
      });
    });
}

// Override the initParticles function in main.js
document.addEventListener('DOMContentLoaded', function() {
  // Replace the original initParticles function
  window.initParticles = initParticles;
});
