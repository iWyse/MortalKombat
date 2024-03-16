//* Task #0

const attack = function attack() {
	const result = `${this.name} Fight`;
	console.log(result);
	return result;
};

const player1 = {
	title: "player1",
	name: "scorpion",
	hp: 65,
	img: "./assets/scorpion.png",
	weapon: ["axe"],
	attack,
};

const player2 = {
	title: "player2",
	name: "subzero",
	hp: 90,
	img: "./assets/subzero.png",
	weapon: ["stick"],
	attack,
};

player1.attack();
player2.attack();

//* Task #1
// const root = document.querySelector(".root");

// function createPlayer() {
// 	const player = document.createElement("div");
// 	player.classList.add("player1");

// 	const progressbar = document.createElement("div");
// 	progressbar.classList.add("progressbar");

// 	const life = document.createElement("div");
// 	life.style.width = "100%";
// 	const name = document.createElement("div");
// 	life.classList.add("life");
// 	name.classList.add("name");
// 	name.innerText = "Scorpion";

// 	const character = document.createElement("div");
// 	character.classList.add("character");

// 	const img = document.createElement("img");
// 	img.src = "./assets/scorpion.png";
// 	character.append(img);
// 	progressbar.append(name, life);
// 	player.append(progressbar, character);
// 	root.append(player);
// }
// createPlayer();

//* Task #2
// const arenas = document.querySelector(".arenas");

// function createPlayer(player, playerName, playerHP, playerImage) {
// 	const $player = document.createElement("div");
// 	$player.classList.add(player);

// 	const progressbar = document.createElement("div");
// 	progressbar.classList.add("progressbar");

// 	const life = document.createElement("div");
// 	life.style.width = `${playerHP} + %`;
// 	const name = document.createElement("div");
// 	life.classList.add("life");
// 	name.classList.add("name");
// 	name.innerText = playerName;

// 	const character = document.createElement("div");
// 	character.classList.add("character");

// 	const img = document.createElement("img");
// 	img.src = playerImage;
// 	character.append(img);
// 	progressbar.append(name, life);
// 	$player.append(progressbar, character);
// 	arenas.append($player);
// }
// createPlayer("player1", player1.name, player1.hp, player1.img);
// createPlayer("player2", player2.name, player2.hp, player2.img);

//* Task #3
const arenas = document.querySelector(".arenas");

function createPlayer(player) {
	let { title, name: playerName, hp, img } = player;
	const $player = document.createElement("div");
	$player.classList.add(title);

	const progressbar = document.createElement("div");
	progressbar.classList.add("progressbar");

	const life = document.createElement("div");
	life.style.width = `${hp}%`;
	const name = document.createElement("div");
	life.classList.add("life");
	name.classList.add("name");
	name.innerText = playerName;

	const character = document.createElement("div");
	character.classList.add("character");

	const image = document.createElement("img");
	image.src = img;
	character.append(image);
	progressbar.append(name, life);
	$player.append(progressbar, character);
	arenas.append($player);
}
createPlayer(player1);
createPlayer(player2);
