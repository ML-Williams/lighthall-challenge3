import React, {useCallback} from "react";

const words = [
    'analogy',
    'bureaucrat',
    'catastrophe',
    'demonstration',
    'enthusiasm',
    'zebra']

const Hangman = () => {
    const [word, setWord] = React.useState(words[Math.floor(Math.random() * words.length)]);
    const [guesses, setGuesses] = React.useState('');
    const [wrongGuesses, setWrongGuesses] = React.useState(0);
    const [holdGuesses, setHoldGuesses] = React.useState([]);

    const handleGuess = useCallback(() => {
            if (guesses.length === 0 ) return
            if (!word.includes(guesses)) {
                setWrongGuesses((wrongGuesses) => wrongGuesses + 1);
                setHoldGuesses((correctGuesses) => [...correctGuesses, guesses]);
            } else {
                setHoldGuesses((correctGuesses) => [...correctGuesses, guesses]);
            }
            setGuesses('')
        },
        [guesses, word]
    );

    const resetGame = useCallback(() => {
        setWord(words[Math.floor(Math.random() * words.length)]);
        setGuesses('');
        setHoldGuesses([]);
        setWrongGuesses(0);
    }, []);


    const hiddenWord = word.replace(/\w/g, (letter) =>
        holdGuesses.includes(letter) ? letter : "_ "
    );
    const isWinner = !hiddenWord.includes("_");


    const isLoser = wrongGuesses >= 6;


    return (
        <div>
            <h1>Hangman</h1>
            <p>
                {isWinner && "You win!"}
                {isLoser && "You lose!"}
                {!isWinner && !isLoser && (
                    <>
                        {hiddenWord} <br/>
                        Guesses: {holdGuesses.join('')} <br/>
                        Wrong guesses: {wrongGuesses}
                    </>
                )}
            </p>
            <div>
                {isWinner || isLoser ? (
                    <button onClick={resetGame}>Play again</button>
                ) : (
                    <div>
                        <input
                            type="text"
                            value={guesses}
                            onChange={e => setGuesses(e.target.value)}
                            maxLength={1}
                        />

                        <input
                            type='button'
                            onClick={handleGuess}
                            value='Submit'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default Hangman;