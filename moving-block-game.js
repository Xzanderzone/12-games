document.addEventListener("keydown",move);
let boardsizeright=500,boardsizedown=500;//total size
let boardright=10,boarddown=10;//total tile count
let tilesizeright=boardsizeright/boardright,tilesizedown=boardsizedown/boarddown;//tile size
let playerright=1,playerdown=1;//relative 0 - boar xy
let playerrequest={right:0,down:0};// 1 0 -1
let playerlocation={right:0,down:0};// absolute positoin 0 - boardsize

let main=document.querySelector("main");
let player=document.createElement("div")
let board=document.createElement("div")
player.classList.add("player");
main.appendChild(player);

DrawBoard();

function DrawBoard(){
  let floory=document.createElement("div");
  for(i=0;i<boarddown;i++)
  {
    let boardx=document.createElement("div");
    floory.classList.add("floory");
    for(j=0;j<boardright;j++)
    {
      boardx.appendChild(DrawTile("floorx"));
    }
    floory.appendChild(boardx);
  }
  main.appendChild(floory);
}

function DrawTile(type){
  if(type==="floorx"){
    let floortile=document.createElement("div");
    floortile.classList.add(type);
    floortile.style.width=tilesizeright+"px";
    floortile.style.height=tilesizedown+"px";
    floortile.style.backgroundColor="gray";//change to a floor file?
    floortile.style.border=".5px solid black";
    return floortile;
  }
}

function move(e){
  playerrequest={right:0,down:0};//start 0 request
  if(e.key==="ArrowLeft" && playerright>0){
    playerrequest.right=-1;
  }
  else if(e.key==="ArrowRight"&& playerright<boardright){
    playerrequest.right=1;
  }
  else if(e.key==="ArrowDown"&& playerdown<boarddown){
    playerrequest.down=1;
  }
  else if(e.key==="ArrowUp"&& playerdown>0){
    playerrequest.down=-1;
  }
  playerright=playerright+playerrequest.right;
  playerlocation.right=playerright*(boardsizeright/boardright);
  playerdown=playerdown+playerrequest.down;
  playerlocation.down=(playerdown)*(boardsizedown/boarddown);
  console.log(playerright,playerdown);
  console.log(playerlocation.right,playerlocation.down);
  player.style.top=playerlocation.down+"px";
  player.style.left=playerlocation.right+"px";
  main.appendChild(player);
}