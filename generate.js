const rita = require('rita');
const fs = require('fs');
require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
const dictionary = require('./dictionary.txt').split('\n');

const randomIndex = (max, excepts) => Math.floor(Math.random() * (max + 1));
Array.prototype.pick = () => this[Math.floor(Math.random() * this.length)];
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const madlib = (noun, verb) => `${noun} cat. The cat that ${verb} ${noun}!`;

const nouns = dictionary
  .filter(word => !word.includes(' ') && rita.isNoun(word))
  .map(word => rita.singularize(word))
  .filter(onlyUnique);

const verbs = dictionary
  .filter(word => !word.includes(' ') && rita.isVerb(word))
  .map(word =>
    rita.conjugate(word, {
      tense: rita.PRESENT_TENSE,
      number: rita.SINGULAR,
      person: rita.THIRD_PERSON
    })
  )
  .filter(onlyUnique);

const generate = () => verbs;

// const plurals = nouns.map(singular => rita.pluralize(singular));

// const singulars = plurals.map(plural => rita.singularize(plural));

// const generate = () =>
//   console.log(
//     singulars.map((singular, i) => `${nouns[i]} ${plurals[i]} ${singular}`)
//   );

// const generate = () =>
//   fs.writeFile('/nouns.txt', nounGen.join('\n'), function(err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('The file was saved!');
//   });

module.exports = {
  generate
};
