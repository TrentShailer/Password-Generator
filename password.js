const env = require("dotenv");
require("dotenv").config();
const fs = require("fs");
const clipboardy = require("clipboardy");
const seed = require("seed-random");

var text = fs.readFileSync("./words.txt").toString();
var strings = text.split(/\r?\n/);

function Generate(num, newSeed) {
	var curSeed = new Date().getTime();
	if (newSeed) curSeed = Number(newSeed);

	seed(curSeed.toString() + process.env.salt, { global: true });

	var pw = "";

	for (var i = 0; i < num; i++) {
		var index = Math.floor(Math.random() * strings.length);
		var word = strings[index];
		if (i == 0) word = word[0].toUpperCase() + word.substr(1, word.length - 1);

		pw += `${word} `;
	}
	pw = pw.substr(0, pw.length - 1);
	pw += "-1";
	return { password: pw, length: pw.length, seed: curSeed };
}

module.exports.Generate = Generate;
