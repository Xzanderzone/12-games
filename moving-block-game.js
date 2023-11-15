document.addEventListener("keydown",move);
let boardwidth=500,boardheight=500;//total size
let boardtileX=10,boardtileY=10;//total tile count
let tilewidth=boardwidth/boardtileX,tileheight=boardheight/boardtileY;//tile size
let playerright=1,playerdown=1;//relative 0 - boar xy
let playerrequest={right:0,down:0};// 1 0 -1
let playerlocation={right:0,down:0};// absolute positoin 0 - boardsize
let settings=document.querySelectorAll("input");
let main=document.querySelector("main");
let player=document.createElement("div")
let board=document.createElement("div")
player.classList.add("player");
main.appendChild(player);
let floory=document.createElement("div");

DrawBoard();

function SetBoardWidth(width){
  if(width >20)boardwidth=width;
  }
  function SetBoardHeight(height){
  if(height >20)boardheight=height;
  }
  function SetTileCountCol(tilecount){
  if(tilecount >2)boardtileY=tilecount;
  }
  function SetTileCountRow(tilecount){
  if(tilecount >2)boardtileX=tilecount;
  }
  document.querySelector("#confirm").addEventListener("click",()=>{
    settings.forEach(setting => {
      let value=parseInt(setting.value);
      if(setting.name==="totalwidth")SetBoardWidth(value);
      if(setting.name==="totalheight")SetBoardHeight(value);
      if(setting.name==="rowcount")SetTileCountRow(value);
      if(setting.name==="colcount")SetTileCountCol(value);
      tilewidth=boardwidth/boardtileX;
      tileheight=boardheight/boardtileY;
      //change playersize
      DrawBoard();
    });
    // SetBoardHeight();
  })
  
function DrawBoard(){
   floory.innerHTML=[];
  floory.classList.add("floory");
  for(i=0;i<boardtileY;i++)
  {
    let boardx=document.createElement("div");
    boardx.classList.add("floorx");
    for(j=0;j<boardtileX;j++)
    {
      boardx.appendChild(DrawTile("floor"));
    }
    floory.appendChild(boardx);
  }
  main.appendChild(floory);
}

function DrawTile(type){
  if(type==="floor"){
    let floortile=document.createElement("div");
    // floortile.classList.add(type);
    floortile.style.width=tilewidth+"px";
    floortile.style.height=tileheight+"px";
    floortile.style.backgroundColor="gray";//change to a floor file?
    floortile.style.border="0.5px solid black";
    return floortile;
  }
}

function move(e){
  playerrequest={right:0,down:0};//start 0 request
  if(e.key==="ArrowLeft" && playerright>0){
    playerrequest.right=-1;
  }
  else if(e.key==="ArrowRight"&& playerright<boardtileX-1){
    playerrequest.right=1;
  }
  else if(e.key==="ArrowDown"&& playerdown<boardtileY-1){
    playerrequest.down=1;
  }
  else if(e.key==="ArrowUp"&& playerdown>0){
    playerrequest.down=-1;
  }

  let offsetx=document.querySelector(".floory").getBoundingClientRect().left;
  let offsety=document.querySelector(".floory").getBoundingClientRect().top;

  playerright+=playerrequest.right;
  playerlocation.right=playerright*(boardwidth/boardtileX);
  playerdown=playerdown+playerrequest.down;
  playerlocation.down=(playerdown)*(boardheight/boardtileY);
  player.style.top=(playerlocation.down+offsety)+"px";
  player.style.left=(playerlocation.right+offsetx)+"px";
  player.style.width=tilewidth+"px";
  player.style.height=tileheight+"px";
  main.appendChild(player);
}