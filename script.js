// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initProgressBar();
    initFAQ();
    initDonationMeter();
    updateLastUpdate();
    initBootstrapComponents();
});

// ============================================
// TEMA CLARO/ESCURO
// ============================================
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
            metaThemeColor.content = newTheme === 'dark' ? '#1a1a2e' : '#6a0dad';
        }
    });
}

// ============================================
// MENU MOBILE
// ============================================
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animar ícone
            navToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '☰';
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '☰';
            }
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// BARRA DE PROGRESSO
// ============================================
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// ============================================
// FAQ - ACCORDION
// ============================================
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Fechar todas as outras
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle atual
            item.classList.toggle('active');
        });
    });
}

// ============================================
// COPIAR CHAVE PIX
// ============================================
function copyPix() {
    const pixInput = document.getElementById('pixKey');
    if (!pixInput) return;

    // Selecionar texto
    pixInput.select();
    pixInput.setSelectionRange(0, 99999); // Para mobile

    // Copiar para clipboard
    navigator.clipboard.writeText(pixInput.value).then(() => {
        // Feedback visual
        const btn = event.target.closest('.btn-copy');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        btn.style.background = '#10b981';
        
        // Resetar após 2 segundos
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);

        // Mostrar notificação (opcional)
        showNotification('Chave PIX copiada! 🎉', 'success');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        showNotification('Erro ao copiar. Tente novamente.', 'error');
    });
}

// ============================================
// MEDIDOR DE META
// ============================================
function initDonationMeter() {
    // SUBSTITUIR ESTE VALOR PELO VALOR REAL ARRECADADO
    const currentAmount = 208,01; // Atualizar diariamente(atualizado 13/11)
    const goalAmount = 6000;
    
    updateDonationMeter(currentAmount, goalAmount);
}

function updateDonationMeter(currentAmount, goalAmount = 6000) {
    const percentage = Math.min((currentAmount / goalAmount) * 100, 100);
    
    // Atualizar valor atual
    const currentAmountEl = document.getElementById('currentAmount');
    if (currentAmountEl) {
        animateValue(currentAmountEl, 0, currentAmount, 2000, true);
    }
    
    // Atualizar porcentagem
    const percentageEl = document.getElementById('percentage');
    if (percentageEl) {
        animateValue(percentageEl, 0.5 percentage, 2000, false);
    }
    
    // Atualizar barra visual
    const meterFill = document.getElementById('meterFill');
    if (meterFill) {
        setTimeout(() => {
            meterFill.style.width = `${percentage}%`;
        }, 100);
    }
    
    // Se atingiu a meta, mostrar confete! 🎉
    if (percentage >= 100) {
        celebrateGoalReached();
    }
}

// Animar números
function animateValue(element, start, end, duration, isCurrency = false) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        if (isCurrency) {
            element.textContent = `R$ ${current.toLocaleString('pt-BR')}`;
        } else {
            element.textContent = `${Math.round(current)}%`;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Celebração ao atingir meta
function celebrateGoalReached() {
    // Adicionar confete ou animação especial
    console.log('🎉 META ATINGIDA! 🎉');
    
    // Você pode adicionar uma biblioteca de confete aqui
    // Exemplo: canvas-confetti
    showNotification('🎉 META ATINGIDA! Obrigado a todos! 🎉', 'success');
}

// ============================================
// ATUALIZAR ÚLTIMA ATUALIZAÇÃO
// ============================================
function updateLastUpdate() {
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (!lastUpdateEl) return;
    
    const today = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    lastUpdateEl.textContent = today.toLocaleDateString('pt-BR', options);
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES
// ============================================
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar animações de notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// BOOTSTRAP COMPONENTS
// ============================================
function initBootstrapComponents() {
    // Inicializar tooltips do Bootstrap
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar carousels do Bootstrap
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            keyboard: true
        });
    });
}

