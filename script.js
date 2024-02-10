console.log("I see you");

const generateBtn = document.querySelector("#generate");
const passwordDisplay = document.querySelector("#password");

generateBtn.addEventListener("click", (e) => {
    const reqs = getRequirments();

    const passwordArray = generatePassword(reqs);
    const shuffled = shuffle(passwordArray);
    passwordDisplay.value = shuffled.join("");
});

function getRequirments() {
    const mixedCase = confirm(
        "Would you like your password to be a combination of upper and lower case characters"
    );
    const hasNumbers = confirm(
        "Would you like your password to contain numbers"
    );
    const hasSymbols = confirm(
        "Would you like your password to contain symbols"
    );

    let numChars = prompt(
        "How many characters would you like your password to contain"
    );

    while (!numChars || Number(numChars) < 8 || Number(numChars) > 128) {
        numChars = prompt(
            "You need to enter a value between 8 and 128 to continue"
        );
    }

    return {
        mixedCase,
        hasNumbers,
        hasSymbols,
        numChars: Number(numChars),
    };
}

const generateFromCharCode = (start, end) => {
    const collection = [];

    for (let i = start; i <= end; i++) {
        const letter = String.fromCharCode(i);
        collection.push(letter);
    }
    return collection;
};

function generatePassword(reqs) {
    const { mixedCase, hasNumbers, hasSymbols, numChars } = reqs;
    // ASCII Charcode range
    // symbols 33-47, 58-64, 91-96, 123-126
    // upper case letters 65-90
    // lower case letters 97-122
    // numbers 48-57

    const symbols = [
        ...generateFromCharCode(33, 47),
        ...generateFromCharCode(58, 64),
        ...generateFromCharCode(91, 96),
        ...generateFromCharCode(123, 126),
    ];

    const upperCaseLetters = generateFromCharCode(65, 90);
    const lowerCaseLetters = generateFromCharCode(97, 122);
    const numbers = generateFromCharCode(48, 57);

    //    if not mixedCase, noNumbers, noSymbols, simply use the numChars to generate the finalPassword
    //  if mixedCase but no numbers and no symbols divide the number of characters by 2 and get those number
    // of characters from the upperCase array and LowerCase Array
    //  if mixedCase, numbers but no symbols, divide the number of characters by 3 get from uppers, lowers and numbers
    // if all true divide the number of characters by 4 and

    const hasOnlyLetters = !mixedCase && !hasNumbers && !hasSymbols;
    const hasMixedLetterOnly = mixedCase && !hasNumbers && !hasSymbols;
    const hasMixedLettersAndNumbers = mixedCase && hasNumbers && !hasSymbols;

    let finalPassword = hasOnlyLetters
        ? [...getRandFromArray(numChars, lowerCaseLetters)]
        : hasMixedLetterOnly
        ? [
              ...getRandFromArray(Math.trunc(numChars / 2), lowerCaseLetters),
              ...getRandFromArray(Math.trunc(numChars / 2), upperCaseLetters),
          ]
        : hasMixedLettersAndNumbers
        ? [
              ...getRandFromArray(Math.trunc(numChars / 3), lowerCaseLetters),
              ...getRandFromArray(Math.trunc(numChars / 3), upperCaseLetters),
              ...getRandFromArray(Math.trunc(numChars / 3), numbers),
          ]
        : [
              ...getRandFromArray(Math.trunc(numChars / 4), lowerCaseLetters),
              ...getRandFromArray(Math.trunc(numChars / 4), upperCaseLetters),
              ...getRandFromArray(Math.trunc(numChars / 4), numbers),
              ...getRandFromArray(Math.trunc(numChars / 4), symbols),
          ];

    if (finalPassword.length === numChars) {
        return finalPassword;
    }

    const delta = numChars - finalPassword.length;

    // Because the division is going to reduce the number of characters, if the user wants letters only make up the remaining characters using the lowercase letters

    const remainingChars = hasOnlyLetters
        ? [...getRandFromArray(delta, lowerCaseLetters)]
        : hasMixedLetterOnly
        ? [...getRandFromArray(delta, upperCaseLetters)]
        : hasMixedLettersAndNumbers
        ? [...getRandFromArray(delta, numbers)]
        : [...getRandFromArray(delta, symbols)];

    finalPassword = [...finalPassword, ...remainingChars];

    return finalPassword;
}

function getRandFromArray(numChars, arr) {
    const chars = [];
    for (let i = 0; i < numChars; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        chars.push(arr[randomIndex]);
    }
    return chars;
}

function shuffle(arr) {
    for (let i = arr.length; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
