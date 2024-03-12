const asideButtonsContainer = document.getElementById("aside_buttons");
const insertionPoint = document.getElementById("inserted");
const additionalCssLink = document.getElementById("extra_css");

const fadeInAnimation = [{ opacity: 0}, { opacity: 0.33 },{ opacity: 0.66 }, { opacity: 1}];
const animationTiming = { duration: 300, iterations: 1 };

let siteData = fetchSiteData();
let currentLab = {};
let currentLabButton = null;
let currentAsideButton = null;

async function insertContent(htmlSource, cssLink = "") {
  let response = await fetch(htmlSource);
  if (response.status == 200) {
    insertionPoint.innerHTML = await response.text();
    insertionPoint.animate(fadeInAnimation, animationTiming);
    additionalCssLink.href = cssLink;
  } else {
    insertionPoint.innerHTML = `<p class="loading">${response.statusText}</p> <br><p class="loading">Sorry, the file has not been added yet</p>`;
    additionalCssLink.href = "";
  }
}

async function fetchSiteData(source = "/web2024/structure.json") {
  const response = await fetch(source);
  const { data } = await response.json();
  siteData = data;
}

for (button of document.querySelectorAll("button[id^='lb']")) {
    button.addEventListener("click", labButtonHandler);
}

function setActiveButton(previousButton, newButton) {
    if (previousButton) {
        previousButton.parentElement.classList.remove("active");
    }
    newButton.parentElement.classList.add("active");
}

function labButtonHandler(event) {
    currentLab = siteData.labs[event.target.id];
    setActiveButton(currentLabButton, event.target);
    currentLabButton = event.target;
    asideButtonsContainer.innerHTML = "";
    additionalCssLink.href = "";
    for (button in currentLab.buttons) {
        createAsideButton(button);
    }
    if (asideButtonsContainer.firstChild) {
        asideButtonsContainer.style.display = "flex";
        asideButtonsContainer.firstChild.firstChild.click();
    } else {
        insertionPoint.innerHTML = '<p class="loading">Sorry, the file has not been added yet</p>';
        asideButtonsContainer.style.display = "none";
    }
}

function createAsideButton(buttonName) {
    let buttonContainer = document.createElement("div");
    let buttonData = currentLab.buttons[buttonName];
    buttonContainer.classList.add("nav-item");
    let button = `<button id=${buttonName} class="button" type="button"> ${buttonData.title}</button>`;
    buttonContainer.innerHTML = button;
    let htmlFile = currentLab.rel_path + buttonData.html_file;
    let cssFile = currentLab.rel_path + buttonData.css_file;
    let files = { htmlFile, cssFile };
    buttonContainer.firstChild.addEventListener(
      "click",
      asideButtonHandler.bind(files)
    );
    asideButtonsContainer.append(buttonContainer);
}

async function asideButtonHandler(event) {
  await insertContent(this.htmlFile, this.cssFile);
  setActiveButton(currentAsideButton, event.target);
  currentAsideButton = event.target;
  currentAsideButton.parentElement.classList.add("active");
  PR.prettyPrint();
}