const rita = require('rita');
const fs = require('fs');
require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
const dictionary = require('./dictionary.txt').split('\n');

const capitalize = word => word[0].toUpperCase() + word.substr(1);
const randomIndex = (max, excepts) => Math.floor(Math.random() * (max + 1));
Array.prototype.pick = function() {
  return this[Math.floor(Math.random() * this.length)];
};
function isUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const nouns = dictionary
  .filter(
    word =>
      !word.includes(' ') &&
      rita.isNoun(word) &&
      rita.getPosTags(word).includes('nn')
  )
  .map(word => rita.singularize(word))
  .filter(isUnique);

// const verbs = dictionary
//   .filter(word => !word.includes(' ') && rita.getPosTags(word).includes('vb'))
//   .map(word =>
//     rita.conjugate(word, {
//       tense: rita.PRESENT_TENSE,
//       number: rita.SINGULAR,
//       person: rita.THIRD_PERSON
//     })
//   )
//   .filter(isUnique);

// const noun = nouns.pick();
// const verb = verbs.pick();

const madlib = (noun, verb) =>
  `${capitalize(noun)} cat. The cat that ${verb} ${rita.pluralize(noun)}!`;

// const generate = () => {
//   console.log(
//     nouns
//       .map((noun, i) => `${noun} ${verbs[i]}`)
//       .slice(0, 100)
//       .join('\n')
//   );
//   return madlib(noun, verb);
// };

const generate = () =>
  fs.writeFile('./nouns.txt', nouns.join('\n'), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });

module.exports = {
  generate
};
