const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');
const formFight = document.querySelector('.control');

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

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

/**
 * Функция создает элемент HTML
 * @param {string} tag
 * @param {string} className
 * @returns {HTMLElement}
 */
function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}

	return $tag;
}
/**
 * Функция создает игрока
 * @param playerObject
 * @returns {HTMLElement}
 */
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
/**
 * Функция выводит результат игры, победа или ничья
 * @param {string} name
 * @returns {HTMLElement}
 */
function showResult(name) {
	const gameResult = createElement('div', 'gameResult');
	if (name) {
		gameResult.innerText = name + ' wins';
	} else {
		gameResult.innerText = 'Draw';
	}

	return gameResult;
}
/**
 * Функция генерации случайных чисел в диапазоне min / max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandom(number) {
	return number ? Math.ceil(Math.random() * number) : 20;
}
/**
 * Функция уменьшает HP у игрока на величину damage
 * @param {number} damage
 * @returns {number}
 */
function changeHP(damage) {
	this.hp -= damage;
}
/**
 * Функция возвращает элемент здоровья персонажа
 * @returns {HTMLElement}
 */
function elHP() {
	return document.querySelector(`.player${this.playerID} .life`);
}

/**
 * Функция отрисовывает кол-во жизней в %
 * @returns {HTMLElement}
 */
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

/**
 * Функция создает кнопку перезагрузки игры
 * @returns {HTMLElement}
 */
function createReloadButton() {
	const reloadWrap = createElement('div', 'reloadWrap');
	const buttonRestart = createElement('button', 'button');
	buttonRestart.innerText = 'Restart';
	buttonRestart.addEventListener('click', function (event) {
		window.location.reload();
	});
	reloadWrap.append(buttonRestart);
	arenas.append(reloadWrap);

	return reloadWrap;
}
/**
 * Функция - удар противника
 * @returns {{hit: (string), defence: (string), value: number}}
 */
function enemyAttack() {
	const hit = ATTACK[getRandom(ATTACK.length) - 1];
	const defence = ATTACK[getRandom(ATTACK.length) - 1];
	console.log(ATTACK.length);
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	};
}

/**
 * Функция - удар игрока
 * @param {Element} formFight
 * @returns {{hit: (string), defence: (string), value: number}}
 */
function playerAttack() {
	const attack = {
		value: 0,
		hit: '',
		defence: '',
	};
	for (let item of formFight) {
		if (item.checked && item.name === 'hit') {
			attack.value = getRandom(HIT[item.value]);
			attack.hit = item.value;
		}

		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}
		//Обнуление контролов
		item.checked = false;
	}

	return attack;
}

/**
 * Функция - бой
 * @param player1
 * @param player2
 */
function fight(player1, player2) {
	const enemy = enemyAttack();
	const player = playerAttack();

	if (enemy.hit !== player.defence) {
		player1.changeHP(enemy.value);
		player1.renderHP();
	}

	if (player.hit !== enemy.defence) {
		player2.changeHP(player.value);
		player2.renderHP();
	}
}

/**
 * Функция - Рельзультат боя
 * @param player1
 * @param player2
 */
function checkResult(player1, player2) {
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
}

formFight.addEventListener('submit', function (event) {
	event.preventDefault();

	fight(player1, player2);

	checkResult(player1, player2);
});

arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));
