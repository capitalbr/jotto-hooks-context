import React from "react";
import PropTypes from "prop-types";
import TotalGuesses from "./totalGuesses";

const GuessedWords = ({ guessedWords }) => {
  let contents;
  if (!guessedWords.length) {
    contents = (
      <span data-test="guess-instructions">
        Please make a guess.
      </span>
    )
  } else {
    contents = (
      <>
        <h3>Guessed Words</h3>
        <table
          data-test="guessed-words"
          className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>Guess Number</th>
              <th>Guess</th>
              <th>Match Count</th>
            </tr>
          </thead>
          <tbody>
            {guessedWords.map((word, idx) => {
              return <tr
                data-test="guessed-word"
                key={idx}>
                <td data-test="guessed-word-number">{idx + 1}</td>
                <td data-test="word">{word.guessedWord}</td>
                <td data-test="letter-match-count">{word.letterMatchCount}</td>
              </tr>
            })}
          </tbody>
        </table>
      </>
    )
  }

  return(
    <div 
      data-test="component-guessed-words"
      className="guessed-words">
      {contents}
      <TotalGuesses totalGuesses={guessedWords.length}/>
    </div>
  )
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
};

export default GuessedWords;

