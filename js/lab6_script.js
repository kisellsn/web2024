function lab6_task1(){
     let inputText = document.getElementById("inputField").value;
     console.log(inputText);
}

function lab6_task3() {
      var inputField = document.getElementById("inputField");
      var toggleButton = document.getElementById("toggleButton");

      if (inputField.getAttribute("type") === "password") {
            inputField.setAttribute("type", "text");
            toggleButton.textContent = "Hide";
      } else {
            inputField.setAttribute("type", "password");
            toggleButton.textContent = "Show";
      }
}

window.addEventListener('click', function(event) {
      try {
            var placeDiv = document.getElementById('place');
            var clickedInside = placeDiv.contains(event.target);
            console.log(clickedInside);
      }catch (error) {
      }
});
function lab6_task7(){
      const categoriesList = document.querySelectorAll('#categories .item');

      console.log(`Number of categories: ${categoriesList.length}`);

      categoriesList.forEach(category => {
              const categoryName = category.querySelector('h2').textContent;
              const categoryItems = category.querySelectorAll('ul li').length;

              console.log(`Category: ${categoryName}`);
              console.log(`Items: ${categoryItems}`);
      });
}

function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function changeBackgroundColor() {
      var body = document.body;
      var colorSpan = document.querySelector('.color');
      var randomColor = getRandomHexColor();

      body.style.backgroundColor = randomColor;
      colorSpan.textContent = randomColor;
}









function createBoxes() {
      const boxesContainer = document.getElementById('boxes');

      const input = document.querySelector('input');

      const amount = input.value;
      if (amount < 1 || amount > 100) {
            alert('Please enter a number between 1 and 100.');
            return;
      }

      const boxes = [];
      let size = 30;

      for (let i = 0; i < amount; i++) {
            const box = document.createElement('div');
            box.style.width = `${size}px`;
            box.style.height = `${size}px`;
            box.style.backgroundColor = getRandomHexColor();
            box.style.marginBottom = '10px';
            boxes.push(box);
            size += 10;
      }

      boxesContainer.innerHTML = '';
      boxes.forEach(box => {
            boxesContainer.appendChild(box);
      });

      input.value = '';
}

function destroyBoxes() {
    const boxesContainer = document.getElementById('boxes');

    boxesContainer.innerHTML = '';
}