import {getDeck,shuffle} from "./collection-memory.js"

let deck=getDeck().slice();
shuffle(deck);
let card1=false,card2=false;
let main=document.body.querySelector("main");

for(let i=0;i<deck.length;i++){
  let card=document.createElement("button");
  let cardtitle=document.createElement("p");
  card.classList.add("back");
  cardtitle.textContent=deck[i].Value+deck[i].Suit;
  card.addEventListener("click",function(e){
    if(card1==false){
      this.classList.toggle("front");
      this.classList.toggle("back");
      card1=this;
    }
    else if(card2==false){
      this.classList.toggle("front");
      this.classList.toggle("back");
      card2=this;
      if(card1.children[0].textContent==card2.children[0].textContent){
        card1=false;
        card2=false;
      }
      else setTimeout(hideCards,1000);
    }
  })
  card.appendChild(cardtitle);
  main.appendChild(card);
};

function hideCards(){
  card1.classList.remove("front");
  card1.classList.add("back");
  card2.classList.remove("front");
  card2.classList.add("back");
  card1=false;
  card2=false;

}