//game constants and variables
let inputDir={x:0,y:0};
const foodsound=new Audio('music/food.mp3');
const gameoversound=new Audio('music/gameover.mp3');
const movesound=new Audio('music/move.mp3');
const musicsound=new Audio('music/music.mp3');
let speed=5;
let lastPaintTime=0;
let score=0;
let snakearr=[
    {x:13,y:15}
]
var food={x:3,y:6};
// let board=document.getElementById('board');
//game functions
function main(ctime){
   window.requestAnimationFrame(main);
   
   if(((ctime-lastPaintTime)/1000)<(1/speed)){
       return ;
   }
   lastPaintTime=ctime;
   gameEngine();     
   
}
function isCollide(snake){
   // if you 
   for(let i=1;i<snakearr.length;i++){
       if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
           return true;
       }
   }
   if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
           return true;
   }
}
function gameEngine(){
    //part 1 :updating the sname array and food
    if(isCollide(snakearr)) {
        gameoversound.play();
        musicsound.pause()
        inputDir={x:0,y:0};
        alert("Game over, press any key to play again");
        snakearr=[ {x:13,y:15}];
        musicsound.play();
        score=0;
    }
    //if snake has eaten the food 
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        foodsound.play();
        score+=1;
        scoreterm.innerHTML="Score: "+score;
        if(score%5==0){
            speed++;
        }
        snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        
  
    }
    //snake move part
    for(let i=snakearr.length-2;i>=0;i--){
       
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x+=inputDir.x;
    snakearr[0].y+=inputDir.y;
    //part 2: display the snake 
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
       snakeElement=document.createElement('div');
       snakeElement.style.gridRowStart=e.y;
       snakeElement.style.gridColumnStart=e.x;
      
       if(index===0){
         snakeElement.classList.add('head');
       }else{
         snakeElement.classList.add('snake');
       }
       board.appendChild(snakeElement);
   })

   //Display the food
       foodElement=document.createElement('div');
       foodElement.style.gridRowStart=food.y;
       foodElement.style.gridColumnStart=food.x;
       foodElement.classList.add('food');
       board.appendChild(foodElement);
   
}
//main logic starts here

window.requestAnimationFrame(main);//it runs only one time thats why we placed it inside the main also
window.addEventListener('keydown',e=>{
   inputDir={x:0,y:1};//start the game
   movesound.play();
   switch(e.key){
        case "ArrowUp":
            
            inputDir.x=0;
            inputDir.y=-1;
            break;
        
        case "ArrowDown":
            
            inputDir.x=0;
            inputDir.y=1;
            break;
        
        case "ArrowLeft":
           
            inputDir.x=-1;
            inputDir.y=0;
            break;
        
        case "ArrowRight":
            
            inputDir.x=1;
            inputDir.y=0;
            break;    
        
        default:
            break;
   }
});