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

// Smart navbar scroll behavior - moves proportionally with scroll
let lastScrollTop = 0;
const navbar = document.getElementById('headerr');
let ticking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Get the actual navbar height dynamically
    const navbarHeight = navbar ? navbar.offsetHeight : 90;
    
    // Show navbar at top of page
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0px)';
        navbar.style.background = 'rgba(0, 0, 0, 0.75)';
        lastScrollTop = currentScroll;
        return;
    }
    
    // Calculate how much to move navbar based on scroll direction and speed
    const scrollDelta = currentScroll - lastScrollTop;
    
    // Get current navbar position
    const currentTransform = navbar.style.transform;
    let currentY = 0;
    
    if (currentTransform && currentTransform.includes('translateY')) {
        const match = currentTransform.match(/translateY\(([^)]+)px\)/);
        if (match) {
            currentY = parseFloat(match[1]);
        }
    }
    
    // Calculate new position - move navbar proportionally to scroll
    let newY = currentY - scrollDelta;
    
    // Limit the movement to the navbar height range
    newY = Math.max(newY, -navbarHeight); // Don't go further up than navbar height
    newY = Math.min(newY, 0); // Don't go below the top position
    
    // Apply the transform
    navbar.style.transform = `translateY(${newY}px)`;
    
    // Update background opacity based on scroll
    if (navbar) {
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.75)';
        }
    }
    
    lastScrollTop = currentScroll;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
});


// Interactive Map Functionality
document.addEventListener('DOMContentLoaded', function() {
    const locationRows = document.querySelectorAll('.location-row');
    const mapIframe = document.getElementById('locationMap');
    const mapLoading = document.getElementById('mapLoading');

    // Function to update map based on location
    function updateMap(location, searchQuery) {
        if (!mapIframe) return;

        // Show loading indicator
        if (mapLoading) {
            mapLoading.style.display = 'block';
        }

        // Encode the search query for URL
        const encodedLocation = encodeURIComponent(searchQuery || location);
        
        // Use Google Maps embed with search query
        const searchMapUrl = `https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        
        // Update iframe source
        mapIframe.src = searchMapUrl;
        
        // Hide loading indicator after a delay
        setTimeout(() => {
            if (mapLoading) {
                mapLoading.style.display = 'none';
            }
        }, 1500);
    }

    // Function to scroll to map
    function scrollToMap() {
        const mapElement = document.querySelector('.contact-map');
        if (mapElement) {
            mapElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    // Function to remove selection from all rows
    function clearSelection() {
        locationRows.forEach(row => {
            row.classList.remove('selected');
        });
    }

    // Add click event listeners to all location rows
    locationRows.forEach(row => {
        row.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            const searchQuery = this.getAttribute('data-search');
            
            if (location) {
                // Clear previous selection
                clearSelection();
                
                // Mark current row as selected
                this.classList.add('selected');
                
                // Update the map
                updateMap(location, searchQuery);
                
                // Scroll to map
                setTimeout(() => {
                    scrollToMap();
                }, 100);
                
                // Optional: Show feedback
                console.log(`Showing ${location} on map`);
            }
        });

        // Add keyboard accessibility
        row.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make rows focusable for accessibility
        row.setAttribute('tabindex', '0');
        row.setAttribute('role', 'button');
        row.setAttribute('aria-label', `View ${this.querySelector('td:nth-child(3)').textContent} on map`);
    });

    // Set default selection (Head Office - Kathmandu)
    const defaultRow = document.querySelector('.location-row[data-location*="Kathmandu"]');
    if (defaultRow) {
        setTimeout(() => {
            defaultRow.classList.add('selected');
        }, 1000);
    }
});