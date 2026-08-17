document.addEventListener('DOMContentLoaded', function() {

  // ---------- ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ----------
  const langBtns = document.querySelectorAll('.lang-btn');
  const body = document.body;

  function setLanguage(lang) {
    langBtns.forEach(btn => {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-pressed', 'false');
    });
    const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
    if (activeBtn) {
      activeBtn.classList.add('is-active');
      activeBtn.setAttribute('aria-pressed', 'true');
    }

    body.classList.add('switching');
    setTimeout(() => {
      if (lang === 'ru') {
        body.classList.remove('lang-en');
        body.classList.add('lang-ru');
      } else {
        body.classList.remove('lang-ru');
        body.classList.add('lang-en');
      }
      body.classList.remove('switching');
    }, 50);

    const titleEl = document.getElementById('pageTitle');
    if (titleEl) {
      if (lang === 'ru') {
        titleEl.textContent = 'Павел Прокудин — писатель';
      } else {
        titleEl.textContent = 'Pavel Prokudin — Writer';
      }
    }

    localStorage.setItem('preferredLang', lang);
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  const savedLang = localStorage.getItem('preferredLang') || 'ru';
  setLanguage(savedLang);

  // ---------- ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ----------
  const themeToggle = document.querySelector('.theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    this.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // ---------- ГАМБУРГЕР-МЕНЮ ----------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
      this.setAttribute('aria-expanded', expanded);
      mobileMenu.setAttribute('aria-hidden', !expanded);
    });

    document.querySelectorAll('.mobile-menu__list a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ---------- КАРТОЧКИ-ФЛИПЫ ----------
  const cards = document.querySelectorAll('.card');
  const isMobile = window.innerWidth < 768;

  function toggleCard(card) {
    card.classList.toggle('flipped');
  }

  // Десктоп: переворот по hover
  if (!isMobile) {
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('flipped');
      });
      card.addEventListener('mouseleave', function() {
        this.classList.remove('flipped');
      });
    });
  }

  // Мобильные: переворот по клику на кнопку или на саму карточку
  cards.forEach(card => {
    const flipBtn = card.querySelector('.card-flip-btn');
    if (flipBtn) {
      flipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleCard(card);
      });
    }
    card.addEventListener('click', function(e) {
      if (window.innerWidth < 768) {
        if (e.target.closest('.card-flip-btn')) return;
        toggleCard(card);
      }
    });
  });

  // ---------- КАРУСЕЛЬ: ИНДИКАТОРЫ ----------
  const container = document.querySelector('.cards-container');
  const dotsContainer = document.getElementById('carouselDots');

  if (container && dotsContainer) {
    const cardCount = container.querySelectorAll('.card').length;
    const dots = [];

    for (let i = 0; i < cardCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dot.setAttribute('aria-label', `Перейти к карточке ${i + 1}`);
      dot.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        const card = container.querySelectorAll('.card')[index];
        if (card) {
          card.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    function updateActiveDot() {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.querySelector('.card').offsetWidth + 24;
      const activeIndex = Math.round(scrollLeft / cardWidth);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    }

    container.addEventListener('scroll', function() {
      if (window.innerWidth < 768) {
        updateActiveDot();
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth < 768) {
        updateActiveDot();
      }
    });
  }

  // ---------- КНОПКА "НАВЕРХ" ----------
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    if (window.scrollY > 100) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ---------- FADE-IN ----------
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 150 + index * 120);
  });

});
