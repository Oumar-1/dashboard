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

var p = window.getComputedStyle(navLinks[0]).paddingTop,
  a = navLinksActive;
// create 
Object.defineProperties(a, {
  ty: {
    get() {
      let style = window.getComputedStyle(this).transform;
      return new WebKitCSSMatrix(style).m42;
    },
    set(val) {
      return (this.style.transform = `translateY(${val}px)`);
    },
  },
});
a.ty = parseInt(p);

calculateDistance(navLinks[3]);
function calculateDistance(nextElement) {
  let cury = a.getBoundingClientRect().top;
  let nexty = nextElement.getBoundingClientRect().top;
  return nexty - cury;
}
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    a.ty += calculateDistance(link) + parseInt(window.getComputedStyle(link).paddingTop)
  });
});
