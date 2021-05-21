// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85
function runProgram() {
   console.clear();
   initialPrompt();
}
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let firstQuestion = input.question(`Let's play some scrabble! 

  Enter a word to score: `).toLowerCase();//the test will check the word and newPointStructure keys as matching in lower case.-Carl
  // console.log(scrabbleScore(firstQuestion));
  return firstQuestion;
};


let simpleScore = function(word) {
  // word = word.toUpperCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    letterPoints++;
  }
  return letterPoints;
};


let vowelBonusScore = function(word) {
  // word = word.toUpperCase();
  let letterPoints = 0;
  // const vowels = ["A", "E", "I", "O", "U"];

  for (let i = 0; i < word.length; i++) {//looking for lower case letters
    if (word[i] === 'a') {
      letterPoints += 3;
    } 
    else if (word[i] === 'e') {
      letterPoints += 3;
    }
    else if (word[i] === 'i') {
      letterPoints += 3;
    }
    else if (word[i] === 'o') {
      letterPoints += 3;
    }
    else if (word[i] === 'u') {
      letterPoints += 3;
    } else {
      letterPoints++;
    }
  }
  return letterPoints;
};

let scrabbleScore = function(word, pointStructure) {//scrabbleScore is supposed to take in a word and object as parameters(the user's word and newPointStructure)-Carl{see also ln:89 & 91}
  // word = word.toUpperCase();
  let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
	  for (const letter in pointStructure) {
		 if (letter.includes(word[i])) {
			letterPoints += pointStructure[letter]
		 }
 
	  }
	}
	return letterPoints;
};

let scoreZero = {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoringFunction: simpleScore
    };

let scoreOne = {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScore
};

let scoreTwo = {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore
};

const scoringAlgorithms = [scoreZero, scoreOne, scoreTwo];

// oldScrabbleScorer.scoringFunction = scrabbleScore;

function scorerPrompt(numberAlg) {
  let chosenAnswer;
  let secondQuestion = Number(input.question(`Which scoring algorithm would you like to use? 
  
  0 - Simple: One point per character
  1 - Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  Enter 0, 1, or 2: `));
    if (secondQuestion === 0) {
      // console.log("algorithm name: ", scoringAlgorithms[0].name);
      // console.log("scorerFunction result: ", scoringAlgorithms[0].scoringFunction(initialPrompt()));
      chosenAnswer = scoringAlgorithms[0];
    }
    else if (secondQuestion === 1) {
      // console.log("algorithm name: ", scoringAlgorithms[1].name);
      // console.log("scorerFunction result: ", scoringAlgorithms[1].scoringFunction(initialPrompt()));
      chosenAnswer = scoringAlgorithms[1]
    }
    else if (secondQuestion === 2) {
      // console.log("algorithm name: ", scoringAlgorithms[2].name);
      // console.log("scorerFunction result: ", scoringAlgorithms[2].scoringFunction(initialPrompt()));
      chosenAnswer = scoringAlgorithms[2]
    } 
  return chosenAnswer;
};


function transform(oldPointStructure) {
  let newObject = {};
  for (let key in oldPointStructure) {
    let letters = oldPointStructure[key];
    for (let i = 0; i < letters.length; i++) {
      letters[i] = letters[i].toLowerCase();//test was failing because it was checking for keys to be lower case.-Carl
      newObject[letters[i]] = Number(key);
    }
  }
  return newObject;
};

transform(oldPointStructure);
let newPointStructure = transform(oldPointStructure);
// console.log(newPointStructure);
  // a: 1,
  // b: 3,
  // c: 3,
  // d: 2,
  // e: 1,
  // f: 4,
  // g: 2,
  // h: 4,
  // i: 1,
  // j: 8,
  // k: 5,
  // l: 1,
  // m: 3,
  // n: 1,
  // o: 1,
  // p: 3,
  // q: 10,
  // r: 1,
  // s: 1,
  // t: 1,
  // u: 1,
  // v: 4,
  // w: 4,
  // x: 8,
  // y: 4,
  // z: 10


function runProgram() {
   let userWord = initialPrompt();
   let rulesSelected = scorerPrompt();
   console.log(`Score for '${userWord}': ${rulesSelected.scoringFunction(userWord)}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

