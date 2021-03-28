
let circleArray=[];

function setup() {
  createCanvas(600, 600);
  background(255);
  for(let x=0;x<30;x++){
    circleArray[x]=[];
    for(let y=0;y<30;y++){
      circleArray[x][y]=new circle(10+20*x,10+20*y);
    } 
  }
  for(let x=0;x<30;x++){
    for(let y=0;y<30;y++){
      circleArray[x][y].draw();
    }
  }
}

class circle{
  constructor(x,y) {
    this.xpos=x;
    this.ypos=y;
    this.rad=20;
    this.color1=255;
  }
  draw() {
    fill(this.color1);
    noStroke();
    ellipse(this.xpos,this.ypos,this.rad,this.rad);
  }
  change(diff) {
    fill(this.color1=this.color1+diff);
    noStroke();
    ellipse(this.xpos,this.ypos,this.rad,this.rad);
  }
}

function checkPos(pos){
  if(pos>600){
    return -1;
  }
  else if(pos<1){
    return 0;
  }
  else{
    return floor(pos/20)%30;
  }
}

function checkPoint(pos){
  if(pos>29){
    return 29;
  }
  else if(pos<0){
    return 0;
  }
  else{
    return pos;
  }
}

function aroundCircle(x,y,diff){
  circleArray[checkPoint(x-1)][checkPoint(y)].change(diff);
  circleArray[checkPoint(x)][checkPoint(y-1)].change(diff);
  circleArray[checkPoint(x+1)][checkPoint(y)].change(diff);
  circleArray[checkPoint(x)][checkPoint(y+1)].change(diff);
}

function overCircle(posX,posY)
{
  let Xpos=floor(checkPos(posX));
  let Ypos=floor(checkPos(posY));
  if(Xpos!=-1&&Ypos!=-1){
    circleArray[Xpos][Ypos].change(15);
    aroundCircle(Xpos,Ypos,7);
  }
}

function clickCircle(posX,posY)
{
  let Xpos=floor(checkPos(posX));
  let Ypos=floor(checkPos(posY));
  if(Xpos!=-1&&Ypos!=-1){
    circleArray[Xpos][Ypos].change(-15);
    aroundCircle(Xpos,Ypos,-7);
  }
}

function keyPressed(){
  overCircle(mouseX,mouseY);
}

function draw() {
  if(mouseIsPressed) {
    clickCircle(mouseX,mouseY);
  }
  if(keyIsPressed){
    overCircle(mouseX,mouseY);
  }
}
