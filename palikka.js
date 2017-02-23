/*****************************************************
(c) Jani Korkeamäki
This code is all yours to critize, copy and modify.
Except for you Joonas, you copy-pasting little weasel.
******************************************************/

var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

var WIDTH = 100;
var HEIGHT = 100;
var i = 0;
var gameOver = false;
var prev = 0;
var next = 0;

/*
Rectangle X and Y coordinates in sequence:
0  1  2
7     3
6  5  4
          0    1    2    3    4    5    6    7  */
var x = [20, 140, 260, 260, 260, 140,  20,  20];
var y = [20,  20,  20, 140, 260, 260, 260, 140];

class Rectangle {
	constructor(x, y, w, h, active) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.active = active;
	}
}

var rectangles = [];

for (i = 0; i <= 7; i++) {
	rectangles.push(new Rectangle(x[i], y[i], WIDTH, HEIGHT, false));
}

function cls(){
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height - 200);
	ctx.fillStyle = '#FFFFFF';
	ctx.fill();
}

function drawRect(num) {
	ctx.beginPath();
	ctx.rect(rectangles[num].x, rectangles[num].y, rectangles[num].w, rectangles[num].h);
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	if (rectangles[num].active){
		ctx.fillStyle = '#FF0000';
		ctx.fill();
	}
	ctx.font = '12pt Courier';	
	ctx.fillStyle = '#000000';
	ctx.fillText('Make all squares red', 20, 10);
}

function update(){
	cls();
	for (i = 0; i <= 7; i++){
		drawRect(i);
	}
}

for (i = 0; i <= 7; i++){
	drawRect(i);
	console.log(rectangles[i].active);
}

function onClick(e) {
	if (!gameOver){
		for (i = 0; i <= 7; i++){
			// Not working properly, only the upper left corner of the rectangles works as intended
			if (e.clientX > rectangles[i].x && e.clientY > rectangles[i].y && e.clientX < (rectangles[i].x + WIDTH) && e.clientY < (rectangles[i].y + HEIGHT)){
				console.log('Klikattu:' + i + '');
				prev = i - 1;
				if (prev < 0) prev = 7;
				next = i + 1;
				if (next > 7) next = 0;
				rectangles[prev].active = !rectangles[prev].active;
				rectangles[i].active = !rectangles[i].active;
				rectangles[next].active = !rectangles[next].active;
				update();
			}
		}
		
		let checksum = 0;
		for (i = 0; i <= 7; i++){
			if (rectangles[i].active) ++checksum;
		}
		console.log('Checksum: ' + checksum + '');
		
		if (checksum == 8){
			ctx.beginPath();
			ctx.font = '18pt Calibri';	
			ctx.fillStyle = '#000000';
			ctx.fillText('Winner winner chicken dinner!', 20, 400);
			gameOver = true;
		}
	}
}

canvas.addEventListener('click', onClick);










