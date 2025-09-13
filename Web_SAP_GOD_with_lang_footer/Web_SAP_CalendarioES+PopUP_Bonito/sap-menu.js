// sap-menu.js (versión robusta)
// Soporta el botón .sap-hamburger y cierra cuando se pulsa un enlace o al clicar fuera.

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const burger = document.querySelector('.sap-hamburger') || document.querySelector('.menu-toggle') || null;
  const navUL = document.querySelector('nav ul');

  function openMenu() {
    body.classList.add('menu-open');
  }
  function closeMenu() {
    body.classList.remove('menu-open');
  }
  function toggleMenu() {
    body.classList.toggle('menu-open');
  }

  if (burger) {
    burger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });
  }

  // Cerrar al pulsar cualquiera de los enlaces del menú
  if (navUL) {
    navUL.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // Cerrar al pulsar fuera del nav (solo si el menú está abierto)
  document.addEventListener('click', (e) => {
    if (!body.classList.contains('menu-open')) return;
    // Si el click no fue dentro del nav ni sobre el burger, cerramos
    const clickedInsideNav = e.target.closest && e.target.closest('nav');
    const clickedBurger = e.target.closest && e.target.closest('.sap-hamburger, .menu-toggle');
    if (!clickedInsideNav && !clickedBurger) {
      closeMenu();
    }
  });

  // Esc key para cerrar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  // (Opcional) Asegurar comportamiento en resize: si se cambia a desktop, cerramos menú
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
});
