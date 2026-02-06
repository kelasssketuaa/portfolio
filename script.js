/* ================================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Smooth Scrolling, Navbar Active, Form Validation
   ================================================ */

// ========== NAVBAR & SCROLL BEHAVIOR ==========

// Get navbar element
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Handle navbar active state on scroll
window.addEventListener('scroll', () => {
  updateNavbarActiveState();
  
  // Add shadow to navbar on scroll
  if (window.scrollY > 10) {
    navbar.style.boxShadow = 'var(--shadow-md)';
  } else {
    navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
  }
});

// Update which nav link is active based on current section
function updateNavbarActiveState() {
  const sections = document.querySelectorAll('.section');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to current section's link
      const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

// ========== SMOOTH SCROLL FUNCTION ==========

// Smooth scroll to section by ID
function smoothScroll(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const scrollPosition = section.offsetTop - 80;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }
}

// Handle click on nav links for smooth scrolling
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    smoothScroll(sectionId);
  });
});

// ========== ANIMATION ON SCROLL ==========

// Simple scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

// Create intersection observer for scroll animations
const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add animation class when element comes into view
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all skill items and project cards
const animateElements = document.querySelectorAll(
  '.skill-category, .project-card, .contact-item, .about-text'
);

animateElements.forEach((element, index) => {
  element.style.opacity = '0';
  element.style.animationDelay = `${index * 0.1}s`;
  observer.observe(element);
});

// ========== FORM VALIDATION & SUBMISSION ==========

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form inputs
    const nameInput = contactForm.querySelector('input[aria-label="Nama"]');
    const emailInput = contactForm.querySelector('input[aria-label="Email"]');
    const messageInput = contactForm.querySelector('textarea[aria-label="Pesan"]');
    
    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // Validate form
    if (!validateForm(name, email, message)) {
      return;
    }
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    contactForm.reset();
    
    // Simulate form submission (dalam real app, kirim ke backend)
    console.log('Form Data:', { name, email, message });
  });
}

// Form validation function
function validateForm(name, email, message) {
  // Check if fields are empty
  if (!name) {
    showError('Nama tidak boleh kosong');
    return false;
  }
  
  if (!email) {
    showError('Email tidak boleh kosong');
    return false;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Silahkan masukkan email yang valid');
    return false;
  }
  
  if (!message) {
    showError('Pesan tidak boleh kosong');
    return false;
  }
  
  // Check minimum length
  if (name.length < 2) {
    showError('Nama minimal 2 karakter');
    return false;
  }
  
  if (message.length < 10) {
    showError('Pesan minimal 10 karakter');
    return false;
  }
  
  return true;
}

// Show error message
function showError(message) {
  // Create error element if not exists
  let errorElement = document.getElementById('formError');
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = 'formError';
    errorElement.style.cssText = `
      padding: 12px 16px;
      background-color: rgba(239, 68, 68, 0.1);
      color: #fca5a5;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      margin-bottom: 16px;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    `;
    contactForm.insertBefore(errorElement, contactForm.firstChild);
  }
  
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  // Hide error after 5 seconds
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 5000);
}

// Show success message
function showSuccessMessage() {
  // Create success element if not exists
  let successElement = document.getElementById('formSuccess');
  
  if (!successElement) {
    successElement = document.createElement('div');
    successElement.id = 'formSuccess';
    successElement.style.cssText = `
      padding: 12px 16px;
      background-color: rgba(34, 197, 94, 0.1);
      color: #86efac;
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: 8px;
      margin-bottom: 16px;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    `;
    contactForm.insertBefore(successElement, contactForm.firstChild);
  }
  
  successElement.textContent = 'Terima kasih! Pesan Anda telah dikirim.';
  successElement.style.display = 'block';
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    successElement.style.display = 'none';
  }, 5000);
}

// ========== PROGRESS BAR ANIMATION ==========

// Trigger progress bar animation on scroll
const skillItems = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      // Get the width percentage from inline style
      const width = entry.target.style.width;
      entry.target.classList.add('animated');
    }
  });
});

skillItems.forEach(item => {
  progressObserver.observe(item);
});

// ========== PAGE LOAD INITIALIZATION ==========

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav link
  updateNavbarActiveState();
  
  // Log to console (optional)
  console.log('Portfolio website loaded successfully');
});

// ========== KEYBOARD NAVIGATION ==========

// Allow keyboard navigation with Tab key
navLinks.forEach(link => {
  link.addEventListener('keypress', (e) => {
    // Execute click handler when Enter is pressed
    if (e.key === 'Enter') {
      link.click();
    }
  });
});

// ========== PERFORMANCE OPTIMIZATION ==========

// Debounce scroll event handler
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    updateNavbarActiveState();
  }, 100);
}, { passive: true });

// Add passive event listener for better performance
document.addEventListener('touchmove', () => {}, { passive: true });
