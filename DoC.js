class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
        const dict = {
            1: 'Ace',
            2: 'Two',
            3: 'Three',
            4: 'Four',
            5: 'Five',
            6: 'Six',
            7: 'Seven',
            8: 'Eight',
            9: 'Nine',
            10: 'Ten',
            11: 'Jack',
            12: 'Queen',
            13: 'King',
        }
        this.name = dict[this.value];
    }
    show(){
        console.log(`Suit: ${this.suit}, Value: ${this.value}, Name: ${this.name}`);
    }
}

class Deck{
    constructor(){
        this.cards = this.reset();
    }
    reset(){
        var cards = [];
        const suits = ['Heart', 'Club', 'Diamond', 'Spade']
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        for (const suit in suits){
            for (const value in values){
                let new_card = new Card(suits[suit], values[value]);
                cards.push(new_card);
            }
        }
        if (this.cards){
            this.cards = cards;
            return this
        } else {
            return cards;
        }
    }
    shuffle(){
        let idx = this.cards.length - 1;
        let temp;
        while (idx > 0){
            let randomidx = Math.floor(Math.random() * idx)
            temp = this.cards[idx]
            this.cards[idx] = this.cards[randomidx];
            this.cards[randomidx] = temp;
            idx -= 1;
        }
        return this
    }
    deal(){
        return this.cards.splice(Math.floor(Math.random() * this.cards.length-1), 1)[0];
    }
    replace(card){
        this.cards.push(card);
        return this
    }
}

class Player{
    constructor(name, deck){
        this.deck = deck;
        this.name = name;
        this.hand = [deck.shuffle().deal(), deck.shuffle().deal(), deck.shuffle().deal(), deck.shuffle().deal(), deck.shuffle().deal()];
    }
    show_hand(){
        for (let card in this.hand){
            this.hand[card].show();
        }
        return this
    }
    take(){
        this.hand.push(this.deck.shuffle().deal());
        return this
    }
    discard(idx){
        let card = this.hand.splice(idx, 1)[0];
        this.deck.replace(card);
        return this
    }
}
deck = new Deck();
player = new Player('john', deck);
player.show_hand();
player.take().take().take().take();
player.discard(0).discard(4).discard(4).discard(4);
player.show_hand();
console.log(deck.cards);
deck.reset()
console.log(deck.cards);
