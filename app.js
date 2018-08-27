new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
	},
	methods: {
		startGame: function() {
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.gameIsRunning = true;
		},
		attack: function() {
			this.monsterHealth -= this.calculateDamage(3, 10);
			if (this.monsterHealth < 0) {
				this.monsterHealth = 0;
			}
			if (this.checkWin()) {
				return;
			}
			this.playerHealth -= this.calculateDamage(5, 12);
			if (this.playerHealth < 0) {
				this.playerHealth = 0;
			}
			this.checkWin();
		},
		specialAttack: function() {
			this.monsterHealth -= this.calculateDamage(10, 18);
			if (this.monsterHealth < 0) {
				this.monsterHealth = 0;
			}
			if (this.checkWin()) {
				return;
			}
			this.playerHealth -= this.calculateDamage(8, 20);
			if (this.playerHealth < 0) {
				this.playerHealth = 0;
			}
			this.checkWin();
		},
		heal: function() {

		},
		giveUp: function() {

		},
		calculateDamage: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin: function() {
			if (this.monsterHealth <= 0) {
				if (confirm('Вы выиграли! Хотите начать новую игру?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			} else if (this.playerHealth <= 0) {
				if (confirm('Вы проиграли! Хотите начать новую игру?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		}
	}
});