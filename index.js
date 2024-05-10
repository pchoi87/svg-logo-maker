const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

// Function to load Inquirer dynamically and return the default export
async function loadInquirer() {
  const inquirerModule = await import('inquirer');
  return inquirerModule.default;  // Accessing default export if it's using export default
}

// Function to prompt user input
async function getLogoDetails() {
  const inquirer = await loadInquirer();
  const answers = await inquirer.prompt([
    { type: 'input', name: 'text', message: 'Enter up to three characters:', validate: input => input.length <= 3 },
    { type: 'input', name: 'textColor', message: 'Enter a text color:' },
    { type: 'list', name: 'shape', message: 'Choose a shape:', choices: ['circle', 'triangle', 'square'] },
    { type: 'input', name: 'shapeColor', message: 'Enter a shape color:' }
  ]);
  return answers;
}

// Function to create SVG and save to file
async function createSVG() {
  const { text, textColor, shape, shapeColor } = await getLogoDetails();
  let shapeInstance;

  switch (shape) {
    case 'circle':
      shapeInstance = new Circle();
      break;
    case 'triangle':
      shapeInstance = new Triangle();
      break;
    case 'square':
      shapeInstance = new Square();
      break;
  }

  shapeInstance.setColor(shapeColor);
  const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeInstance.render()}
    <text fill="${textColor}" x="150" y="100" font-family="Arial" font-size="20" text-anchor="middle">${text}</text>
  </svg>`;

  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
}

// Run application
createSVG();
