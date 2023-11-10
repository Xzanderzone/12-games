document.addEventListener("keydown",move);
let boardsizeright=500,boardsizedown=500;//total size
let boardright=10,boarddown=10;//total tile count
let tilesizeright=boardsizeright/boardright,tilesizedown=boardsizedown/boarddown;//tile size
let playerright=5,playerdown=5;//relative 0 - boar xy
let playerrequest={right:0,down:0};// 1 0 -1
let playerlocation={right:0,down:0};// absolute positoin 0 - boardsize

let main=document.querySelector("main");
let player=document.createElement("div")
let board=document.createElement("div")
player.classList.add("player");
main.appendChild(player);

DrawBoard();

function DrawBoard(){
  for(i=0;i<boarddown;i++)
  {
    for(j=0;j<boardright;j++)
    {
      board.appendChild(DrawTile("floor"));
    }
  }
  main.appendChild(board);
}

function DrawTile(type){
  if(type==="floor"){
    let floortile=document.createElement("div");
    floortile.classList.add(type);
    floortile.style.width=tilesizeright+"px";
    floortile.style.height=tilesizedown+"px";
    console.log(tilesizedown,tilesizeright);
    floortile.style.backgroundColor="gray";//change to a floor file?
    return floortile;
  }
}

function move(e){
  playerrequest={right:0,down:0};//start 0 request
  if(e.key==="ArrowLeft"){
    playerrequest.right=-1;
  }
  else if(e.key==="ArrowRight"){
    playerrequest.right=1;
  }
  else if(e.key==="ArrowDown"){
    playerrequest.down=1;
  }
  else if(e.key==="ArrowUp"){
    playerrequest.down=-1;
  }
  playerright=playerright+playerrequest.right;
  playerlocation.right=playerright*(boardsizeright/boardright);
  playerdown=playerdown+playerrequest.down;
  playerlocation.down=(playerdown)*(boardsizedown/boarddown);
  console.log(playerright,playerdown);
  console.log(playerlocation.right,playerlocation.down);
  player.style.bottom=playerlocation.down;
  player.style.right=playerlocation.right;
  main.appendChild(player);
}