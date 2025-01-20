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

// Carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;

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

// Floating Action Button
function initFloatingButton() {
    const fab = document.querySelector('.floating-action-button');
    fab.addEventListener('click', () => {
        // Adicione ação do botão (ex: abrir chat)
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
