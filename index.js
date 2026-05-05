// ═══════════════════════════════
//  INIT AOS
// ═══════════════════════════════
AOS.init({ duration: 700, once: true, offset: 80 });

// ═══════════════════════════════
//  NAVBAR: sticky + burger
// ═══════════════════════════════
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 40
        ? 'rgba(13,13,13,0.97)'
        : 'rgba(13,13,13,0.85)';
});

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
}

// Close mobile menu on link click
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            burger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

// ═══════════════════════════════
//  SKILL BARS — animate on scroll
// ═══════════════════════════════
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const w = fill.getAttribute('data-w');
                fill.style.width = w + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const aboutSection = document.getElementById('about');
if (aboutSection) skillObserver.observe(aboutSection);

// ═══════════════════════════════
//  FILTER TABS — ИСПРАВЛЕНО (баг с AOS)
// ═══════════════════════════════
const filterBtns = document.querySelectorAll('.filter-btn');
let projectBlocks = document.querySelectorAll('.project-block');

function updateProjectBlocks() {
    projectBlocks = document.querySelectorAll('.project-block');
}

// Сбрасываем AOS-скрытие на блоке, чтобы он сразу был виден
function unlockAOS(block) {
    block.removeAttribute('data-aos');
    block.removeAttribute('data-aos-delay');
    block.style.opacity = '1';
    block.style.transform = 'none';
    block.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    // Убираем inline-стили которые AOS мог выставить
    block.classList.remove('aos-animate');
    block.classList.remove('aos-init');
}

function filterProjects(filter) {
    updateProjectBlocks();

    projectBlocks.forEach(block => {
        const category = block.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
            block.classList.remove('hidden');
            block.style.display = '';
            // ← ФИКС: убираем AOS-блокировку видимости
            unlockAOS(block);
        } else {
            block.classList.add('hidden');
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        filterProjects(filter);
    });
});

// Инициализация при загрузке
setTimeout(() => {
    filterProjects('all');
}, 100);

// ═══════════════════════════════
//  POPUP
// ═══════════════════════════════
const popupOverlay = document.getElementById('popupOverlay');
const popupImg     = document.getElementById('popupImg');
const popupTitle   = document.getElementById('popupTitle');
const popupDesc    = document.getElementById('popupDesc');
const popupGit     = document.getElementById('popupGit');
const popupClose   = document.getElementById('popupClose');

const projectMeta = {
    "WildSpace":                         { git: "https://github.com/Daiki20?tab=repositories" },
    "WILDBERRIES":                       { git: "https://github.com/Daiki20?tab=repositories" },
    "WILDBERRIES ПАРФЮМ":                { git: "https://github.com/Daiki20?tab=repositories" },
    "WILDBERRIES ПАРФЮМ 2":              { git: "https://github.com/Daiki20?tab=repositories" },
    "Рекламный баннер в мебельную компанию": { git: "https://github.com/Daiki20?tab=repositories" },
    "PumpHunter":                        { git: "https://github.com/Daiki20?tab=repositories" },
    "PODSTAY":                           { git: "https://github.com/Daiki20?tab=repositories" },
    "Дизайн маркетплейсов":              { git: "https://github.com/Daiki20?tab=repositories" },
    "Торты — Instagram пост":            { git: "https://github.com/Daiki20?tab=repositories" },
};

function openPopup(img, title, desc) {
    if (!popupImg) return;
    popupImg.src = img;
    popupImg.alt = title;
    popupTitle.textContent = title;
    popupDesc.textContent = desc || '';

    const meta = projectMeta[title];
    if (meta?.git && popupGit) popupGit.href = meta.git;

    if (popupOverlay) {
        popupOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closePopup() {
    if (popupOverlay) {
        popupOverlay.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { if (popupImg) popupImg.src = ''; }, 300);
    }
}

// Wire up all work cards
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
        const img   = card.getAttribute('data-img');
        const title = card.getAttribute('data-title');
        const desc  = card.getAttribute('data-desc');
        if (img) openPopup(img, title, desc);
    });
});

if (popupClose) popupClose.addEventListener('click', closePopup);
if (popupOverlay) popupOverlay.addEventListener('click', e => { if (e.target === popupOverlay) closePopup(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

// ═══════════════════════════════
//  SMOOTH SCROLL (fallback)
// ═══════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#' || id === '') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ═══════════════════════════════
//  ACTIVE NAV LINK on scroll
// ═══════════════════════════════
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(a => a.style.color = '');
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active && !active.classList.contains('nav-cta')) {
                active.style.color = '#FF007F';
            }
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ═══════════════════════════════
//  КАСТОМНЫЙ КУРСОР
// ═══════════════════════════════
(function() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;
    
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    function addHoverEffect(el) {
        if (el.hasAttribute('data-cursor-listener')) return;
        el.setAttribute('data-cursor-listener', 'true');
        
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    }
    
    const clickableSelectors = [
        'a', 'button', '.work-card', '.nav-links a', '.btn-primary', 
        '.btn-ghost', '.card-link', '.contact-card', '.filter-btn', 
        '.project-tag', '.stack-card', '.feature-card', '.close-popup', 
        '.open-popup-link', '.popup-link'
    ];
    
    document.querySelectorAll(clickableSelectors.join(',')).forEach(addHoverEffect);
    
    const observer = new MutationObserver(() => {
        document.querySelectorAll(clickableSelectors.join(',')).forEach(addHoverEffect);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
})();

console.log('✅ Portfolio loaded, filter fixed!');


// ═══════════════════════════════
//  ПЕЧАТАЮЩИЙ ТЕКСТ В HERO
// ═══════════════════════════════
const roles = ['Junior Frontend Dev', 'Верстальщик', 'Дизайнер', 'React Dev'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroLabel = document.querySelector('.hero-label');

if (heroLabel) {
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            heroLabel.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroLabel.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 500);
            return;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    typeEffect();
}

// ═══════════════════════════════
//  SPOTLIGHT ЭФФЕКТ
// ═══════════════════════════════
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', x + 'px');
        card.style.setProperty('--y', y + 'px');
    });
});

// ═══════════════════════════════
//  КНОПКА НАВЕРХ
// ═══════════════════════════════
const goTopBtn = document.getElementById('goTop');
if (goTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            goTopBtn.classList.add('show');
        } else {
            goTopBtn.classList.remove('show');
        }
    });
    
    goTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ═══════════════════════════════
//  ПРОГРЕСС-БАР ПРОКРУТКИ
// ═══════════════════════════════
const progressBar = document.getElementById('progressBar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}
// ═══════════════════════════════
//  АНИМАЦИЯ СЧЁТЧИКОВ В HERO
// ═══════════════════════════════
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.hcs-num:not(.counted)');
            counters.forEach(counter => {
                const target = parseInt(counter.innerText);
                if (isNaN(target)) return;
                counter.classList.add('counted');
                let current = 0;
                const increment = Math.ceil(target / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.innerText = target;
                        clearInterval(timer);
                    } else {
                        counter.innerText = current;
                    }
                }, 30);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroCard = document.querySelector('.hero-card');
if (heroCard) counterObserver.observe(heroCard);
