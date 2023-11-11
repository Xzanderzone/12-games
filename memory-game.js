import {getDeck,shuffle,SetDifficulty} from "./collection-memory.js"

let deck=[];
let card1=false,card2=false,card3=false;
let difficulty=1;
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
    Start();
    });
});

Start();

function Start(){
  main.innerHTML=[];
  deck=getDeck().slice();
  shuffle(deck);
  for(let i=0;i<deck.length;i++){
    let card=document.createElement("button");
    let cardtitle=document.createElement("p");
    card.classList.add("back");
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
        }
        else if(difficulty<=9)setTimeout(hideCards,1000);
      }
      else if(card3==false &&difficulty>9){
        this.classList.add("front");
        this.classList.remove("back");
        card3=this;
        if(card1==card3)card3=false;
        else if(card2==card3)card3=false;
        else if(card1.children[0].textContent==card2.children[0].textContent && card1!=card2 && difficulty>9
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
        }
        else if(difficulty>9)setTimeout(hideCards,1000);
      }
    })
    card.appendChild(cardtitle);
    main.appendChild(card);
  };
};

function hideCards(){
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
}