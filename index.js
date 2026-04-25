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

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

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
//  FILTER TABS
// ═══════════════════════════════
const filterBtns = document.querySelectorAll('.filter-btn');
const projectBlocks = document.querySelectorAll('.project-block');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectBlocks.forEach(block => {
            if (filter === 'all' || block.getAttribute('data-category') === filter) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        });
    });
});

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
};

function openPopup(img, title, desc) {
    popupImg.src = img;
    popupImg.alt = title;
    popupTitle.textContent = title;
    popupDesc.textContent = desc || '';

    const meta = projectMeta[title];
    if (meta?.git) popupGit.href = meta.git;

    popupOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popupOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // Clear src after transition
    setTimeout(() => { popupImg.src = ''; }, 300);
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

popupClose.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', e => { if (e.target === popupOverlay) closePopup(); });
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

console.log('✅ Portfolio loaded');
// ========== КАСТОМНЫЙ КРУЖОК НА КУРСОРЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, не мобильное ли устройство
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;
    
    // Проверяем, есть ли уже элемент
    if (document.querySelector('.custom-cursor')) return;
    
    // Создаем элемент кружка
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    
    // Обновляем позицию при движении мыши
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Функция добавления эффекта наведения
    function addHoverEffect(el) {
        if (el.hasAttribute('data-cursor-listener')) return;
        el.setAttribute('data-cursor-listener', 'true');
        
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    }
    
    // Все кликабельные элементы
    const selectors = [
        'a', 'button', '.work-card', '.nav-links a', '.btn-primary', 
        '.btn-ghost', '.card-link', '.contact-card', '.filter-btn', 
        '.project-tag', '.stack-card', '.feature-card', '.close-popup', 
        '.open-popup-link', '.popup-link', '[href]', '[data-popup]'
    ];
    
    // Добавляем на существующие элементы
    setTimeout(function() {
        document.querySelectorAll(selectors.join(',')).forEach(addHoverEffect);
    }, 100);
    
    // Следим за новыми элементами
    const observer = new MutationObserver(function() {
        document.querySelectorAll(selectors.join(',')).forEach(addHoverEffect);
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Скрываем кружок при выходе за пределы окна
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
    
    console.log('✅ Кастомный курсор загружен');
});
