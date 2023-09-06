import csc from "./mytrig.js"; 
let canvas; 
let context; 

let fn = function (x) {
	return Math.sin(x);
}
function init() { 
	canvas = document.getElementById("canvas"); 
	context = canvas.getContext("2d"); 
	context.strokeStyle = 'black'; 
	context.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);  	
	drawCoordPlane(); 
	drawGraph(fn);
}
function drawCoordPlane() { 
	event.preventDefault();
	//clear any existing drawings. 
	context.fillStyle = 'white'; 
	context.fillRect(2, 2, canvas.width - 3, canvas.height - 3);
	
	//draw x and y axes. 
	context.fillStyle = 'black'; 
	let midX = canvas.width / 2; 
	let midY = canvas.height / 2; 
	context.fillRect(0, midY - 1, canvas.width, 3);
	context.fillRect(midX, 0, 3, canvas.height); 
	//label x and y axes
	context.font = '30px sans-serif';
	context.fillText("x", 0, midY + 20);
	context.fillText("y", midX + 10, 20);

	//draw grid for x [-15, 15] and y [-15, 15]
	context.strokeStyle = 'gray'; 
	context.beginPath(); 
	let inc = canvas.width / 30; 
	for(let i = 0; i < canvas.width; i+= inc) {
		context.moveTo(i, 0); 
		context.lineTo(i, canvas.height); 
	}
	inc = canvas.height / 30; 
	for (let i = 0; i < canvas.height; i += inc) {
		context.moveTo(0, i); 
		context.lineTo(canvas.width, i);
	}
	context.stroke();
}

function convertWidth(x) { //given an X find its location on canvas 
	x = x * (canvas.width / 30); 
	x += (canvas.width) / 2; 
	return x;  
}
function convertHeight(y) { //given a y, find its location on canvas
	y = y * (canvas.height / 30);
	y += canvas.height / 2;
	return y; 
}
function drawGraph(fun) {
	context.strokeStyle = 'black'; 
	context.beginPath() 
	context.moveTo(-15, fn(-15)); 
	for(let i = -15; i < 15; i += .1) {
		//invert f(x) so that it displays correctly. 
		context.lineTo(convertWidth(i), convertHeight(-fn(i)));
	}
	context.stroke();
}