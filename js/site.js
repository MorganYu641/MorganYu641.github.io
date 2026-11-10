// Shared script for every page. Each feature only runs if its markup exists.

// Navbar: reveal while the cursor is in the top 10% of the window
addEventListener('mousemove', (e) => {
  document.body.classList.toggle('navVisible', e.clientY < innerHeight * 0.1);
}, { passive: true });

// Carousel: one <figure class="slide"> per image; classes decide who is current/prev/next
document.querySelectorAll('.carousel').forEach((root) => {
  const slides = [...root.querySelectorAll('.slide')];
  const count = root.parentElement.querySelector('.car-count');
  const total = slides.length;
  let index = 0;

  function show(n) {
    index = (n + total) % total;
    const prev = (index - 1 + total) % total;
    const next = (index + 1) % total;
    slides.forEach((slide, k) => {
      slide.classList.toggle('is-current', k === index);
      slide.classList.toggle('is-prev', k === prev && k !== index);
      slide.classList.toggle('is-next', k === next && k !== index && k !== prev);
      slide.setAttribute('aria-hidden', String(k !== index));
    });
    if (count) count.textContent = `${index + 1} / ${total}`;
  }

  root.querySelector('.prev').addEventListener('click', () => show(index - 1));
  root.querySelector('.next').addEventListener('click', () => show(index + 1));
  slides.forEach((slide, k) => slide.addEventListener('click', () => {
    if (k !== index) show(k);
  }));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  show(0);
});

// Achievements: expand/collapse (height animation is pure CSS)
document.querySelectorAll('.award-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.closest('.award').classList.toggle('is-open', !open);
  });
});
