export const getLetterMatchCount = (guessedWord, secretWord) => {
  let secretObject = {};
  let lettersInCommon = 0;

  secretWord.split("").forEach(word => {
    let lowerCaseWord = word.toLowerCase();
    if (!secretObject[lowerCaseWord]) secretObject[lowerCaseWord] = 0;
    secretObject[lowerCaseWord] += 1;
  });

  guessedWord.split("").forEach(word => {
    let lowerCaseWord = word.toLowerCase();
    if (!secretObject[lowerCaseWord]) return;
    secretObject[lowerCaseWord] -= 1;
    if (secretObject[lowerCaseWord] >= 0) lettersInCommon += 1;
  })

  return lettersInCommon;
};