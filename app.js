//Global
let tostDiv = null;
const defualtColo = {
  red: 221,
  green: 222,
  blue: 225,
};

//Dom Content Load
window.addEventListener('DOMContentLoaded', () => {
  main();
  updateColorCodeToDom(defualtColo);
});

function main() {
  //DOM References
  const changeColorBtn = select('#change-btn');
  const hexInput = select('#hex-input');
  const rgbInput = select('#rgb-input');
  const redColorSlider = select('#red');
  const greenColorSlider = select('#green');
  const blueColorSlider = select('#blue');
  const copyToClippboardBtn = select('.copyCodeBtn');
  const colorModeRadios = document.getElementsByName('select-mode');

  //Event Listener
  hexInput.addEventListener('keyup', handlerHexInput);
  changeColorBtn.addEventListener('click', handleGenerateColorBtn);

  redColorSlider.addEventListener(
    'input',
    colorSliderFun(redColorSlider, greenColorSlider, blueColorSlider)
  );
  greenColorSlider.addEventListener(
    'input',
    colorSliderFun(redColorSlider, greenColorSlider, blueColorSlider)
  );
  blueColorSlider.addEventListener(
    'input',
    colorSliderFun(redColorSlider, greenColorSlider, blueColorSlider)
  );

  copyToClippboardBtn.addEventListener(
    'click',
    copyToClippboardBtnFun(colorModeRadios, hexInput, rgbInput)
  );
}

//Event Handlers
function handleGenerateColorBtn() {
  const color = generateColorDacimal();
  updateColorCodeToDom(color);
}

function handlerHexInput(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const color = hexToDecimal(hexColor);
      updateColorCodeToDom(color);
      this.value = hexColor.toUpperCase();
    }
  }
}

function colorSliderFun(redColorSlider, greenColorSlider, blueColorSlider) {
  ``;

  return function () {
    const color = {
      red: parseInt(redColorSlider.value),
      green: parseInt(greenColorSlider.value),
      blue: parseInt(blueColorSlider.value),
    };
    updateColorCodeToDom(color);
  };
}

function copyToClippboardBtnFun(colorModeRadios, hexInput, rgbInput) {
  return function () {
    let mode = getCheckedValueFromRadios(colorModeRadios);
    if (mode === 'hex') {
      navigator.clipboard.writeText(`#${hexInput.value}`);
    }
    if (mode === 'rgb') {
      navigator.clipboard.writeText(rgbInput.value);
    }
  };
}
//Dom Function

/**
 * button click to change the background color
 * @param {*} btn
 * @param {*} displayDiv
 * @param {*} hexInput
 * @param {*} rgbInput
 */
function changeColorFunToClick(btn, displayDiv, hexInput, rgbInput) {
  btn.addEventListener('click', (e) => {
    const color = generateColorDacimal();
    const hex = genreateHexColor(color);
    const rgb = generateRGBcolor(color);
    if (isValidHex(hex)) {
      hexInput.value = hex.toUpperCase();
      displayDiv.style.backgroundColor = `#${hex}`;
      rgbInput.value = rgb;
    }
  });
}

/**
 * Get find the checked value of elements from node list
 * @param {Array} nodes
 * @returns {string | null}
 */
function getCheckedValueFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }

  return checkedValue;
}

/**
 *
 * @param {object} color
 */
function updateColorCodeToDom(color) {
  const hexColor = genreateHexColor(color);
  const rgbColor = generateRGBcolor(color);

  select('.display').style.backgroundColor = `#${hexColor}`;
  select('#hex-input').value = hexColor;
  select('#rgb-input').value = rgbColor;
  select('#red').value = color.red;
  select('#green').value = color.green;
  select('#blue').value = color.blue;
  select('#redVal').innerText = color.red;
  select('#greenVal').innerText = color.green;
  select('#blueVal').innerText = color.blue;
}

// Utils

/**
 * Generate and return an object of three color decimal values
 * @returns {}
 */
function generateColorDacimal() {
  const red = Math.ceil(Math.random() * 225);
  const green = Math.ceil(Math.random() * 225);
  const blue = Math.ceil(Math.random() * 225);

  return { red, green, blue };
}

/**
 * Take a color object of three  values and return a hexadecimal color code
 * @param {object} color
 * @returns {string}
 */
function genreateHexColor({ red, green, blue }) {
  function getHex(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  return `${getHex(red)}${getHex(green)}${getHex(blue)}`.toLowerCase();
}

/**
 * Take a color object of three  values and return a RGB color code
 * @param {object} color
 * @returns {string}
 */
function generateRGBcolor({ red, green, blue }) {
  return `rgb(${red},${green},${blue})`;
}

/**
 * Convert Hex code To Decimal Number
 * @param {string} hex
 * @returns {object}
 */
function hexToDecimal(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return { red, green, blue };
}

/**
 * Validate hex color code
 * @param {string} color
 * @returns {boolean}
 */
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /[0-9a-fA-F]{6}$/i.test(color);
}

/**
 * Checked Is valid Hex Color
 * @param {string} color
 */
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /[0-9a-fA-F]{6}$/i.test(color);
}

function select(tags) {
  return document.querySelector(tags);
}
