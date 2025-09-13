// --- Aquí va todo tu JS original ---

// NUEVO: partículas, tilt y glow para las tarjetas
import { gsap } from 'gsap';

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', `${x}%`);
    card.style.setProperty('--glow-y', `${y}%`);
    card.style.setProperty('--glow-intensity', '1');

    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    gsap.to(card, { rotateX, rotateY, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
    card.style.setProperty('--glow-intensity', '0');
  });

  card.addEventListener('click', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position:absolute;
      width:200px;
      height:200px;
      border-radius:50%;
      background: radial-gradient(circle, rgba(76,175,80,0.4) 0%, rgba(76,175,80,0.2) 30%, transparent 70%);
      left:${x-100}px;
      top:${y-100}px;
      pointer-events:none;
      z-index:1000;
    `;
    card.appendChild(ripple);
    gsap.fromTo(ripple, { scale:0, opacity:1 }, { scale:1, opacity:0, duration:0.8, ease:'power2.out', onComplete:()=>ripple.remove() });
  });
});
