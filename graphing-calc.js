import {csc} from './mymath.js';

let canvas;
let context;

window.drawCoordPlane = function (event) {
//  event.preventDefault();
  // clear any existing drawings.
  context.fillStyle = 'white';
  context.fillRect(2, 2, canvas.width - 3, canvas.height - 3);

  // draw x and y axes.
  context.fillStyle = 'black';
  const midX = canvas.width / 2;
  const midY = canvas.height / 2;
  context.fillRect(0, midY - 1, canvas.width, 3);
  context.fillRect(midX, 0, 3, canvas.height);
  // label x and y axes
  context.font = '30px sans-serif';
  context.fillText('x', 0, midY + 20);
  context.fillText('y', midX + 10, 20);

  // draw grid for x [-15, 15] and y [-15, 15]
  context.strokeStyle = 'gray';
  context.beginPath();
  let inc = canvas.width / 30;
  for (let i = 0; i < canvas.width; i += inc) {
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
  }
  inc = canvas.height / 30;
  for (let i = 0; i < canvas.height; i += inc) {
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
  }
  context.stroke();
};
function replacements(str) {
  let func = str;
  func = func.replace('sin(', 'Math.sin(');
  func = func.replace('cos(', 'Math.cos(');
  func = func.replace('tan(', 'Math.tan(');
  func = func.replace('sqrt(', 'Math.sqrt(');
  func = func.replace('cbrt(', 'Math.cbrt(');
//  func = func.replace('csc(', 'math2.csc(');
  return func;
}

function convertWidth(x) { // given an X find its location on canvas
  return (x * (canvas.width / 30)) + (canvas.width / 2);
}
function convertHeight(y) { // given a y, find its location on canvas
  return (y * (canvas.height / 30)) + (canvas.height / 2);
}
function drawGraph(fun) {
  context.strokeStyle = 'black';
  context.beginPath();
  context.moveTo(-15, fun(-15));
  for (let i = -15; i < 15; i += 0.1) {
    // invert f(x) so that it displays correctly.
    context.lineTo(convertWidth(i), convertHeight(-fun(i)));
  }
  context.stroke();
}
window.init =  function(event) {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  context.strokeStyle = 'black';
  context.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);

  drawCoordPlane(event);
};
window.parseFunct = function (event) {
 event.preventDefault();
  let func = document.getElementById('equation').value;
  func = func.toLowerCase();
  func = replacements(func);
  func = `return ${func};`;
  drawCoordPlane();
  drawGraph(new Function('x', func));
};
