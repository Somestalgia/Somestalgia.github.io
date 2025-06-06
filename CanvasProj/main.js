const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const lspk = document.getElementById("lil-spike");
const lsha = document.getElementById("lil-shadow");
const bspk = document.getElementById("big-spike");
const bsha = document.getElementById("big-shadow");
const lguy = document.getElementById("lil-guy");
const imgdy = 600/5*4-63;
const max_height = imgdy-160;
const guydelay = 10;
const edge = 900-5;

const theguy = {
	x: 41,
	y: imgdy,
	src: lguy,
};

let obstdelay = 10;
let score = -1;
let position = imgdy;
let guydy = 5;
let thespike;
let guytimeid;
let n = 0;
let obstx = 900-3;
let xavoid = 29;
let yavoid = 0;
let obstl;

canvas.height = 600;
canvas.width = 900;


//main
function main(){
	background();
	lilguy();
	dificil();
	console.log(canvas.height);
	console.log(canvas.width);
	//computer interaction
	document.addEventListener("keydown", runk);
	//mobile interaction
	document.addEventListener("touchstart", runt);
}
//loads the background
function background(){
	ctx.fillStyle = "#390040";
	ctx.fillRect(0, canvas.height/5*4, canvas.width, canvas.height/5);
	ctx.fillStyle = "#ffcdb2";
	ctx.fillRect(0, 0, canvas.width, canvas.height/5*4);
	ctx.fillStyle = "#390040";
	ctx.font = "bold 45px monospace";
	ctx.textAlign = "center";
	ctx.fillText("press space to start", 450, 130);
}
//starts the game w/ keyboard
function runk(e){
	ctx.fillStyle = "#ffcdb2";
	console.log("dfgsdf");
	if(e.key == " "){
		if(score == -1){
			score++;
			ctx.fillRect(0, 90, canvas.width, 100);
			ctx.fillStyle = "#390040";
			ctx.font = "bold 25px monospace";
			ctx.fillText("score: "+ score, 800, 50);
		}
		else{
			jump();
		}
	}
}
//starts the game on mobile
function runt(){
	ctx.fillStyle = "#ffcdb2";
	console.log("dfgsdf");
	if(score == -1){
		score++;
		ctx.fillRect(0, 90, canvas.width, 100);
		ctx.fillStyle = "#390040";
		ctx.font = "bold 25px monospace";
		ctx.fillText("score: "+ score, 800, 50);
	}
	else{
		jump();
	}
}
//animates the lil guy
function jump(){
	guytimeid = setInterval(moveguydy, guydelay);
	guydy = 5;
}
//part of lil guy animation
function moveguydy(){
    ctx.fillStyle = "#ffcdb2";
	ctx.fillRect(53, position+24, 39, 39);
    if(guydy < 0){
        position += 5;
    }
    else{
        position -= 5;
    }
    lilguy();
    if(position <= max_height){
        guydy = -5;
    }
    if(position >= imgdy){
        clearInterval(guytimeid);
    }
}
//calls what moves the obstacles
function dificil(){
	n = Math.floor(Math.random()*7);
	obstid = setInterval(moveobstdy, obstdelay);
}
//moves the obstacles
function moveobstdy(){
	if(collider()){
        clearInterval(obstid);
        clearInterval(guytimeid);
        ctx.fillStyle = "#390040";
        ctx.font = "bold 45px monospace";
        ctx.fillText("game over", 450, 130);
    }
	if(score != -1){
		obstshadow();
		obstx -= 5;
		obstacle();
		if(obstx <= -189){
			obstx = 900-3;
			score++;
			ctx.fillStyle = "#ffcdb2";
			ctx.fillRect(700, 10, 200, 100);
			ctx.fillStyle = "#390040";
			ctx.fillText("score: "+ score, 800, 50);
		}
	}
	if(score%10 == 0 && obstdelay > 1 && score != 0 && obstx == 900-3){
	    obstdelay--;
	    clearInterval(obstid);
	    obstid = setInterval(moveobstdy, obstdelay);
	}
}
//loads the obstacles
function obstacle(){
	if(obstx <= -189){
	    n = Math.floor(Math.random()*7);
	}
	switch(n){
		case 0:
			ctx.drawImage(lspk, obstx, imgdy);
			ctx.drawImage(bspk, obstx+63, imgdy);
			ctx.drawImage(lspk, obstx+126, imgdy);
			obstl = 63*3;
			//xavoid = 20;
			yavoid = 30;
			break;
		case 1:
			ctx.drawImage(lspk, obstx, imgdy);
			obstl = 63;
			//xavoid = 20;
			yavoid = 30;
			break;
		case 2:
			ctx.drawImage(bspk, obstx, imgdy);
			obstl = 63;
			//xavoid = 19;
			yavoid = 63;
			break;
		case 3:
			ctx.drawImage(bspk, obstx, imgdy);
			ctx.drawImage(lspk, obstx+63, imgdy);
			ctx.drawImage(bspk, obstx+126, imgdy);
			obstl = 63*3;
			//xavoid = 10;
			yavoid = 63;
			break;
		case 4:
			ctx.drawImage(lspk, obstx, imgdy);
			ctx.drawImage(lspk, obstx+63, imgdy);
			obstl = 63*2;
			//xavoid = 20;
			yavoid = 30;
			break;
		case 5:
			ctx.drawImage(bspk, obstx, imgdy);
			ctx.drawImage(lspk, obstx+63, imgdy);
			obstl = 63*2;
			//xavoid = 10;
			yavoid = 63;
			break;
		case 6:
			ctx.drawImage(lspk, obstx, imgdy);
			ctx.drawImage(bspk, obstx+63, imgdy);
			ctx.drawImage(bspk, obstx+126, imgdy);
			obstl = 63*3;
			//xavoid = 20;
			yavoid = 30;
			break;
	}
}
//casts the obstacles' shadows
function obstshadow(){
	switch(n){
		case 0:
			ctx.drawImage(lsha, obstx, imgdy);
			ctx.drawImage(bsha, obstx+63, imgdy);
			ctx.drawImage(lsha, obstx+126, imgdy);
			break;
		case 1:
			ctx.drawImage(lsha, obstx, imgdy);
			break;
		case 2:
			ctx.drawImage(bsha, obstx, imgdy);
			break;
		case 3:
			ctx.drawImage(bsha, obstx, imgdy);
			ctx.drawImage(lsha, obstx+63, imgdy);
			ctx.drawImage(bsha, obstx+126, imgdy);
			break;
		case 4:
			ctx.drawImage(lsha, obstx, imgdy);
			ctx.drawImage(lsha, obstx+63, imgdy);
			break;
		case 5:
			ctx.drawImage(bsha, obstx, imgdy);
			ctx.drawImage(lsha, obstx+63, imgdy);
			break;
		case 6:
			ctx.drawImage(lsha, obstx, imgdy);
			ctx.drawImage(bsha, obstx+63, imgdy);
			ctx.drawImage(bsha, obstx+126, imgdy);
			break;
	}
}
//loads the lil guy
function lilguy(){
	ctx.drawImage(lguy, 41, position);
}
//detects a "collision" in the most janky way possible
function collider(){
    //determines if the lil guy fell through the ground
    if(position > imgdy){
        return true;
    }
    //determines if the lil guy is high enough
    if(position > imgdy-yavoid){
        //determines if the lil guy is far enough over in three ways
        if(40-obstl < obstx+xavoid){
            if(obstx+xavoid < 41+12+39){
                if(obstx+obstl-41 > 52){
                    return true;
                }
            }
        }
    }
    //determines if the lil guy has hit the obstacle
    if(position == imgdy && obstx == 97){
        return true;
    }
    return false;
}

main();
