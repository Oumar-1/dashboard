const body = document.body;
const screen = document.getElementById("screen");
const navLinks = document.querySelectorAll(".nav-link");
const searchBar = document.querySelector("[data-search-bar]");
let iconsUsed = [];
load_screen()
function load_screen(path) {
  if (!path || typeof path != "string") throw Error("specify path for screen");
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
  const active = document.querySelector(".nav-links [data-active]");
  // create an alias for transform:translateY() css property
  Object.defineProperties(active, {
    ty: {
      get() {
        let transform = window.getComputedStyle(this).transform;
        return new WebKitCSSMatrix(transform).m42;
      },
      set(val) {
        return (this.style.transform = `translateY(${val}px)`);
      },
    },
  });

  navLinks[0].classList.add("active");
  let holder = navLinks[0];
  let calcNextMove = (nextElement) => {
    let top1 = active.getBoundingClientRect().top,
      top2 = nextElement.getBoundingClientRect().top;
    return top2 - top1;
  };
  // move the active line to the currect active screen
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      active.ty += calcNextMove(link);
      holder.classList.remove("active");
      link.classList.add("active");
      holder = link;
    });
  });
})();
