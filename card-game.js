var suits = ["♠", "♦️", "♣️", "♥"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let scorePlayer=0;
let scorePc=0;
let gameswon=0,gameslost=0;
let currentDeck=getDeck();
shuffle(currentDeck);
let field=document.body.querySelector("main");
let buttondraw=document.querySelector(".drawCard");
let buttonhold=document.querySelector(".hold");
let human=document.createElement("div");
human.classList.add("playerfield");
human.style.width="100vw";
let pc=document.createElement("div");
pc.classList.add("pcfield");

function getDeck()
{
	let deck = [];

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}
	return deck;
}
function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (let i = 0; i < 1000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}
function DrawCard(boolplayer){
	if(currentDeck.length>1)
	{
		let card=document.createElement("div");
		card.classList.add("card");
		let drawncard=currentDeck.pop();
		card.textContent=drawncard.Value+drawncard.Suit;
		if(drawncard.Suit==="♦")card.style.color="red";
		else if(drawncard.Suit==="♥")card.style.color="red";
		else if(drawncard.Suit==="♣")card.style.color="black";
		else if(drawncard.Suit==="♠")card.style.color="black";
		let score=0;
		if(parseInt(drawncard.Value))score+=parseInt(drawncard.Value);
		if(drawncard.Value==="A")score+=1;
		if(drawncard.Value==="J")score+=11;
		if(drawncard.Value==="Q")score+=12;
		if(drawncard.Value==="K")score+=13;
		if(boolplayer)scorePlayer+=score;
		else scorePc+=score;
		return card;
	}
}
function GameEnd(boolplayerwon){
	if(boolplayerwon){
		gameswon++;
	}
	else gameslost++;
	if(gameslost<gameswon)alert("You beat me! You must have cheated! best of"+((gameswon*2)+1)+"? current score pc:"+gameslost+"You: "+gameswon);
	if(gameslost===gameswon)alert("It's a tie!? Ready to lose? current score pc:"+gameslost+"You: "+gameswon);
	else alert("You are no match for the mighty computer! Care to get further behind? current score pc:"+gameslost+" You: "+gameswon);
	scorePlayer=0;
	scorePc=0;
	human.innerHTML=[];
	pc.innerHTML=[];
	field.innerHTML=[];
	if(currentDeck.length<10)shuffle(currentDeck=getDeck());
}

buttondraw.addEventListener("click",()=>{
	human.appendChild(DrawCard(true));
	pc.appendChild(DrawCard(false));
	if(scorePc>21)GameEnd(true);
	if(scorePlayer>21)GameEnd(false);
	field.appendChild(pc);
	field.appendChild(human);
})
buttonhold.addEventListener("click",()=>{
	if(scorePc<scorePlayer)
	{
		pc.appendChild(DrawCard(false));
		if(scorePc>21)GameEnd(true);
		if(scorePc>scorePlayer)GameEnd(false);
		else if(scorePc<15)pc.appendChild(DrawCard(false));
		else GameEnd(true);
	}
	else GameEnd(false);
	field.appendChild(pc);
	field.appendChild(human);
})