import { readFullFileStrings } from "../utils/input";
import { print } from "../utils/output";
import { Card } from "./Card";

const CARDS_SIZE = 5;
/** https://adventofcode.com/2021/day/4 */

async function main() {
    const data = await readFullFileStrings(__dirname);
    const [numbersData, , ...cardsData] = data;
    const cards = generateCards(cardsData);
    const numbers = numbersData.split(',').map(Number);

    const firstWinnerCardData = getFirstWinnerCard(numbers, cards);
    if (firstWinnerCardData) {
        const [winnerCard, lastCalledNumber] = firstWinnerCardData;
        const unmarkedSum = winnerCard.getUnmarkedSum();
        print(unmarkedSum * lastCalledNumber);
    }

    const lastWinnerCardData = getLastWinnerCard(numbers, cards);
    if (lastWinnerCardData) {
        const [winnerCard, lastCalledNumber] = lastWinnerCardData;
        const unmarkedSum = winnerCard.getUnmarkedSum();
        print(unmarkedSum * lastCalledNumber);
    }
}

function generateCards(cardsData: string[]): Card[] {
    const data = [] as Card[];
    let currentCardData = [] as number[][];
    cardsData.forEach((row, index) => {
        if (row === '') {
            data.push(new Card(currentCardData));
            currentCardData = [];
            return;
        }
        const numbersRow = row.split(/\s+/).filter(Boolean).map(Number);
        currentCardData.push(numbersRow);
    });
    if (currentCardData.length) {
        data.push(new Card(currentCardData));
    }
    return data;
}

function getFirstWinnerCard(numbers: number[], cards: Card[]): [Card, number] | null {
    let winnerCard = null;
    let lastCalledNumber = 0;
    let index = 0;
    for (const number of numbers) {
        for (const card of cards) {
            card.mark(number);
            if (index >= (CARDS_SIZE - 1) && card.isWinner()) {
                winnerCard = card;
                lastCalledNumber = number;
                break;
            }
        }
        if (winnerCard) {
            break;
        }
        ++index;
    }
    if (!winnerCard) {
        return null;
    }
    return [winnerCard, lastCalledNumber];
}

function getLastWinnerCard(numbers: number[], cards: Card[]): [Card, number] | null {
    let winnerCard = null;
    let lastCalledNumber = 0;
    let index = 0;
    let winnerCounts = 0;
    for (const number of numbers) {
        if (winnerCounts >= cards.length) {
            break;
        }
        for (const card of cards) {
            if (card.wasWinner()) {
                continue;
            } 
            card.mark(number);
            if (index >= (CARDS_SIZE - 1) && card.isWinner()) {
                winnerCard = card;
                lastCalledNumber = number;
                ++winnerCounts;
            }
        }
        ++index;
    }
    if (!winnerCard) {
        return null;
    }
    return [winnerCard, lastCalledNumber];
}

main();