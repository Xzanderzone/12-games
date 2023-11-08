var suits = ["♠", "♦️", "♣️", "♥"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

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
function DrawCard(){
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
		return card;
	}
}
//load a new deck and shuffle it
let currentDeck=getDeck();
shuffle(currentDeck);
//draw a card
let game=document.body.querySelector("main");
let button=document.querySelector(".drawCard");
button.textContent="Hit me";
button.addEventListener("click",()=>{
	game.appendChild(DrawCard());
})

game.appendChild(DrawCard());

