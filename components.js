/* =============================================================================
   components.js — behaviour for interactive components, via event delegation.
   Drop-in: <script src="components.js"></script> at the end of <body>.
   Wire components with data-attributes; no per-instance code needed.
     data-tab="group" + data-tab-name="x"   ·  data-panel="group:x"
     data-accordion                          (on a .accordion-trigger)
     data-dialog-open="id" / data-dialog-close
     data-dropdown="id"                      (toggles #id .menu or .popover)
     data-toast="message"
   ============================================================================= */

document.addEventListener('click', (e) => {
  /* Tabs */
  const tab = e.target.closest('[data-tab]');
  if (tab) {
    const group = tab.getAttribute('data-tab');
    const name = tab.getAttribute('data-tab-name');
    document.querySelectorAll(`[data-tab="${group}"]`).forEach(b => b.classList.toggle('active', b === tab));
    document.querySelectorAll(`[data-panel^="${group}:"]`).forEach(p =>
      p.classList.toggle('active', p.getAttribute('data-panel') === `${group}:${name}`));
    return;
  }

  /* Accordion */
  const acc = e.target.closest('[data-accordion]');
  if (acc) { acc.closest('.accordion-item')?.classList.toggle('open'); return; }

  /* Dialog */
  const open = e.target.closest('[data-dialog-open]');
  if (open) { document.getElementById(open.getAttribute('data-dialog-open'))?.classList.add('open'); return; }
  if (e.target.closest('[data-dialog-close]') || e.target.classList.contains('dialog-backdrop')) {
    e.target.closest('.dialog-backdrop')?.classList.remove('open');
    return;
  }

  /* Dropdown / popover toggle */
  const dd = e.target.closest('[data-dropdown]');
  if (dd) {
    const el = document.getElementById(dd.getAttribute('data-dropdown'));
    const wasOpen = el?.classList.contains('open');
    closeOverlays();
    if (el && !wasOpen) el.classList.add('open');
    return;
  }

  /* Toast */
  const toastBtn = e.target.closest('[data-toast]');
  if (toastBtn) { showToast(toastBtn.getAttribute('data-toast')); return; }

  /* Selecting a menu item, or clicking outside, closes overlays */
  if (e.target.closest('.menu-item') || !e.target.closest('.menu, .popover')) closeOverlays();
});

/* Escape closes dialogs + overlays */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.dialog-backdrop.open').forEach(d => d.classList.remove('open'));
  closeOverlays();
});

function closeOverlays() {
  document.querySelectorAll('.menu.open, .popover.open').forEach(el => el.classList.remove('open'));
}

function showToast(message) {
  let region = document.querySelector('.toast-region');
  if (!region) {
    region = document.createElement('div');
    region.className = 'toast-region';
    document.body.appendChild(region);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message || 'Done';
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
