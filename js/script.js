"use strict";
/* Duda Estamparia & Artigos Esportivos — interações da landing page */
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setupHeaderScrollState();
    setupMobileMenu();
    setupScrollSpy();
    setupRevealOnScroll();
    setupBackToTop();
});
function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
}
function setupHeaderScrollState() {
    const header = document.getElementById('header');
    if (!header)
        return;
    const updateState = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    updateState();
    window.addEventListener('scroll', updateState, { passive: true });
}
function setupMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav)
        return;
    const closeMenu = () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape')
            closeMenu();
    });
}
function setupScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    if (navLinks.length === 0)
        return;
    const sections = navLinks
        .map((link) => {
        const id = link.getAttribute('href');
        if (!id || !id.startsWith('#'))
            return null;
        const section = document.querySelector(id);
        return section ? { link, section } : null;
    })
        .filter((entry) => entry !== null);
    if (sections.length === 0)
        return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const match = sections.find((s) => s.section === entry.target);
            if (!match)
                return;
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove('active'));
                match.link.classList.add('active');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(({ section }) => observer.observe(section));
}
function setupRevealOnScroll() {
    const items = Array.from(document.querySelectorAll('.reveal'));
    if (items.length === 0)
        return;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach((item) => observer.observe(item));
}
function setupBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button)
        return;
    const updateVisibility = () => {
        button.classList.toggle('is-visible', window.scrollY > 480);
    };
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
}
