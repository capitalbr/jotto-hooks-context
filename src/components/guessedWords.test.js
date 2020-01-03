import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import GuessedWords from "../../components/jotto/guessedWords";

const defaultProps = {
  guessedWords: [{ guessedWord: "lucky", letterMatchCount: 3 }]
}

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props};
  return shallow(<GuessedWords {  ...setupProps}/>);
};

test("does not throw warning with expected props", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("if there are no words guessed", () => {

  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test("renders without error", () => {
    const guessedWords = findByTestAttr(wrapper, "component-guessed-words");
    expect(guessedWords.length).toBe(1);
  });

  test("renders instructions if there are no words guessed", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.length).toBe(1);
    expect(instructions.text()).not.toBe("");
  });

  test("does not render guessed words section if there are no words guessed", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(0);
  });
});

describe("if there are words guessed", () => {
  const guessedWords = [
      { guessedWord: "train", letterMatchCount: 3 },
      { guessedWord: "agile", letterMatchCount: 1 },
      { guessedWord: "party", letterMatchCount: 5 },
    ]
  
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });

  // don't test implementation meaning don't say "renders guessed words table"
  // it doesn't have to be a table
  // Also say 'Node' and not a specific element like "Div"
  test("renders guessed words section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });

  test("correct number of guessed words", () => {
    const guessedWordsNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });

  test("doesn't render instructions if there are words guessed", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.length).toBe(0);
  });

  test("displays correct guessed word count", () => {
    const guessedWordNumber = findByTestAttr(wrapper, 'guessed-word-number').getElements();
    expect(guessedWordNumber[0].props.children).toBe(1);
    expect(guessedWordNumber[1].props.children).toBe(2);
    expect(guessedWordNumber[2].props.children).toBe(3);
  });

  test("displays correct guessed word", () => {
    const word = findByTestAttr(wrapper, 'word').getElements();;
    expect(word[0].props.children).toBe("train");
    expect(word[1].props.children).toBe("agile");
    expect(word[2].props.children).toBe("party");
  });

  test("displays correct guessed word letter match count", () => {
    const letterMatchCount = findByTestAttr(wrapper, 'letter-match-count').getElements();
    expect(letterMatchCount[0].props.children).toBe(3);
    expect(letterMatchCount[1].props.children).toBe(1);
    expect(letterMatchCount[2].props.children).toBe(5);
  });
});