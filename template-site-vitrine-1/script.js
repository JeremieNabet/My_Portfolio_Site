/**
 * Initializes mobile menu behavior.
 * Creator: Jeremie Nabet
 */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Enables smooth anchor navigation fallback.
 * Creator: Jeremie Nabet
 */
function initSmoothAnchors() {
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/**
 * Sets footer year dynamically.
 * Creator: Jeremie Nabet
 */
function initYear() {
  const year = document.getElementById("year");
  if (!year) return;
  year.textContent = String(new Date().getFullYear());
}

/**
 * Simulates contact form submit feedback.
 * Creator: Jeremie Nabet
 */
function initContactFormDemo() {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  const feedback = form.querySelector(".form-feedback");
  if (!feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    feedback.textContent = "Message sent. Connect this form to your backend endpoint.";
    form.reset();
  });
}

initMobileMenu();
initSmoothAnchors();
initYear();
initContactFormDemo();
