new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: [],
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.monsterHealth = 100;
			this.playerHealth = 100;
		},
		attack: function() {
			this.playerAttack(3,10, false);
			this.monsterAttack(5, 12, false);
		},
		specialAttack: function() {
			this.playerAttack(10,20, true);
			this.monsterAttack(8, 20, true);
		},
		heal: function() {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
				this.turns.unshift({
					isPlayer: true,
					text: 'Player heals for 10'
				});
			} else {
				this.playerHealth = 100;
			}
			this.monsterAttack(5, 12);
		},
		giveUp: function() {
			this.gameIsRunning = false;
		},
		playerAttack: function(min, max, value) {
			var damage = this.calculateDamage(min, max);
			this.monsterHealth -= damage;
			if (value) {
				this.turns.unshift({
					isPlayer: true,
					text: 'Player hits hard Monster for ' + damage
				});
			} else {
				this.turns.unshift({
					isPlayer: true,
					text: 'Player hits Monster for ' + damage
				});
			}
			
			if (this.monsterHealth < 0) {
				this.monsterHealth = 0;
			}

			if (this.checkWin()) {
				return;
			}
		},
		monsterAttack: function(min, max, value) {
			var damage = this.calculateDamage(min, max);
			this.playerHealth -= damage;
			if (value) {
				this.turns.unshift({
					isPlayer: false,
					text: 'Monster hits hard Player for ' + damage
				});
			} else {
				this.turns.unshift({
					isPlayer: false,
					text: 'Monster hits Player for ' + damage
				});
			}
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