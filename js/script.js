const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const sectionAnchors = Array.from(mainNav?.querySelectorAll('a[href^="#"]') || []);
const trackedSections = sectionAnchors
  .map((anchor) => document.querySelector(anchor.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && trackedSections.length && sectionAnchors.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        sectionAnchors.forEach((anchor) => {
          anchor.classList.toggle("active", anchor.getAttribute("href") === id);
        });
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-25% 0px -55% 0px",
    }
  );

  trackedSections.forEach((section) => navObserver.observe(section));
}

function renderGallery() {
  const gallery = document.getElementById("shopGallery");
  if (!gallery) return;

  const path = gallery.dataset.galleryPath || "images/shop/";
  const imageList = (gallery.dataset.images || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (imageList.length === 0) return;

  const placeholder =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#eef3f8'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#4b5f76' font-family='Arial' font-size='26'>Shop Image Placeholder</text></svg>`
    );

  imageList.forEach((filename, index) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";

    const img = document.createElement("img");
    img.src = `${path}${filename}`;
    img.alt = `IRV Traders shop image ${index + 1}`;
    img.loading = "lazy";
    img.onerror = () => {
      img.src = placeholder;
    };

    const caption = document.createElement("figcaption");
    caption.className = "gallery-caption";
    caption.textContent = `Shop Image ${index + 1}`;

    figure.append(img, caption);
    gallery.appendChild(figure);
  });
}

renderGallery();