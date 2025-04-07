// Main JavaScript file for Haris Syntyhakis's personal website

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Initialize Particles.js for hero section background
  initParticles();
  
  // Populate dynamic content from resume data
  populateExperience();
  populateSkills();
  populateEducation();
  populateCertifications();
  
  // Initialize skills chart
  initSkillsChart();
  
  // Setup event listeners
  setupEventListeners();
  
  // Check for saved theme preference
  checkThemePreference();
});

// Initialize particles.js
function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#3498db'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#3498db',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}

// Populate experience section with timeline items
function populateExperience() {
  const timelineContainer = document.querySelector('.timeline');
  
  resumeData.experience.forEach((job, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
    timelineItem.setAttribute('data-aos-delay', (index * 100).toString());
    
    let achievementsList = '';
    if (job.achievements && job.achievements.length > 0) {
      achievementsList = `
        <div class="timeline-achievements">
          <h4>Key Achievements</h4>
          <ul>
            ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    let learnings = '';
    if (job.learnings) {
      learnings = `
        <div class="timeline-learnings">
          <p><strong>Key learnings:</strong> ${job.learnings}</p>
        </div>
      `;
    }
    
    timelineItem.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-period">${job.period}</div>
        <h3 class="timeline-title">${job.title}</h3>
        <div class="timeline-company">${job.company} | ${job.location}</div>
        <div class="timeline-description">${job.description}</div>
        ${achievementsList}
        ${learnings}
      </div>
    `;
    
    timelineContainer.appendChild(timelineItem);
  });
  
  // Add scroll event listener to animate timeline items
  animateTimelineOnScroll();
}

// Animate timeline items when they come into view
function animateTimelineOnScroll() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  function checkIfInView() {
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      
      if (isInViewport) {
        item.classList.add('visible');
      }
    });
  }
  
  // Initial check
  checkIfInView();
  
  // Check on scroll
  window.addEventListener('scroll', checkIfInView);
}

// Populate skills section
function populateSkills() {
  const technicalSkillsContainer = document.getElementById('technical-skills');
  const softSkillsContainer = document.getElementById('soft-skills');
  
  // Populate technical skills
  resumeData.skills.technical.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.textContent = skill;
    technicalSkillsContainer.appendChild(skillItem);
  });
  
  // Populate soft skills
  resumeData.skills.soft.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.textContent = skill;
    softSkillsContainer.appendChild(skillItem);
  });
}

// Initialize skills chart
function initSkillsChart() {
  const ctx = document.getElementById('skillsChart').getContext('2d');
  
  // Define skill categories and values (0-100)
  const skillCategories = [
    'AI/ML',
    'Data Analytics',
    'Project Management',
    'Product Strategy',
    'UX Design',
    'Technical Knowledge'
  ];
  
  const skillValues = [85, 90, 95, 90, 80, 85];
  
  // Get CSS variables for colors
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
  
  // Create chart
  const skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: skillCategories,
      datasets: [{
        label: 'Skill Proficiency',
        data: skillValues,
        backgroundColor: `${primaryColor}33`, // Add transparency
        borderColor: primaryColor,
        borderWidth: 2,
        pointBackgroundColor: primaryColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: primaryColor
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            color: `${secondaryColor}33`
          },
          grid: {
            color: `${secondaryColor}33`
          },
          pointLabels: {
            font: {
              family: "'Open Sans', sans-serif",
              size: 12
            },
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim()
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
  
  // Update chart when theme changes
  document.addEventListener('themeChanged', function() {
    skillsChart.options.scales.r.pointLabels.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    skillsChart.update();
  });
}

// Populate education section
function populateEducation() {
  const educationContainer = document.getElementById('education-items');
  
  resumeData.education.forEach(edu => {
    const educationItem = document.createElement('div');
    educationItem.className = 'education-item';
    educationItem.setAttribute('data-aos', 'fade-up');
    
    educationItem.innerHTML = `
      <div class="education-degree">${edu.degree}</div>
      <div class="education-institution">${edu.institution}</div>
      <div class="education-location">${edu.location}</div>
    `;
    
    educationContainer.appendChild(educationItem);
  });
}

// Populate certifications section
function populateCertifications() {
  const certificationsContainer = document.getElementById('certification-items');
  
  resumeData.certifications.forEach(cert => {
    const certificationItem = document.createElement('div');
    certificationItem.className = 'certification-item';
    certificationItem.setAttribute('data-aos', 'fade-up');
    
    certificationItem.innerHTML = `
      <div class="certification-name">${cert.name}</div>
      <div class="certification-issuer">${cert.issuer}</div>
    `;
    
    certificationsContainer.appendChild(certificationItem);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  mobileToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.navbar-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });
  
  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    // Update theme icon
    const themeIcon = this.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
    
    // Dispatch theme change event for chart update
    document.dispatchEvent(new Event('themeChanged'));
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you would send the form data to a server
      // For this demo, we'll just show a success message
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Clear form
      contactForm.reset();
      
      // Show success message
      alert(`Thank you for your message, ${formValues.name}! I'll get back to you soon.`);
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });
}

// Check for saved theme preference
function checkThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.querySelector('.theme-toggle i');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.className = 'fas fa-sun';
  }
}

// Handle navbar appearance on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    navbar.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  } else {
    navbar.style.boxShadow = 'none';
    navbar.style.backgroundColor = 'transparent';
  }
});
