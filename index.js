function scrollToStart() {
  const list = document.querySelector(".project-grid");
  if (!list) {
    return;
  }
  list.scrollTo({
    left: 0,
    behavior: "smooth",
  });
}

function scrollToEnd() {
  const list = document.querySelector(".project-grid");
  if (!list) {
    return;
  }
  list.scrollTo({
    left: list.scrollWidth,
    behavior: "smooth",
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const delay = entry.target.getAttribute("data-delay");
      if (delay) {
        entry.target.style.transitionDelay = delay;
      }
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const themeToggle = document.querySelector("#theme-toggle");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

const getStoredTheme = () => {
  return localStorage.getItem("portfolio-theme");
};

const applyTheme = (theme) => {
  document.body.classList.toggle("theme-light", theme === "light");
};

const initTheme = () => {
  const stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
    return;
  }
  applyTheme(prefersLight.matches ? "light" : "dark");
};

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("theme-light");
    const nextTheme = isLight ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });
}

prefersLight.addEventListener("change", (event) => {
  const stored = getStoredTheme();
  if (stored) {
    return;
  }
  applyTheme(event.matches ? "light" : "dark");
});

initTheme();
