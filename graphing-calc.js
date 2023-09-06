let canvas; 
let context; 

let fn = function (x) {
	return (x * x * .25) - 4;
}
function init() { 
	canvas = document.getElementById("canvas"); 
	context = canvas.getContext("2d"); 
	context.strokeStyle = 'black'; 
	context.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);  	
	drawCoordPlane(); 
}
function drawCoordPlane() { 
	context.fillStyle = 'black'; 
	let midX = canvas.width / 2; 
	let midY = canvas.height / 2; 

	context.fillRect(0, midY - 1, canvas.width, 3);
	context.fillRect(midX, 0, 3, canvas.height); 
	context.font = '30px sans-serif';
	context.fillText("x", 0, midY + 20);
	context.fillText("y", midX + 10, 20);

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
	drawGraph(fn); 
}
function convertWidth(x) { //given an X find its 
	x = x * (canvas.width / 30); 
	x += (canvas.width) / 2; 
	return x;  
}
function convertHeight(y) {
	y = y * (canvas.height / 30);
	y += canvas.height / 2;
	return y; 
}
function drawGraph(fun) {
	context.strokeStyle = 'black'; 
	context.beginPath() 
	context.moveTo(-15, fn(-15)); 
	for(let i = -15; i < 15; i += .1) {
		context.lineTo(convertWidth(i), convertHeight(-fn(i)));
	}
	context.stroke();
}