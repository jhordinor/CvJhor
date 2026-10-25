'use strict';

const root = document.documentElement;
const nav = document.getElementById('primaryNav');
const menuButton = document.getElementById('menuButton');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav a');
const savedTheme = (() => { try { return localStorage.getItem('portfolio-theme'); } catch { return null; } })();
if (savedTheme === 'light') root.setAttribute('data-theme', 'light');

function closeMenu() {
  if (!nav || !menuButton) return;
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 940) closeMenu(); });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    if (next === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem('portfolio-theme', next); } catch { /* Private browsing may disable storage. */ }
  });
}

const year = document.getElementById('currentYear');
if (year) year.textContent = String(new Date().getFullYear());

// Progressive enhancement: everything is visible if IntersectionObserver is unavailable.
const revealElements = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealElements.forEach(el => el.classList.add('reveal-pending'));
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .05, rootMargin: '0px 0px 50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
}

const progress = document.getElementById('scrollProgress');
let frame = 0;
function updateProgress() {
  frame = 0;
  if (!progress) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (maxScroll > 0 ? Math.max(0, Math.min(100, window.scrollY / maxScroll * 100)) : 0) + '%';
}
window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateProgress); }, { passive:true });
window.addEventListener('resize', updateProgress);
updateProgress();

const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-32% 0px -60% 0px' });
  sections.forEach(section => navObserver.observe(section));
}

const copyButton = document.getElementById('copyEmail');
const feedback = document.getElementById('copyFeedback');
if (copyButton && feedback) {
  copyButton.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw Error('Clipboard no disponible');
      await navigator.clipboard.writeText('jhordinor@gmail.com');
      feedback.textContent = 'Correo copiado.';
    } catch {
      feedback.textContent = 'Selecciona el correo para copiarlo o abrir tu aplicación de email.';
    }
  });
}


// Ejemplos de programación: pestañas accesibles, sin dependencias externas.
const languageTabs = [...document.querySelectorAll('.code-tab[role="tab"]')];
function showLanguageTab(tab, focus = false) {
  if (!tab) return;
  for (const item of languageTabs) {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    if (panel) panel.hidden = !selected;
  }
  if (focus) tab.focus();
}
for (const tab of languageTabs) {
  tab.addEventListener('click', () => showLanguageTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let index = languageTabs.indexOf(tab);
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = languageTabs.length - 1;
    if (event.key === 'ArrowRight') index = (index + 1) % languageTabs.length;
    if (event.key === 'ArrowLeft') index = (index - 1 + languageTabs.length) % languageTabs.length;
    showLanguageTab(languageTabs[index], true);
  });
}
