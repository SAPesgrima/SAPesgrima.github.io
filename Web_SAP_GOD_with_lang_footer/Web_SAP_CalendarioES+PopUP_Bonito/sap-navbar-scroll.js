
// === SAP Navbar scroll transparency ===
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('navbar') || document.querySelector('header');
  if (!header) return;

  const apply = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-transparent');
      header.classList.remove('is-solid');
    } else {
      header.classList.add('is-solid');
      header.classList.remove('is-transparent');
    }
  };

  apply();
  window.addEventListener('scroll', apply, { passive: true });
  window.addEventListener('resize', apply);
});
