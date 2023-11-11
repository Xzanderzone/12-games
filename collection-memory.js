let suits = ["♠", "♦️", "♣️", "♥","•","○","♂","♀","©"];
let color = ["black", "red", "black", "red","green","blue","green","blue","purple"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let difficultyLevel=1; 
export function SetDifficulty(difficulty)
{
	difficultyLevel=difficulty;
}
	export function getDeck()
	{
	let deck = [];
	let pairs;
	if(difficultyLevel<=9)pairs=2;
	else if(difficultyLevel>9)pairs=3;
	for (let duplicate=0;duplicate<pairs;duplicate++)
	{
		let maxsuits=suits.length;
		if (difficultyLevel>maxsuits)difficultyLevel-=maxsuits;
		for(let i = 0; i < suits.length && i<difficultyLevel; i++)
		{
			for(let x = 0; x < values.length; x++)
			{
				let card = {Value: values[x], Suit: suits[i],color:color[i]};
				deck.push(card);
			}
		}
		if(difficultyLevel==0){
			let randomcard=Math.floor(Math.random()*maxsuits);
			let card = {Value: values[0], Suit: suits[randomcard],color:color[0]};
			deck.push(card);
		}
	}
	return deck;
}

export function shuffle(deck)
{
	// for 1000 turns switch the values of two random cards
	for (let i = 0; i < 1000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];
		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}