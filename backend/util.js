const stopword = require("stopword");
const natural = require("natural");
const { mainModule } = require("process");
const e = require("express");
  
// For conversion of contractions to standard lexicon
const wordDict = {
    "aren't": "are not",
    "can't": "cannot",
    "couldn't": "could not",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not",
    "hadn't": "had not",
    "hasn't": "has not",
    "haven't": "have not",
    "he'd": "he would",
    "he'll": "he will",
    "he's": "he is",
    "i'd": "I would",
    "i'd": "I had",
    "i'll": "I will",
    "i'm": "I am",
    "isn't": "is not",
    "it's": "it is",
    "it'll": "it will",
    "i've": "I have",
    "let's": "let us",
    "mightn't": "might not",
    "mustn't": "must not",
    "shan't": "shall not",
    "she'd": "she would",
    "she'll": "she will",
    "she's": "she is",
    "shouldn't": "should not",
    "that's": "that is",
    "there's": "there is",
    "they'd": "they would",
    "they'll": "they will",
    "they're": "they are",
    "they've": "they have",
    "we'd": "we would",
    "we're": "we are",
    "weren't": "were not",
    "we've": "we have",
    "what'll": "what will",
    "what're": "what are",
    "what's": "what is",
    "what've": "what have",
    "where's": "where is",
    "who'd": "who would",
    "who'll": "who will",
    "who're": "who are",
    "who's": "who is",
    "who've": "who have",
    "won't": "will not",
    "wouldn't": "would not",
    "you'd": "you would",
    "you'll": "you will",
    "you're": "you are",
    "you've": "you have",
    "'re": " are",
    "wasn't": "was not",
    "we'll": " will",
    "didn't": "did not"
}

const preProcess = text => {
  let data = text.toLowerCase().replace(/[^a-zA-Z\s]+/g, '').replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/(?<!\w)@[\w+]{1,15}\b/, '').split(' ');
  data.forEach((word, index) => {
      Object.keys(wordDict).forEach(key => {
          if (key === word.toLowerCase()) {
              data[index] = wordDict[key]
          };
      });
  });

  data = data.join(' ');

  const tokenConstructor = new natural.WordTokenizer();
  const tokenizedData = tokenConstructor.tokenize(data);
  //console.log("Tokenized Data: ",tokenizedData);

  // Remove Stopwords
  const filteredData = stopword.removeStopwords(tokenizedData);
  return filteredData
}

const findMostRelevantKeywords = (keywords) => {
    const sorted = keywords.sort()
    let res = []

    for (let i = 0; i < sorted.length; i++) {
        if ((i == 0 || sorted[i] != sorted[i-1]) && sorted[i].indexOf("http") == -1) {
            res.push(sorted[i])
            if (res.length >= 6) {
                break
            }
        }
    }

    return res
}

module.exports = {preProcess, findMostRelevantKeywords}