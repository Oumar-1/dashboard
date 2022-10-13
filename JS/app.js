const body = document.body;
const screen = document.getElementById("screen");
const navLinks = document.querySelectorAll(".nav-link");
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

(function () {
  let holder = null;

  const active = document.querySelector(".nav-links [data-active]");
  // create an alias for transform:translateY() css property
  Object.defineProperties(active, {
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

  navLinks[0].classList.add("active");
  holder = navLinks[0];
  // move the active line to the currect active screen
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      active.ty += calculateDistance(link);
      holder.classList.remove("active");
      link.classList.add("active");
      holder = link;
    });
  });
  function calculateDistance(nextElement) {
    let cury = active.getBoundingClientRect().top;
    let nexty = nextElement.getBoundingClientRect().top;
    return nexty - cury;
  }
})();
