(function() {
  const btn = document.getElementById('resumeFabBtn');
  const menu = document.getElementById('resumeFabMenu');
  if (!btn || !menu) return;

  function openMenu() {
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', onDocClick, true);
    document.addEventListener('keydown', onKeyDown, true);
  }

  function closeMenu() {
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', onDocClick, true);
    document.removeEventListener('keydown', onKeyDown, true);
  }

  function onDocClick(e) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeMenu();
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu(); else openMenu();
  });
})();
