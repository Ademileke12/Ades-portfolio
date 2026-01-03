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
  applyTheme("dark");
};

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("theme-light");
    const nextTheme = isLight ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });
}

initTheme();

const searchInput = document.querySelector("#page-search");

const clearSearchHits = () => {
  document.querySelectorAll(".search-hit").forEach((node) => {
    node.classList.remove("search-hit");
  });
};

const runSearch = (query) => {
  clearSearchHits();
  if (!query) {
    return;
  }
  const candidates = document.querySelectorAll(
    ".editor h1, .editor h2, .editor h3, .editor p, .editor a, .editor span"
  );
  let firstHit = null;
  candidates.forEach((node) => {
    if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
      node.classList.add("search-hit");
      if (!firstHit) {
        firstHit = node;
      }
    }
  });
  if (firstHit) {
    firstHit.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    runSearch(event.target.value.trim());
  });
}
