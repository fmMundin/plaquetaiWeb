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
});
