const body = document.body;
const screen = document.getElementById("screen");
const navLinks = document.querySelectorAll("[data-nav-links]");
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

navLinks.forEach((navLink) => pushSVGIcon(navLink, navLink.id));

function pushSVGIcon(parent, svgName, position = "before", wraper = true) {
  // check if user passed paren and svgName arguments
  if (arguments.length < 2)
    return console.error(new Error("arguments are not complete"));

    // fetch API require img name and go grap the image 
  fetch("imgs/icons/nav-icons/" + svgName + ".svg")
    .then((res) => res.text())
    .then((text) => {
      // remove live-server injection
      // this code must be remove when uploaded on github or any other server
      if (text.indexOf("<!-- Code injected by live-server -->") !== -1) {
        text =
          text.split("<!-- Code injected by live-server -->")[0] + "</svg>";
      }
      return text;
    })
    .then((result) => {
      // parse an svg from the plain text result
      let svg = new DOMParser().parseFromString(result, "text/html");
      svg = svg.body.firstChild;
      // append svg to the DOM with or without a wraper element
      if (wraper === true) {
        const div = document.createElement("div");
        div.className = "icon-holder";
        div.appendChild(svg);
        if (position === "before") parent.prepend(div);
        else if (position === "after") parent.appendChild(div);
      } else if (wraper === false) {
        if (position === "before") parent.prepend(svg);
        else if (position === "after") parent.appendChild(svg);
      }
    })
    .catch((resone) => {
      throw Error(resone);
    });
}
