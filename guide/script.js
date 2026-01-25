const cards = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("translate-y-10", "opacity-0");
        entry.target.classList.add("translate-y-0", "opacity-100");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach(card => observer.observe(card));
