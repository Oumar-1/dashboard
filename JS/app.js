const body = document.body;
const screen = document.getElementById("screen");
const navLinks = document.querySelectorAll("[data-nav-links]");
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
imgsImport();
function imgsImport() {
  navLinks.forEach((navLink) => {
    fetch("../imgs/icons/nav-icons/" + navLink.id + ".svg")
      .then((res) => res.text())
      .then(
        (data) =>
          // remove live-server injection t
          // his code must be remove when uploaded on github or any other server
          data.split("<!-- Code injected by live-server -->")[0] + "</svg>"
      )
      .then((result) => {
        // parse an svg from the text retruned from the data
        const svg = new DOMParser().parseFromString(result, "text/html").body.firstChild;
        // preappend the svg
        const div = document.createElement("div");
        div.className ="icon-holder";
        div.appendChild(svg)
        navLink.prepend(div);
      })
      .catch((resone) => {
        throw Error(resone);
      });
  });
}

navLinks.forEach(e =>{
  e.addEventListener("click",(ev) =>{
    console.log(e)
  })  
})