// ============================================
// INTERSECTION OBSERVER - ANIMAÇÕES AO SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Se for um card de impacto, animar com delay
            if (entry.target.classList.contains('impact-card')) {
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observar elementos que devem animar
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-container, .impact-card, .story-item').forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// SCROLL TO TOP BUTTON (Opcional)
// ============================================
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Mostrar/esconder baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.pointerEvents = 'auto';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.pointerEvents = 'none';
        }
    });
    
    // Scroll suave para o topo
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar botão de scroll to top
initScrollToTop();

// ============================================
// ANALYTICS / TRACKING (Opcional)
// ============================================
function trackDonation(amount) {
    // Adicionar código de tracking aqui
    console.log(`Doação rastreada: R$ ${amount}`);
    
    // Exemplo com Google Analytics:
    // gtag('event', 'donation', {
    //     'event_category': 'engagement',
    //     'event_label': 'donation_amount',
    //     'value': amount
    // });
}

function trackShare(platform) {
    console.log(`Compartilhado em: ${platform}`);
    
    // Exemplo com Google Analytics:
    // gtag('event', 'share', {
    //     'event_category': 'engagement',
    //     'event_label': platform
    // });
}

// Adicionar tracking aos botões de compartilhamento
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const platform = btn.classList.contains('whatsapp') ? 'whatsapp' :
                        btn.classList.contains('facebook') ? 'facebook' :
                        btn.classList.contains('twitter') ? 'twitter' :
                        btn.classList.contains('linkedin') ? 'linkedin' : 'other';
        trackShare(platform);
    });
});

// ============================================
// FORMULÁRIO DE ATUALIZAÇÃO MANUAL (Para Admin)
// ============================================
// NOTA: Esta função é só para fins de desenvolvimento
// Em produção, conectar com backend real
function createAdminPanel() {
    // Verificar se está em modo admin (pode adicionar autenticação)
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (isAdmin) {
        const adminPanel = document.createElement('div');
        adminPanel.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 20px;
            background: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
        `;
        adminPanel.innerHTML = `
            <h6>Admin: Atualizar Meta</h6>
            <input type="number" id="adminAmount" placeholder="Valor arrecadado" class="form-control mb-2">
            <button onclick="adminUpdateMeter()" class="btn btn-primary btn-sm">Atualizar</button>
        `;
        document.body.appendChild(adminPanel);
    }
}

function adminUpdateMeter() {
    const amount = parseFloat(document.getElementById('adminAmount').value);
    if (!isNaN(amount)) {
        updateDonationMeter(amount);
        localStorage.setItem('currentDonation', amount);
        showNotification('Meta atualizada com sucesso!', 'success');
    }
}

// ============================================
// CARREGAR VALOR SALVO (Se houver)
// ============================================
window.addEventListener('load', () => {
    const savedAmount = localStorage.getItem('currentDonation');
    if (savedAmount) {
        updateDonationMeter(parseFloat(savedAmount));
    }
});

// ============================================
// PREVENIR SPAM DE CLIQUES
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// EASTER EGG: Konami Code para modo admin
// ============================================
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        localStorage.setItem('isAdmin', 'true');
        showNotification('🎮 Modo Admin Ativado!', 'success');
        createAdminPanel();
    }
});

// ============================================
// PERFORMANCE: Lazy Loading de Imagens
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ============================================
// CONSOLE LOG ESTILIZADO (Para desenvolvedores)
// ============================================
console.log(
    '%c💙 Plaquet.AI - Vaquinha %c\n' +
    '%cSite desenvolvido com ❤️ para ciência brasileira\n' +
    '%cContribua: felipemauriciomundin@outlook.com',
    'color: #6a0dad; font-size: 20px; font-weight: bold;',
    '',
    'color: #8a2be2; font-size: 14px;',
    'color: #9370db; font-size: 12px;'
);

// ============================================
// EXPORTAR FUNÇÕES GLOBAIS
// ============================================
window.copyPix = copyPix;
window.updateDonationMeter = updateDonationMeter;
window.adminUpdateMeter = adminUpdateMeter;
