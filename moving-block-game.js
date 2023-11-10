document.addEventListener("keyup",move);
let playerx=5,playery=5;
let main=document.querySelector("main");
let player=document.createElement("div")
player.classList.add("player");
main.appendChild(player);

function move(e){
  if(e.key==="ArrowLeft"){
    playerx--;
  }
  if(e.key==="ArrowRight"){
    playerx++;
  }
  if(e.key==="ArrowDown"){
    playery++;
  }
  if(e.key==="ArrowUp"){
    playery--;
  }
  console.log(playerx,playery);
}