var animate = /*window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||*/
function(callback) { window.setTimeout(callback, 1000/10) };
var canvas=document.createElement ("canvas");
var ctx;
ctx=canvas.getContext("2d");

var width=500;
var height=500;
var resolution=5;
canvas.width=width;
canvas.height=height;


var gridWidth=width/resolution;
var gridHeight=height/resolution;

var grid=create2Darray(gridWidth,gridHeight);

//var rule=[0,1,0,1,1,0,1,1];//218
//var rule=[0,1,1,1,1,0,0,0];//30

var rule=RandomRule();
console.log(getRule());
init();
var step = function(){
nextGen();
draw(grid,gridWidth,gridHeight);
animate(step);
};

function RandomRule(){
	var rule=[];
	var i;
	for(i=0;i<8;i++){
		rule[i]=Math.floor(Math.random()*2);
	}
	return rule;
}

function init(){
	grid[Math.floor(gridWidth/2)][gridHeight-1]=1;
}

function nextGen(){
	var i,j;
	
	for(i=0;i<gridWidth;i++){
		for(j=0;j<gridHeight-1;j++){
			grid[i][j]=grid[i][j+1];
		}
	}
	for(i=0;i<gridWidth;i++){
			grid[i][gridHeight-1]=getValue(i,gridHeight-1);
	}
	
	
}

function getValue(i,j){
	var a=0,b=0,c=0;
	
	//if(grid[i-1]!=null){
		a=grid[(gridWidth+i-1)%gridWidth][j-1];
	//}
	b=grid[i][j-1];
	//if(grid[i+1]!=null){
		c=grid[(gridWidth+i+1)%gridWidth][j-1];
	//}
	return rule[a*4+b*2+c];
}

function draw(grid,width,height){
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,width*resolution,resolution*height);
	var i;
	for( i=0;i<width;i++){
		var j;
		for( j=0;j<height;j++){
			if(grid[i][j]==1){
				ctx.fillStyle="#00ff00";
			}
			else{
				ctx.fillStyle="#000000";
			}
			ctx.fillRect(i*resolution,j*resolution,resolution,resolution);
		}
	}
}

function create2Darray(width,height){
	var array=[];
	var i,j;
	for( i=0;i<width;i++){
		array[i]=[];
	}
	for( i=0;i<width;i++){
		for( j=0;j<height;j++){
		array[i][j]=0;
	}
	}
	
	return array;
}

function getRule(){
	var num=0;
	for(var i=0;i<8;i++){
		num+=rule[i]*Math.pow(2,i);
	}
	return num;
}


window.onload=function(){
document.body.appendChild(canvas);
animate(step);
};
