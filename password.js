const env = require("dotenv");
require("dotenv").config();
const fs = require("fs");
const clipboardy = require("clipboardy");
const seed = require("seed-random");

var text = fs.readFileSync("./words.txt").toString();
var strings = text.split(/\r?\n/);

var adjectivesRaw = fs.readFileSync("./adjective.txt").toString();
var adjectiveStrings = adjectivesRaw.split(/\r?\n/);

var nounsRaw = fs.readFileSync("./noun.txt").toString();
var nounStrings = nounsRaw.split(/\r?\n/);

function Generate(num, newSeed) {
	var curSeed = new Date().getTime();
	if (newSeed) curSeed = Number(newSeed);

	seed(curSeed.toString() + process.env.salt, { global: true });

	var pw = "";

	for (var i = 0; i < num - 1; i++) {
		pw += `${GetWord(adjectiveStrings, i == 0)} `;
	}

	pw += `${GetWord(nounStrings, num == 1)}-1`;
	return { password: pw, length: pw.length, seed: curSeed };
}

function GetWord(list, capital = false) {
	var index = Math.floor(Math.random() * list.length);
	var word = list[index];
	if (capital) word = word[0].toUpperCase() + word.substr(1, word.length - 1);

	return word;
}

module.exports.Generate = Generate;
