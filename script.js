/* ────────────────────────────────────────
   HAMBURGER / MOBILE MENU
──────────────────────────────────────── */
const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose   = document.getElementById('mobileClose');
const mobileLinks   = mobileMenu.querySelectorAll('a');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  mobileOverlay.style.display = 'block';
  requestAnimationFrame(() => mobileOverlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { mobileOverlay.style.display = 'none'; }, 350);
}

function toggleMenu() {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
}

hamburger.addEventListener('click', toggleMenu);
mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ────────────────────────────────────────
   SCROLL-TO-TOP BUTTON
──────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ────────────────────────────────────────
   NAVBAR SHADOW ON SCROLL
──────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 50
    ? '0 4px 30px rgba(0,0,0,0.12)'
    : '0 2px 20px rgba(0,0,0,0.08)';
});

/* ────────────────────────────────────────
   COUNTER ANIMATION
──────────────────────────────────────── */
function animateCounters() {
  const counters = document.querySelectorAll('[data-target]');
  counters.forEach(counter => {
    const target    = +counter.getAttribute('data-target');
    const isThousand = target >= 1000;
    let current     = 0;
    const increment = target / 60;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      if (isThousand) {
        counter.textContent = Math.floor(current).toLocaleString('pt-BR') + '+';
      } else if (target === 1) {
        counter.textContent = Math.floor(current) + 'h';
      } else {
        counter.textContent = Math.floor(current) + '+';
      }
    }, 25);
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.3 });

heroObserver.observe(document.getElementById('hero'));

/* ────────────────────────────────────────
   ACTIVE NAV LINK ON SCROLL
──────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function setActiveLink() {
  const navHeight   = navbar.offsetHeight;
  const scrollMid   = window.scrollY + navHeight + 60;
  let currentId     = '';

  sections.forEach(sec => {
    if (sec.offsetTop <= scrollMid) {
      currentId = sec.id;
    }
  });

  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

const productCards = document.querySelectorAll('.produto-card');
const whatsappLinks = document.querySelectorAll('a[href*="wa.me/"]');
const whatsappLink = whatsappLinks[0];
const whatsappBaseUrl = whatsappLink ? whatsappLink.href.split('?')[0] : 'https://wa.me/554196176580';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function openWhatsApp(message) {
  window.open(`${whatsappBaseUrl}?text=${encodeURIComponent(message)}`, '_blank');
}

whatsappLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp(`${getGreeting()}, vim pelo site e gostaria de um atendimento.`);
  });
});

productCards.forEach(card => {
  card.addEventListener('click', () => {
    const productName = card.querySelector('.produto-name')?.textContent?.trim() || 'produto';
    const message = `${getGreeting()}, vim pelo site e gostaria de saber mais sobre *${productName}*.`;
    openWhatsApp(message);
  });
});

/* ────────────────────────────────────────
   HERO CAROUSEL
──────────────────────────────────────── */
const heroSlides  = document.querySelectorAll('.hero-slide');
const heroDots    = document.querySelectorAll('.carousel-dot');
const prevBtn     = document.querySelector('.carousel-prev');
const nextBtn     = document.querySelector('.carousel-next');
let currentSlide  = 0;
let carouselTimer = null;

function goToSlide(index) {
  heroSlides[currentSlide].classList.remove('active');
  heroDots[currentSlide].classList.remove('active');
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides[currentSlide].classList.add('active');
  heroDots[currentSlide].classList.add('active');
}

function startCarousel(delay = 5000) {
  carouselTimer = setInterval(() => goToSlide(currentSlide + 1), delay);
}

function resetCarousel(delay = 5000) {
  clearInterval(carouselTimer);
  startCarousel(delay);
}

prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetCarousel(10000); });
nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetCarousel(10000); });

heroDots.forEach((dot, i) => {
  dot.addEventListener('click', () => { goToSlide(i); resetCarousel(10000); });
});

startCarousel();

/* ────────────────────────────────────────
   SMOOTH SCROLL FOR ANCHOR LINKS
──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
