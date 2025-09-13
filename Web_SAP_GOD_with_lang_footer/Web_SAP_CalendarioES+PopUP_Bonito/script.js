// --- Scroll Navbar ---
window.addEventListener('scroll', () => {
  const n = document.getElementById('navbar');
  if(window.scrollY > 50) {
    n.style.background = '#3a5d3d';
    n.classList.add('scrolled');
  } else {
    n.style.background = 'rgba(0,0,0,0.5)';
    n.classList.remove('scrolled');
  }
});

// --- Intro: logo vuela a la navbar ---
document.addEventListener("DOMContentLoaded", () => {
  const introLogo  = document.getElementById("intro-logo");
  const overlay    = document.getElementById("intro-overlay");
  const navbarLogo = document.getElementById("navbar-logo");

  if (!introLogo || !overlay || !navbarLogo) return;

  const launchLogo = () => {
    if (document.body.classList.contains("loaded")) return;

    const startRect  = introLogo.getBoundingClientRect();
    const targetRect = navbarLogo.getBoundingClientRect();

    const deltaX = targetRect.left - startRect.left;
    const deltaY = targetRect.top  - startRect.top;
    const scale  = targetRect.width / startRect.width;

    introLogo.style.transition = "transform 1.5s ease-in-out";
    introLogo.style.transform  = `translate(${deltaX}px, ${deltaY}px) scale(${scale}) rotateY(0deg)`;

    setTimeout(() => {
      navbarLogo.style.opacity = "1";
      document.body.classList.add("loaded");

      setTimeout(() => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        // === Añadimos listeners del menú justo después de quitar overlay ===
        initMenuListeners();
      }, 900);
    }, 1500);
  };

  const navEntries = performance.getEntriesByType("navigation");
  const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

  if (isReload || !sessionStorage.getItem("introShown")) {
    introLogo.addEventListener("click", launchLogo);
    setTimeout(launchLogo, 4000);
    if (!isReload) sessionStorage.setItem("introShown", "true");
  } else {
    document.body.classList.add("loaded");
    overlay.style.display = "none";
    navbarLogo.style.opacity = "1";
    // === Añadimos listeners del menú directamente si el overlay ya está oculto ===
    initMenuListeners();
  }
});

// --- Scroll Reveal ---
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));
});

// --- Material esgrima ---
const material = [
  { nombre: "Careta", descripcion: "Protege la cap i la cara durant les competicions.", img: "img/careta.jpg" },
  { nombre: "Espasa", descripcion: "Espasa d'alumini per entrenaments i competicions.", img: "img/espasa.jpg" },
  { nombre: "Peto", descripcion: "Protecció del tronc per evitar lesions.", img: "img/peto.jpg" },
  { nombre: "Pantalons", descripcion: "Pantalons resistents adaptats a l'esgrima.", img: "img/pantalons.jpg" }
];

const container = document.querySelector('.material .card-grid');

if (container) {
  material.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card__header">
        <h3 class="card__title">${item.nombre}</h3>
      </div>
      <div class="card__content">
        <p class="card__description">${item.descripcion}</p>
        <img src="${item.img}" alt="${item.nombre}">
      </div>
    `;
    container.appendChild(card);
  });
}

// --- Función para inicializar los listeners del menú ---
function initMenuListeners() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu       = document.getElementById("menu");
  const menuClose  = document.getElementById("cerrar-menu");

  if (!menuToggle || !menu || !menuClose) return;

  // Toggle menú
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });

  // Cerrar menú con botón ✕  
  menuClose.addEventListener("click", () => {
    menu.classList.remove("active");
    menuToggle.classList.remove("open");
  });

  // Cerrar menú al hacer click en enlace
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuToggle.classList.remove("open");
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') && !menu.contains(e.target) && e.target !== menuToggle) {
      menu.classList.remove('active');
      menuToggle.classList.remove('open');
    }
  });
}

/* ============================
   🎯 Animación categorías
   ============================ */
document.addEventListener("DOMContentLoaded", () => {
  const categoryCards = document.querySelectorAll(".category-card");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    categoryCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

/* ============================
   📌 Desplegar subcategorías
   ============================ */
document.addEventListener("DOMContentLoaded", () => {
  const mainCards = document.querySelectorAll(".main-card");
  const subCards  = document.querySelectorAll(".sub-card");

  mainCards.forEach(card => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-target");

      // Comprobamos si ya están visibles
      const isAlreadyVisible = subCards[0].classList.contains("show") && subCards[0].classList.contains(target);

      // Ocultamos todas primero
      subCards.forEach(sc => sc.classList.remove("show"));

      // Mostramos solo las correspondientes si no estaban visibles
      if (!isAlreadyVisible) {
        subCards.forEach(sc => {
          if (sc.classList.contains(target)) {
            sc.classList.add("show");
          }
        });
      }
    });
  });
});
