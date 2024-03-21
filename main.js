const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const attack = function attack() {
	console.log(`${this.name} Fight...`);
};

const player1 = {
	playerID: 1,
	title: 'player1',
	name: 'scorpion',
	hp: 100,
	img: './assets/scorpion.gif',
	weapon: ['axe'],
	changeHP,
	elHP,
	renderHP,
	attack,
};

const player2 = {
	playerID: 2,
	title: 'player2',
	name: 'kitana',
	hp: 100,
	img: './assets/kitana.gif',
	weapon: ['stick'],
	changeHP,
	elHP,
	renderHP,
	attack,
};

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}

	return $tag;
}

function createPlayer(player) {
	const playerEl = createElement('div', player.title);
	const progressbar = createElement('div', 'progressbar');
	const life = createElement('div', 'life');
	const name = createElement('div', 'name');
	const character = createElement('div', 'character');
	const image = createElement('img');
	const hpPlayer = createElement('div', 'hpPlayer');
	name.innerText = player.name;
	life.style.width = `${player.hp}%`;
	hpPlayer.innerText = `${player.hp}%`;
	image.src = player.img;
	character.append(image);
	progressbar.append(hpPlayer, name, life);
	playerEl.append(progressbar, character);
	return playerEl;
}

function showResult(name) {
	const gameResult = createElement('div', 'gameResult');
	if (name) {
		gameResult.innerText = name + ' wins';
	} else {
		gameResult.innerText = 'Draw';
	}

	return gameResult;
}

function getRandom(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function changeHP(damage) {
	this.hp -= damage;
}

function elHP() {
	return document.querySelector(`.player${this.playerID} .life`);
}

function renderHP() {
	const statusHP = document.querySelector(`.player${this.playerID} .hpPlayer`);
	this.elHP().style.width = this.hp + '%';
	statusHP.innerText = this.hp + '%';
	if (this.hp <= 0) {
		statusHP.innerText = 'dead';
		this.elHP().style.width = 0;
		this.hp = 0;
	}
}

function createReloadButton() {
	const reloadWrap = createElement('div', 'reloadWrap');
	const buttonRestart = createElement('button', 'button');
	buttonRestart.innerText = 'Restart';
	buttonRestart.addEventListener('click', function (event) {
		window.location.reload();
	});
	reloadWrap.append(buttonRestart);
	arenas.append(reloadWrap);
}

randomButton.addEventListener('click', function () {
	player1.changeHP(getRandom(1, 20));
	player2.changeHP(getRandom(1, 20));
	player1.renderHP();
	player2.renderHP();

	if (player1.hp === 0 || player2.hp === 0) {
		randomButton.disabled = true;

		setTimeout(() => {
			createReloadButton();
		}, 1000);
		randomButton.style.display = 'none';
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		arenas.append(showResult(player2.name));
	} else if (player2.hp === 0 && player1.hp > player2.hp) {
		arenas.append(showResult(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		arenas.append(showResult());
	}
});

arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));
