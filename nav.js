/* =============================================================================
   nav.js — shared sidebar navigation + theme controller
   Drop-in: <script src="nav.js"></script> at the end of <body>.
   Initial theme is set inline in each page <head> (anti-flash).
   All navigation styling lives in base.css.
   ============================================================================= */

const pages = [
  { label: 'Typography', href: 'typography.html' },
  { label: 'Colour',     href: 'colour.html' },
  { label: 'Spacing',    href: 'spacing.html' },
  { label: 'Radius',     href: 'radius.html' },
  { label: 'Shadow',     href: 'shadow.html' },
  { label: 'Motion',     href: 'motion.html' },
];

const current = window.location.pathname.split('/').pop() || 'typography.html';


/* ---------- Theme ---------- */
function setTheme(next) {
  const root = document.documentElement;
  root.setAttribute('data-theme-transitioning', '');
  root.setAttribute('data-theme', next);
  localStorage.setItem('ds-theme', next);
  updateToggleIcons();
  setTimeout(() => root.removeAttribute('data-theme-transitioning'), 250);
}

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  setTheme(isLight ? 'dark' : 'light');
}

function updateToggleIcons() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.querySelectorAll('.ds-sun').forEach(el => el.style.display = isLight ? 'block' : 'none');
  document.querySelectorAll('.ds-moon').forEach(el => el.style.display = isLight ? 'none' : 'block');
}

/* Follow the OS appearance setting live, like Google Calendar */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  setTheme(e.matches ? 'dark' : 'light');
});


/* ---------- Mobile sidebar open / close ---------- */
function openNav() {
  document.getElementById('ds-nav').classList.add('open');
  document.getElementById('ds-backdrop').classList.add('visible');
}

function closeNav() {
  document.getElementById('ds-nav').classList.remove('open');
  document.getElementById('ds-backdrop').classList.remove('visible');
}


/* ---------- Icons ---------- */
const sunSVG = `<svg class="ds-sun" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
const moonSVG = `<svg class="ds-moon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;


/* ---------- Build DOM ---------- */
const nav = document.createElement('nav');
nav.id = 'ds-nav';
nav.innerHTML = `
  <ul class="ds-nav-list">
    ${pages.map(p => `<li><a href="${p.href}" class="ds-nav-link${current === p.href ? ' active' : ''}">${p.label}</a></li>`).join('')}
  </ul>
  <button class="ds-nav-toggle" aria-label="Toggle theme">${sunSVG}${moonSVG}</button>
`;
nav.querySelector('.ds-nav-toggle').addEventListener('click', toggleTheme);

const backdrop = document.createElement('div');
backdrop.id = 'ds-backdrop';
backdrop.addEventListener('click', closeNav);

const mobileBar = document.createElement('div');
mobileBar.id = 'ds-mobile-bar';
mobileBar.innerHTML = `
  <button id="ds-hamburger" aria-label="Open navigation">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
    </svg>
  </button>
  <button id="ds-mobile-toggle" aria-label="Toggle theme">${sunSVG}${moonSVG}</button>
`;
mobileBar.querySelector('#ds-hamburger').addEventListener('click', openNav);
mobileBar.querySelector('#ds-mobile-toggle').addEventListener('click', toggleTheme);

document.body.append(backdrop, nav, mobileBar);
document.body.classList.add('ds-layout');

updateToggleIcons();
