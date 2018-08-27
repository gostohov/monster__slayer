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
			this.playerAttack(3,10);
			this.monsterAttack(5, 12);
		},
		specialAttack: function() {
			this.playerAttack(10,20);
			this.monsterAttack(8, 20);
		},
		heal: function() {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}
			this.monsterAttack(5, 12);
		},
		giveUp: function() {
			this.gameIsRunning = false;
		},
		playerAttack: function(min, max) {
			this.monsterHealth -= this.calculateDamage(min, max);
			if (this.monsterHealth < 0) {
				this.monsterHealth = 0;
			}
			if (this.checkWin()) {
				return;
			}
		},
		monsterAttack: function(min, max) {
			this.playerHealth -= this.calculateDamage(min, max);
			if (this.playerHealth < 0) {
				this.playerHealth = 0;
			}
			this.checkWin();
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