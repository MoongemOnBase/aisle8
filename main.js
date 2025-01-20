// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Remove all spline viewers immediately
        document.querySelectorAll('spline-viewer').forEach(viewer => {
            viewer.remove();
        });
        
        // Add mobile background to spline containers
        document.querySelectorAll('.spline-background').forEach(container => {
            container.style.background = 'linear-gradient(45deg, #1a1a1a, #2a2a2a)';
            container.style.minHeight = '60vh';
        });
        
        // Prevent any spline-related scripts from loading
        document.querySelectorAll('script[src*="spline"]').forEach(script => {
            script.remove();
        });
    }

    // Defer non-critical operations
    requestIdleCallback(() => {
        // Initialize feather icons only for visible elements
        const visibleIcons = document.querySelectorAll('i[data-feather]:not([data-feather-initialized])');
        visibleIcons.forEach(icon => {
            feather.replace(icon);
            icon.setAttribute('data-feather-initialized', 'true');
        });
    });

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Mobile menu handling
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Temporarily disable Spline on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Temporarily hide spline viewers on mobile
        document.querySelectorAll('spline-viewer').forEach(viewer => {
            viewer.style.display = 'none';
            // Add a temporary class to parent for background handling
            viewer.parentNode.classList.add('spline-mobile-disabled');
        });
    } else {
        // Desktop behavior remains unchanged
        document.querySelectorAll('spline-viewer').forEach(viewer => {
            viewer.addEventListener('load', function() {
                viewer.parentNode.classList.add('loaded');
            });
        });
    }

    // Glow effect for solution cards
    const cards = document.querySelectorAll('.solution-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Add throttling to prevent excessive scroll events
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Remove any other scroll event listeners that might be causing issues
    document.removeEventListener('scroll', window.onscroll);
});

// Add error handling for image loading
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = '/static/images/placeholder.jpg'; // Provide a fallback image
        return false;
    }
}, true);

// Prevent rapid reloads
let reloadCount = parseInt(sessionStorage.getItem('reloadCount') || 0);
if (reloadCount > 3) {
    console.warn('Multiple reloads detected, stabilizing...');
    sessionStorage.setItem('reloadCount', 0);
} else {
    sessionStorage.setItem('reloadCount', reloadCount + 1);
}

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const timing = performance.getEntriesByType('navigation')[0];
        if (timing.duration > 3000) { // 3 seconds threshold
            console.warn('Page load performance issue detected');
            // Log to your analytics service
        }
    });
}

// Features that interact with Spline:
// - Scroll indicator
// - Fade-in animations
// - Dynamic text changes
