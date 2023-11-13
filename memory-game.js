import {getDeck,shuffle,SetDifficulty} from "./collection-memory.js"

let deck=[];
let card1=false,card2=false,card3=false,card4=false;
let difficulty=1;
let pair=0,attempts=0;
let totalpairs=0;
let opacity=0;
let main=document.body.querySelector("main");
let difficultyswitch=document.body.querySelectorAll(".difficultyswitch");
difficultyswitch.forEach(element => {
  element.addEventListener("click",(e)=>{
    e.preventDefault();  
    difficulty=parseInt(e.target.textContent);
    SetDifficulty(difficulty);
    card1=false;
    card2=false;
    card3=false;
    card4=false;
    pair=0;
    attempts=0;
    Start();
    });
});
let cheater=document.body.querySelector(".cheat");
  cheater.addEventListener("click",(e)=>{
    e.preventDefault();  
    if(opacity==0)opacity=0.4;
    else opacity=0;
    let cards=document.querySelectorAll(".back");
    cards.forEach(card => {
      card.querySelector("p").style.opacity=opacity;
      console.log(card.querySelector("p").style.opacity)
    });
    });

Start();

function Start(){
  main.innerHTML=[];
  deck=getDeck().slice();
  shuffle(deck);
  let scoreboard=document.querySelector(".scores");
  if(difficulty<10)totalpairs=deck.length/2;
  else if(difficulty<20)totalpairs=deck.length/3;
  else if(difficulty<300)totalpairs=deck.length/4;
  scoreboard.textContent="Current score: Pairs found "+pair+"/"+totalpairs+ " attempts made: "+attempts;
  for(let i=0;i<deck.length;i++){
    let card=document.createElement("button");
    let cardtitle=document.createElement("p");
    card.classList.add("back");
    // card.style.opacity=opacity;
    card.style.color=deck[i].color;
    cardtitle.textContent=deck[i].Value+deck[i].Suit;
    card.addEventListener("click",function(e){
      if(card1==false){
        this.classList.add("front");
        this.classList.remove("back");
        card1=this;
      }
      else if(card2==false){
        this.classList.add("front");
        this.classList.remove("back");
        card2=this;
        if(card1==card2)card2=false;
        else if(card1.children[0].textContent==card2.children[0].textContent && card1!=card2 && difficulty<=9){
          card1.disabled=true;
          card1.style.color="gray";
          card1=false;
          card2.disabled=true;
          card2.style.color="gray";
          card2=false;
          pair++;
        }
        else if(difficulty<=9)setTimeout(hideCards,1000);
      }
      else if(card3==false &&difficulty>9){
        this.classList.add("front");
        this.classList.remove("back");
        card3=this;
        if(card1==card3)card3=false;
        else if(card2==card3)card3=false;
        else if(card1.children[0].textContent==card2.children[0].textContent && card1!=card2 && difficulty>9 &&difficulty<20
          &&card2.children[0].textContent==card3.children[0].textContent&& card2!=card3 &&card1!=card3){
          card1.disabled=true;
          card1.style.color="gray";
          card1=false;
          card2.disabled=true;
          card2.style.color="gray";
          card2=false;
          card3.disabled=true;
          card3.style.color="gray";
          card3=false;
          pair++;
        }
        else if(difficulty>9 &&difficulty<20)setTimeout(hideCards,1000);
      }
      else if(card4==false &&difficulty>=20){
        this.classList.add("front");
        this.classList.remove("back");
        card4=this;
        if(card1==card4)card4=false;
        else if(card2==card4)card4=false;
        else if(card3==card4)card4=false;
        else if(card1.children[0].textContent==card2.children[0].textContent && card1!=card2 && difficulty>=20
          &&card2.children[0].textContent==card3.children[0].textContent&& card2!=card3 &&card1!=card3
          &&card3.children[0].textContent==card4.children[0].textContent&& card3!=card4 &&card1!=card4){
          card1.disabled=true;
          card1.style.color="gray";
          card1=false;
          card2.disabled=true;
          card2.style.color="gray";
          card2=false;
          card3.disabled=true;
          card3.style.color="gray";
          card3=false;
          card4.disabled=true;
          card4.style.color="gray";
          card4=false;
          pair++;
        }
        else if(difficulty>=20)setTimeout(hideCards,1000);
      }
      console.log(pair,attempts);
      scoreboard.textContent="Current score: Pairs found"+pair+"/"+totalpairs+ "attempts made: "+(attempts+pair);
      main.prepend(scoreboard);
    })
    card.appendChild(cardtitle);
    main.appendChild(card);
  };
  
};

function hideCards(){
  attempts++;
  card1.classList.remove("front");
  card1.classList.add("back");
  card1=false;
  card2.classList.remove("front");
  card2.classList.add("back");
  card2=false;
  if(card3!=false){
    card3.classList.remove("front");
    card3.classList.add("back");
    card3=false;
  }
  if(card4!=false){
    card4.classList.remove("front");
    card4.classList.add("back");
    card4=false;
  }
}