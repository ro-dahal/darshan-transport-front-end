// loading animations


window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    // Add delay (e.g., 1.5 seconds) before starting fade out
    setTimeout(() => {
      preloader.style.opacity = '0'; // Start fade-out
      preloader.style.transition = 'opacity 0.8s ease'; // Smooth transition

      // Optional: fully remove from DOM after fade-out completes
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 200); // Match this to your transition duration
    }, 500); // Delay before fade-out starts
  });


const trackOrderBtn = document.getElementById('trackOrderStartBtn');
if (trackOrderBtn) {
  trackOrderBtn.addEventListener('click', function() {
    const trackOrderDetails = document.getElementById('trackOrderDetails');
    if (trackOrderDetails) {
      trackOrderDetails.classList.remove('hidden-track-order');
    }
  });
}

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbar = document.getElementById('navbar');
    const navbarr = document.getElementById('navbarr');

    if (mobileMenuToggle) {
        // Create backdrop element
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        document.body.appendChild(backdrop);

        // Mobile menu toggle functionality
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            
            if (navbar) {
                navbar.classList.toggle('show');
                backdrop.classList.toggle('show');
            }
            if (navbarr) {
                navbarr.classList.toggle('show');
                backdrop.classList.toggle('show');
            }
        });

        // Close menu when clicking on backdrop
        backdrop.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            backdrop.classList.remove('show');
            if (navbar) navbar.classList.remove('show');
            if (navbarr) navbarr.classList.remove('show');
        });

        // Close menu when clicking on menu items
        document.querySelectorAll('#navbar a, #navbarr a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                backdrop.classList.remove('show');
                if (navbar) navbar.classList.remove('show');
                if (navbarr) navbarr.classList.remove('show');
            });
        });
    }

    if (navbar || navbarr) {
        const navLinks = document.querySelectorAll('#navbar a, #navbarr a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbar) navbar.classList.remove('show');
                if (navbarr) navbarr.classList.remove('show');
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = (navbar && navbar.contains(event.target)) || 
                                     (navbarr && navbarr.contains(event.target)) || 
                                     (mobileMenuToggle && mobileMenuToggle.contains(event.target));

            if (!isClickInsideNav) {
                if (navbar) navbar.classList.remove('show');
                if (navbarr) navbarr.classList.remove('show');
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            }
        });
    }
});

// Track order functionality
document.addEventListener('DOMContentLoaded', function() {
    const trackOrderBtn = document.getElementById('trackOrderStartBtn');
    const trackOrderDetails = document.getElementById('trackOrderDetails');
    
    if (trackOrderBtn && trackOrderDetails) {
        trackOrderBtn.addEventListener('click', function() {
            trackOrderDetails.classList.remove('hidden-track-order');
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Smart navbar scroll behavior
let lastScrollTop = 0;
const navbar = document.getElementById('headerr');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show navbar at top of page
    if (currentScroll <= 0) {
        navbar.classList.remove('nav-hidden');
        navbar.classList.add('nav-visible');
        return;
    }
    
    // Hide navbar when scrolling down, show when scrolling up
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down & past 100px
        navbar.classList.remove('nav-visible');
        navbar.classList.add('nav-hidden');
    } else if (currentScroll < lastScrollTop) {
        // Scrolling up
        navbar.classList.remove('nav-hidden');
        navbar.classList.add('nav-visible');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    
    // Optional: Add background opacity based on scroll
    if (navbar) {
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.75)';
        }
    }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.getElementById('headerr');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.75)';
        }
    }
});







