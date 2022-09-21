const body = document.body;
const screen = document.getElementById("screen");
const navLinks = document.querySelectorAll(".nav-link");
const searchBar = document.querySelector("[data-search-bar]");
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

// fetch for icons
function fetchIcon(svgName) {
  if (svgName === "" || svgName == undefined)
    return console.error(new Error("pass svg name"));
  return fetch("imgs/icons/" + svgName + ".svg")
    .then((res) => res.text())
    .then((text) => {
      // remove live-server injection
      if (text.indexOf("<!-- Code injected by live-server -->") !== -1) {
        text =
          text.split("<!-- Code injected by live-server -->")[0] + "</svg>";
      }
      return text;
    })
    .then(
      (result) =>
        // parse an svg from the plain text result
        new DOMParser().parseFromString(result, "text/html").body.firstChild
    )
    .catch((resone) => {
      throw Error(resone);
    });
}
// add icons to the DOM
(function () {
  // gather all icons containers
  const all = document.querySelectorAll("[data-icon-wraper]");
  all.forEach((container) => {
    // split data come from data-attribute
    const data = container.dataset.iconWraper;

    fetchIcon(data).then((res) => container.appendChild(res));
  });
})();

