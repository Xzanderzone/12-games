let suits = ["♠", "♦️", "♣️", "♥","•","○","♂","♀","©"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let difficultyLevel=1; 
export function SetDifficulty(difficulty)
{
	if(difficulty>=1)difficultyLevel=difficulty;
}
	export function getDeck()
	{
	let deck = [];
	let insane=0;
	// if(difficultyLevel>4)insane+=difficultyLevel-4;
	for (let double=0;double<2;double++)
	{
		for(let i = 0; i < suits.length && i<difficultyLevel; i++)
		{
			for(let x = 0; x < values.length; x++)
			{
				let card = {Value: values[x], Suit: suits[i],useless:double};
				deck.push(card);
			}
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