import { getLetterMatchCount } from "../helpers";

describe("getLetterMatchCount", () => {
  let secretWord = "party";
  test("Returns 0 if no matching letters", () => {
    const letterMatchCount = getLetterMatchCount(secretWord, "block");
    expect(letterMatchCount).toBe(0);
  });

  test("returns correct count if there are matching letters", () => {
    const letterMatchCount = getLetterMatchCount(secretWord, "train");
    expect(letterMatchCount).toBe(3);
  });

  test("Duplicate matches in guessedWord are not counted again", () => {
    const letterMatchCount = getLetterMatchCount(secretWord, "partypartyparty");
    expect(letterMatchCount).toBe(5);
  });

  test("Multiple matches on same letter are counted as separate matches", () => {
    const letterMatchCount = getLetterMatchCount("mississippi", "assessment");
    expect(letterMatchCount).toBe(5);
  });

  test("Single match is not counted again if duplicates exist in secretWord", () => {
    const letterMatchCount = getLetterMatchCount("mississippi", "baseball");
    expect(letterMatchCount).toBe(1);
  });

  test("Works with lower case and upper case letters", () => {
    const letterMatchCount1 = getLetterMatchCount(secretWord.toUpperCase(), "party");
    const letterMatchCount2 = getLetterMatchCount(secretWord, "PARTY");
    const letterMatchCount3 = getLetterMatchCount("pARty", "pArTy");

    expect(letterMatchCount1).toBe(5);
    expect(letterMatchCount2).toBe(5);
    expect(letterMatchCount3).toBe(5);
  });

  test("Works if guessedWords is longer than secretWord", () => {
    const letterMatchCount = getLetterMatchCount(secretWord, "rudimentary");
    expect(letterMatchCount).toBe(4);
  });

  test("Works if secretWord is longer than guessedWord", () => {
    const letterMatchCount = getLetterMatchCount(secretWord, "par");
    expect(letterMatchCount).toBe(3);
  });

});

