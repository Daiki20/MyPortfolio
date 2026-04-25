// Инициализация AOS анимаций
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ========== СЧЕТЧИК ПРОСМОТРОВ ==========
let visitorCount = localStorage.getItem('visitorCount');
if (!visitorCount) {
    visitorCount = Math.floor(Math.random() * 150) + 80;
    localStorage.setItem('visitorCount', visitorCount);
}
const countEl = document.getElementById('visitor-count');
if (countEl) countEl.textContent = visitorCount;

// ========== ДАННЫЕ ДЛЯ ПОПАПОВ ==========
const projectsData = {
    "WildSpace": {
    description: "🚀 Проект дизайна карточки инфографики для WildSpace",
    gitLink: "https://github.com/Daiki20?tab=repositories"
},

"WILDBERRIES": {
    description: "🛍️ Дизайн для Wildberries — разработал карточки товаров, корзину и дополнительные элементы интерфейса по заданному ТЗ. Работа с нейросетью. Уделил внимание удобству пользователя, визуальной иерархии и адаптивности. Проект включает основную версию и два дополнения с улучшениями.",
    gitLink: "https://github.com/Daiki20?tab=repositories"
},

    "WILDBERRIES ПАРФЮМ 2": {
    description: "👃 Ещё одна серия дизайна карточек парфюма для Wildberries — акцент на элегантность, детали и визуальную привлекательность. Карточки адаптированы под мобильные устройства и хорошо конвертируют просмотры в покупки.",
    gitLink: "https://github.com/Daiki20?tab=repositories"
},

"WILDBERRIES ПАРФЮМ": {
    description: "👃 Дизайн карточек парфюма для Wildberries — создал визуально привлекательные карточки товаров с акцентом на флаконы и брендинг. Работал над композицией, светом и цветопередачей, чтобы передать атмосферу и премиальность парфюма.",
    gitLink: "https://github.com/Daiki20?tab=repositories"
},


    "PODSTAY": {
        description: "🔥 Учебный проект 'PodStay' — полностью адаптивная верстка, современный дизайн. Вложил душу в каждую деталь!",
        gitLink: "https://github.com/Daiki20?tab=repositories"
    },
    "PumpHunter": {
        description: "✨ PumpHunter — мой любимый проект. Разработал дизайн сайта и создал рекламные креативы. Каждая деталь продумана до мелочей!",
        gitLink: "https://github.com/Daiki20?tab=repositories"
    },
    "Дизайн маркетплейсов": {
        description: "📦 Дизайн для маркетплейсов — карточки товаров, баннеры, промо-страницы для Ozon и Wildberries. Адаптивные макеты, продуманный UX.",
        gitLink: "https://github.com/Daiki20?tab=repositories"
    },
    "Рекламный баннер в мебельную компанию": {
        description: "🛋️ Разработал рекламные баннеры для мебельной компании. Все выполнено четко по ТЗ",
        gitLink: "https://github.com/Daiki20?tab=repositories"
    },
};

// ========== ПОПАП ==========
const popupBg = document.getElementById("popup-bg");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupImage = document.getElementById("popup-image");
const popupGitLink = document.getElementById("popup-git-link");

// Функция открытия попапа
function openPopup(imageSrc, title) {
    if (!popupBg) return;
    
    // Устанавливаем картинку
    popupImage.src = imageSrc;
    popupImage.alt = title;
    
    // Устанавливаем заголовок
    popupTitle.textContent = title;
    
    // ========== ВОТ ЭТОТ БЛОК БЫЛ ПРОПУЩЕН ==========
    // Устанавливаем описание и ссылку на GitHub
    const projectData = projectsData[title];
    if (projectData) {
        popupDescription.textContent = projectData.description;
        popupGitLink.href = projectData.gitLink;
    } else {
        popupDescription.textContent = "Проект в разработке. Скоро здесь появится описание!";
        popupGitLink.href = "https://github.com/Daiki20";
    }
    // ================================================
    
    // Показываем попап
    popupBg.classList.add("open");
    document.body.style.overflow = "hidden";
}

// Функция закрытия попапа
function closePopup() {
    if (!popupBg) return;
    popupBg.classList.remove("open");
    document.body.style.overflow = "";
}

// ========== НАВЕШИВАЕМ ОБРАБОТЧИКИ НА ВСЕ КАРТИНКИ ==========
document.querySelectorAll('.open-popup-link').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Берем путь к картинке из атрибута data-img
        const imgSrc = this.getAttribute('data-img');
        // Берем название проекта из атрибута data-title
        const title = this.getAttribute('data-title');
        
        if (imgSrc) {
            openPopup(imgSrc, title);
        } else {
            console.error('Нет атрибута data-img у элемента:', this);
        }
    });
});

// ========== ЗАКРЫТИЕ ПОПАПА ==========
// Кнопкой закрытия
const closeBtn = document.getElementById("close-popup");
if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
}

// Кликом на фон
if (popupBg) {
    popupBg.addEventListener("click", function(event) {
        if (event.target === popupBg) {
            closePopup();
        }
    });
}

// Кнопкой ESC
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && popupBg && popupBg.classList.contains("open")) {
        closePopup();
    }
});

// ========== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК ==========
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

console.log("✅ Сайт загружен, попап работает!");
