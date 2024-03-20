const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const attack = function attack() {
	const result = `${this.name} Fight`;
	console.log(result);
	return result;
};

const player1 = {
	playerID: 1,
	title: 'player1',
	name: 'scorpion',
	hp: 100,
	img: './assets/scorpion.gif',
	weapon: ['axe'],
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,
	attack: attack,
};

const player2 = {
	playerID: 2,
	title: 'player2',
	name: 'kitana',
	hp: 100,
	img: './assets/kitana.gif',
	weapon: ['stick'],
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,
	attack: attack,
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
arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));

function showResult(name) {
	const gameResult = createElement('div', 'gameResult');
	if (name) {
		gameResult.innerText = name + ' wins';
	} else {
		gameResult.innerText = 'Draw';
	}
	setTimeout(() => {
		createReloadButton();
	}, 1000);
	randomButton.style.display = 'none';
	return gameResult;
}

randomButton.addEventListener('click', function () {
	player1.changeHP(randomInteger(1, 20));
	player1.renderHP(player1.elHP());
	player2.changeHP(randomInteger(1, 20));
	player2.renderHP(player2.elHP());

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

//* Ф-ия рандома
function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function changeHP(damage) {
	this.hp -= damage;
}

function elHP() {
	return document.querySelector(`.player${this.playerID} .life`);
}

function renderHP(damageDone) {
	const statusHP = document.querySelector(`.player${this.playerID} .hpPlayer`);
	damageDone.style.width = this.hp + '%';
	statusHP.innerText = this.hp + '%';
	if (this.hp <= 0) {
		statusHP.innerText = 'dead';
		damageDone.style.width = 0;
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
