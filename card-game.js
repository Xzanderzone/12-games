let suits = ["♠", "♦️", "♣️", "♥"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let scorePlayer=0;
let scorePc=0;
let gameswon=0,gameslost=0,gamesTied=0;
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
let playerScore=document.body.querySelector(".playerscore");
let pcScore=document.body.querySelector(".pcscore");
let playerOverview=document.body.querySelector(".playeroverview");
let pcOverview=document.body.querySelector(".pcoverview");
let tieOverview=document.body.querySelector(".tieoverview");
let gamescore=document.body.querySelector(".gamescore");
let message=document.querySelector(".matchtext");

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
		if(drawncard.Suit==="♥" || drawncard.Suit==="♦")card.style.color="red";
		else if(drawncard.Suit==="♠" || drawncard.Suit==="♣")card.style.color="black";
		let score=0;
		if(parseInt(drawncard.Value))score+=parseInt(drawncard.Value);
		if(drawncard.Value==="A")score+=1;
		if(drawncard.Value==="J")score+=11;
		if(drawncard.Value==="Q")score+=12;
		if(drawncard.Value==="K")score+=13;
		if(boolplayer)scorePlayer+=score;
		else scorePc+=score;
		playerScore.innerHTML="Player: "+scorePlayer;
		pcScore.innerHTML="PC: "+scorePc;
		return card;
	}
}

function GameEnd(tieWinLoss012){
	let text="Round winner: ";
	if(tieWinLoss012==1){
		gameswon++;
		gamescore.innerHTML=text+"You!";
	}
	else if(tieWinLoss012==2){
		gameslost++;
		gamescore.innerHTML=text+"PC";
	}
	else {
		gamesTied++;
		gamescore.innerHTML=text+"Tied";
	}
	playerScore.innerHTML="Player: "+scorePlayer;
	pcScore.innerHTML="PC: "+scorePc;
	playerOverview.innerHTML="Player: "+gameswon;
	pcOverview.innerHTML="PC: "+gameslost;
	tieOverview.innerHTML="Ties: "+gamesTied;
	if(currentDeck.length<10)shuffle(currentDeck=getDeck());
	//delaying the end so it can draw the cards 
	setTimeout(`
	scorePlayer=0;
	scorePc=0;
	human.innerHTML=[];
	pc.innerHTML=[];
	field.innerHTML=[];
	`,500)
	if(tieWinLoss012==1){
		if(gameslost<gameswon)message.textContent=("You beat me again! You must be cheating! best of "+((gameswon*2)+1)+" ? ")
		else if(gameslost===gameswon)message.textContent=("You won and We're tied!? Ready to lose? ")
		else message.textContent=("You may have won but you are no match for the mighty computer! Care to get further behind? ")
		message.style.color="green";
		gamescore.style.color="green";
	}
	else if(tieWinLoss012==2){
		if(gameslost<gameswon)message.textContent=("You lost and you're still winning?! Fight me again i dare you!")
		else if(gameslost===gameswon)message.textContent=("You Lost and We're tied now! Ready to lose? ")
		else message.textContent=("You lose again! Surrender now before it becomes akward")
		message.style.color="red";
		gamescore.style.color="red";
	}
	else if(tieWinLoss012==0){
		if(gameslost<gameswon)message.textContent=("a tie while im losing!? Fight me again i dare you!")
		else if(gameslost===gameswon)message.textContent=("Guess we really are tied now! Ready to lose? ")
		else message.textContent=("a tie but not to threat im still ahead! Surrender now before it becomes akward")
		message.style.color="black";
		gamescore.style.color="black";
	};
}

buttondraw.addEventListener("click",()=>{
	human.appendChild(DrawCard(true));
	let pcskip=false;
	if(scorePc>16)pcskip=true;
	else pc.appendChild(DrawCard(false));
	field.appendChild(pc);
	field.appendChild(human);
	if(scorePc>21)GameEnd(1);
	else if(scorePlayer>21)GameEnd(2);
	else if(pcskip && scorePlayer>scorePc)GameEnd(1);
	else if(scorePlayer===21)GameEnd(1);
	else if(scorePc===21)GameEnd(2);
})

buttonhold.addEventListener("click",Hold);

function Hold()
{
	if(scorePc<=scorePlayer)
	{
		pc.appendChild(DrawCard(false));
		field.appendChild(pc);
		field.appendChild(human);
		if(scorePc<15){
			Hold();
		}
		else if(scorePc>21)GameEnd(1);
		else if(scorePc>scorePlayer)GameEnd(2);
		else {
			field.appendChild(pc);
			field.appendChild(human);
			GameEnd(1);
		}
	}
	else {
		field.appendChild(pc);
		field.appendChild(human);
		GameEnd(2);
	}
}