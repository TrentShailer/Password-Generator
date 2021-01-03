const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const passwordModule = require("./password.js");
const urlencodedParser = bodyParser.urlencoded({ extended: true });

var port = 25565;
var hostname = "0.0.0.0";

app.set("trust proxy", 1);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

app.get("/", async (req, res) => {
	return res.sendFile(__dirname + "/public/index.html");
});

app.post("/generate", urlencodedParser, async (req, res) => {
	var num = req.body.num;
	var seed = req.body.seed;
	var passwordData = passwordModule.Generate(num, seed);
	res.send(passwordData);
});

server.listen(port, hostname, async () => {
	console.log(`Server is running at port: ${port}!`);
});
