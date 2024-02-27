const asideButtonsBlock = document.getElementById("aside_buttons");
const destinationHTML = document.getElementById("inserted");
const extraCssLink = document.getElementById("extra_css"); // додатковий CSS вкладених блоків

const fadeIn = [{ opacity: 0}, { opacity: 0.33 },{ opacity: 0.66 }, { opacity: 1}];    // константи для анімації
const timing = { duration: 300, iterations: 1 };                                         //

let site_data = getSiteData(); // структура з project_structure.json
let current_lb = {};           // об'єкт поточної лаби
let current_lb_btn = null;
let current_aside_btn = null;

async function insertBlock(sourceHTML, linkCSS = "") {
  let myObject = await fetch(sourceHTML);
  if (myObject.status == 200) {
    destinationHTML.innerHTML = await myObject.text();
    destinationHTML.animate(fadeIn, timing);
    extraCssLink.href = linkCSS;
  } else {
    destinationHTML.innerHTML = `<p class="loading">${myObject.statusText}</p> <br><p class="loading">Sorry, the file has not been added yet</p>`;
    extraCssLink.href = "";
  }
}
async function getSiteData(source = "project_structure.json") {
  const response = await fetch(source);
  const { data } = await response.json();
  site_data = data;
}

for (button of document.querySelectorAll("button[id^='lb']")) {
  button.addEventListener("click", lbButtonHandler);
}

function setCurrentBtnActive(old_button, new_btn) {
  if (old_button) {
   old_button.parentElement.classList.remove("active");
  }
  new_btn.parentElement.classList.add("active");
}

function lbButtonHandler(event) {
  current_lb = site_data.labs[event.target.id];
  setCurrentBtnActive(current_lb_btn, event.target);
  current_lb_btn = event.target;
  asideButtonsBlock.innerHTML = "";
  extraCssLink.href = "";
  for (button in current_lb.buttons) {
    createAsideButton(button);
  }
  if (asideButtonsBlock.firstChild) {
    asideButtonsBlock.style.display = "flex";
    asideButtonsBlock.firstChild.firstChild.click();
  } else {
    destinationHTML.innerHTML = '<p class="loading">Sorry, the file has not been added yet</p>';
    asideButtonsBlock.style.display = "none";
  }
}

function createAsideButton(button_name) {
  let div_button = document.createElement("div");
  let button_data = current_lb.buttons[button_name];
  div_button.classList.add("nav-item");
  let button = `<button id=${button_name} class="button" type="button"> ${button_data.title}</button>`;
  div_button.innerHTML = button;
  let html_file = current_lb.rel_path + button_data.html_file;
  let css_file = current_lb.rel_path + button_data.css_file;
  let files = { html_file, css_file };
  div_button.firstChild.addEventListener(
    "click",
    asideButtonHandler.bind(files)
  );
  asideButtonsBlock.append(div_button);
}

async function asideButtonHandler(event) {

  await insertBlock(this.html_file, this.css_file);
  setCurrentBtnActive(current_aside_btn, event.target);
  current_aside_btn = event.target;
  current_aside_btn.parentElement.classList.add("active");
  PR.prettyPrint(); // бібліотека code-prettify - автоматично розфарбовує код в стилі IDE
}
