const body = document.body;
const screen = document.getElementById("screen");
const navLinks = document.querySelectorAll(".nav-link");
const navLinksActive = document.querySelector(".nav-links [data-active]");
const searchBar = document.querySelector("[data-search-bar]");
let iconsUsed = [];

function load_screen(path) {
  if (path == "" || typeof path != "string") return;
  fetch("./" + path)
    .then((response) => response.text())
    .then((html) => {
      screen.innerHTML = html;
    })
    .catch((error) => {
      console.warn(error);
    });
}
var a = navLinksActive;
var b = navLinks[0];
let p = window.getComputedStyle(b).paddingTop;

// a.style.top += `5px`;

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // navLinksActive.
  });
});
