function generateRandomArray(size, min, max) {
    let randomArray = [];
    for (let i = 0; i < size; i++) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomArray.push(randomNumber);
    }
    return randomArray;
}

const arrayC = [];
function buildArrayC() {
    let arraySize = 10;
    let minNumber = 1;
    let maxNumber = 100;

    let arrayA = generateRandomArray(arraySize, minNumber, maxNumber);
    let arrayB = generateRandomArray(arraySize, minNumber, maxNumber);
    pasteArrayToElem(arrayA, 'array_A');
    pasteArrayToElem(arrayB, 'array_B');

    for (let i = 0; i < arrayA.length; i++) {
        let elementC;
        if( arrayA[i] === arrayB[i]){
            elementC = 1;
        } else {
            elementC = 1 / (arrayA[i] - arrayB[i]);
        }
        arrayC.push(elementC.toFixed(2));
    }
    pasteArrayToElem(arrayC, 'array_C');
    pasteArrayToElem(swapMaxWithFirst(arrayC), 'swapped_array');
    pasteArrayToElem(bubbleSort(arrayC), 'sorted_array');

}
function pasteArrayToElem(array, id) {
    document.getElementById(id).innerText = array.toString();
}
function swapMaxWithFirst(array) {
    let maxIndex = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[maxIndex]) {
            maxIndex = i;
        }
    }
    let temp = array[maxIndex];
    array[maxIndex] = array[0];
    array[0] = temp;
    return array;
}
function bubbleSort(array) {
    let len = array.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}






function applyStyle(style) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);

        if (!range.collapsed) {
            var span = document.createElement('span');
            span.classList.add(style);
            span.innerHTML = range.toString();

            range.deleteContents();
            range.insertNode(span);

        }
    }
}
function applyStyle2(style) {
    var textarea = document.getElementById('formatted-text');
    if (textarea.classList.contains(style)) {
        textarea.classList.remove(style);
    } else {
        textarea.classList.add(style);
    }
}
function changeTextColor() {
    var color = document.getElementById("myColor").value;
    var textarea = document.getElementById('formatted-text');
    textarea.style.color = color;
}

function changeColor() {
    var mycolor = document.getElementById("myColor").value;
    document.execCommand('foreColor', false, mycolor);
}

function changeCase() {
    var textarea = document.getElementById('formatted-text');
    var selectedText = window.getSelection().toString();

    if (selectedText !== '') {
        var newCaseButton = document.getElementById('change-case-button');
        var newCase = newCaseButton.classList.contains('lowercase') ? 'l' : 'u';
        var newText = (newCase === 'l') ? selectedText.toLowerCase() : selectedText.toUpperCase();
        newCaseButton.classList.toggle('lowercase');
        newCaseButton.classList.toggle('uppercase');

        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(newText));
    }
}

