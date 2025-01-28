// Ensure all functions are defined before use
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initObserver();
    initThemeToggle();
    initSmoothScroll();
    initHeaderAnimation();
    initCarousel();
    initFAQ();
    initProgressBar();
    initFloatingButton();
    initTimelineAnimation();
    initFadeAnimations();
    initParallaxShapes();
    initNewsBanner();
    initMobileMenu();
    initNavigation();
    initGSAPAnimations();
    initParticles();
    initImageCarousel();
    loadDynamicContent();
});

// Fix observer initialization
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-container, .timeline-item-modern, .fade-in')
        .forEach(element => observer.observe(element));
}

// Add error handling for animations
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.animated-shape');
    if (shapes.length === 0) return;

    document.addEventListener('mousemove', (e) => {
        shapes.forEach(shape => {
            try {
                const speed = shape.classList.contains('shape-1') ? 30 : 20;
                const x = (e.clientX / window.innerWidth * speed);
                const y = (e.clientY / window.innerHeight * speed);
                shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
            } catch (error) {
                console.error('Error animating shape:', error);
            }
        });
    });
}

// Animação de elementos ao scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observar todos os containers de seção
    document.querySelectorAll('.section-container').forEach(section => {
        observer.observe(section);
    });

    // Alternador de tema
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeToggle.textContent = document.body.dataset.theme === 'dark' ? '🌞' : '🌙';
    });

    // Smooth scroll para links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animação do header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        header.style.backgroundPosition = `center ${scroll * 0.5}px`;
    });

    // Animate stats when in viewport
    const statsBoxes = document.querySelectorAll('.stat-box');
    statsBoxes.forEach(box => {
        observer.observe(box);
    });

    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrolled = window.pageYOffset;
        header.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
    });

    initCarousel();
    initFAQ();
    initProgressBar();
    initFloatingButton();
    initTimelineAnimation();
    initFadeAnimations();
    initParallaxShapes();
    initNewsBanner();
    initMobileMenu();
    initNavigation();
    initGSAPAnimations();
    initParticles();
    initImageCarousel();
});

// Add smooth reveal animations for stats
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Carousel functionality with touch support
function initCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % items.length;
        updateCarousel();
    }, 5000);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateCarousel();
        });
    });

    // Add touch support for carousel
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left
            currentSlide = (currentSlide + 1) % items.length;
        }
        if (touchEndX > touchStartX) {
            // Swipe right
            currentSlide = (currentSlide - 1 + items.length) % items.length;
        }
        updateCarousel();
    }
}

// Enhanced carousel functionality
function initImageCarousel() {
    const carousel = document.querySelector('.showcase-carousel .carousel-inner');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showSlide(index) {
        const offset = index * -100;
        carousel.style.transform = `translateX(${offset}%)`;
        updateDots(index);
    }

    function updateDots(index) {
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto advance slides
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }, 5000);

    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX) {
            // Swipe left
            currentIndex = (currentIndex + 1) % items.length;
        } else if (touchEndX > touchStartX) {
            // Swipe right
            currentIndex = (currentIndex - 1 + items.length) % items.length;
        }
        showSlide(currentIndex);
    });
}

// FAQ functionality
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
        });
    });
}

// Progress bar
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Floating Action Button with touch support
function initFloatingButton() {
    const fab = document.querySelector('.floating-action-button');
    
    // Add touch events
    fab.addEventListener('touchstart', () => {
        fab.style.transform = 'scale(0.95)';
    });
    
    fab.addEventListener('touchend', () => {
        fab.style.transform = 'scale(1)';
        // Add your action here
        console.log('Chat opened');
    });
    
    // Add click event
    fab.addEventListener('click', () => {
        console.log('Chat opened');
    });
}

// Animação para Timeline Moderna
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item-modern');
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, options);

    timelineItems.forEach(item => {
        item.style.opacity = 0;
        timelineObserver.observe(item);
    });
}

// Inicializar animações de fade
function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Parallax para formas animadas
function initParallaxShapes() {
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.animated-shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach(shape => {
            const speed = shape.classList.contains('shape-1') ? 30 : 20;
            const x = (mouseX * speed);
            const y = (mouseY * speed);
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
        });
    });
}

// Adicionar funcionalidade para o banner de novidades
function initNewsBanner() {
    const banner = document.querySelector('.news-banner');
    if (banner) {
        banner.addEventListener('click', () => {
            window.location.href = '#features';
            banner.style.display = 'none';
        });

        // Fechar banner após 10 segundos
        setTimeout(() => {
            banner.style.opacity = '0';
            setTimeout(() => banner.style.display = 'none', 500);
        }, 10000);
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Update navigation links
function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });
}

// Add GSAP animations
function initGSAPAnimations() {
    gsap.fromTo(".stat-card-modern", {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".stat-card-modern",
            start: "top center+=100",
            toggleActions: "play none none reverse"
        }
    });
}

// Add particle background
function initParticles() {
    particlesJS("particles-js", {
        // Particle.js configuration
        particles: {
            number: { value: 80 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            move: {
                enable: true,
                speed: 2
            }
        }
    });
}

// Add smooth counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let count = 0;
    const speed = target / 100;
    
    const updateCount = () => {
        if(count < target) {
            count += speed;
            element.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            element.innerText = target;
        }
    };
    
    updateCount();
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Set initial icon
    themeToggle.innerHTML = currentTheme === 'dark' ? '🌞' : '🌜';
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '🌞' : '🌜';
        
        // Update meta theme color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = newTheme === 'dark' ? '#212121' : '#ff6f61';
        }
    });
}

// Add this to your existing script.js
function loadDynamicContent() {
    const contentSections = document.querySelectorAll('[data-dynamic-content]');
    
    contentSections.forEach(section => {
        const contentType = section.dataset.dynamicContent;
        const content = siteContent[contentType];
        
        if (content) {
            // Generate HTML based on content type
            let html = '';
            switch(contentType) {
                case 'features':
                    html = generateFeatureCards(content);
                    break;
                case 'stats':
                    html = generateStatCards(content);
                    break;
                // Add more content types
            }
            section.innerHTML = html;
        }
    });
}

// Initialize dynamic content
document.addEventListener('DOMContentLoaded', loadDynamicContent);
