// ==========================================
// Smooth Scroll & Navigation
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // ==========================================
    // Navbar Scroll Effect
    // ==========================================
    
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow when scrolled
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ==========================================
    // Intersection Observer for Animations
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.business-card, .service-card, .strength-item, .section-header'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // ==========================================
    // Parallax Effect for Hero
    // ==========================================
    
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
            }
        }
    });
    
    // ==========================================
    // Active Navigation Link
    // ==========================================
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current link
                const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // ==========================================
    // Image Lazy Loading Enhancement
    // ==========================================
    
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ==========================================
    // Back to Top Button
    // ==========================================
    
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'トップに戻る');
    
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FF6B35, #E5522A);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
});

// ==========================================
// Add CSS Animations
// ==========================================

const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu a.active:not(.btn-contact) {
        color: #FF6B35;
    }
    
    img {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
`;

document.head.appendChild(style);