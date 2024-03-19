const arenas = document.querySelector(".arenas");
const randomButton = document.querySelector(".button");

const attack = function attack() {
	const result = `${this.name} Fight`;
	console.log(result);
	return result;
};

const player1 = {
	player: 1,
	title: "player1",
	name: "scorpion",
	hp: 100,

	img: "./assets/scorpion.png",
	weapon: ["axe"],
	attack,
};

const player2 = {
	player: 2,
	title: "player2",
	name: "subzero",
	hp: 100,
	img: "./assets/subzero.png",
	weapon: ["stick"],
	attack,
};

player1.attack();
player2.attack();

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}

	return $tag;
}
function createPlayer(player) {
	const $player = createElement("div", player.title);
	const progressbar = createElement("div", "progressbar");
	const life = createElement("div", "life");
	const name = createElement("div", "name");
	const character = createElement("div", "character");
	const image = createElement("img");
	const hpPlayer = createElement("div", "hpPlayer");
	name.innerText = player.name;
	life.style.width = `${player.hp}%`;
	hpPlayer.innerText = life.style.width;
	image.src = player.img;
	character.append(image);
	progressbar.append(hpPlayer, name, life);
	$player.append(progressbar, character);
	arenas.append($player);
	return $player;
}
arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));

function changeHP(player) {
	const playerLife = document.querySelector(`.player${player.player} .life`);
	const statusHP = document.querySelector(`.player${player.player} .hpPlayer`);
	player.hp -= randomInteger(1, 20);
	playerLife.style.width = player.hp + "%";
	statusHP.innerText = playerLife.style.width;
	if (player.hp <= 0) {
		statusHP.innerText = "dead";
		player.hp = 0;
	}
}

function showResult(name) {
	const gameResult = createElement("div", "gameResult");
	if (name) {
		gameResult.innerText = name + " wins";
	} else {
		gameResult.innerText = "Draw";
	}

	return gameResult;
}

randomButton.addEventListener("click", function () {
	changeHP(player1);
	changeHP(player2);

	if (player1.hp === 0 || player2.hp === 0) {
		randomButton.disabled = true;
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		arenas.append(showResult(player2.name));
	} else if (player2.hp === 0 && player1.hp > player2.hp) {
		arenas.append(showResult(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		arenas.append(showResult());
	}
});

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}
