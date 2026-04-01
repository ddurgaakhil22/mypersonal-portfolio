// Mobile Menu Toggle
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Validate if constant exists
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    const icon = navToggle.querySelector("i");
    if (icon) {
      if (navMenu.classList.contains("show-menu")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });
}

// Close Menu on Link Click
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
  
  // Revert the hamburger icon
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle) {
    const icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// Highlight Active Link on Scroll
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector('.nav__list a[href*=' + sectionId + ']');
    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Change Header Background on Scroll
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// Show/Hide Scroll-to-Top Button
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

// Theme Toggle (Dark/Light)
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";

// Automatically set to dark theme on entry as requested
document.body.classList.remove(lightTheme);
themeButton.classList.remove("fa-sun");
themeButton.classList.add("fa-moon");
localStorage.setItem("selected-theme", "dark");
localStorage.setItem("selected-icon", "fa-moon");

// Get current theme and icon from DOM
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? "light" : "dark";
const getCurrentIcon = () => themeButton.classList.contains("fa-sun") ? "fa-sun" : "fa-moon";

// Manually toggle theme via button
themeButton.addEventListener("click", () => {
  // Toggle the light theme class
  document.body.classList.toggle(lightTheme);
  
  // Toggle the icon classes correctly
  if (document.body.classList.contains(lightTheme)) {
    themeButton.classList.remove("fa-moon");
    themeButton.classList.add("fa-sun");
  } else {
    themeButton.classList.remove("fa-sun");
    themeButton.classList.add("fa-moon");
  }
  
  // Save the theme and icon selection
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    
    // Forcefully close mobile menu whenever any anchor link is tapped!
    const navMenu = document.getElementById("nav-menu");
    if (navMenu && navMenu.classList.contains("show-menu")) {
      navMenu.classList.remove("show-menu");
      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) {
        const icon = navToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    }

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});