new Vue ({
    el: '#app',
    data: {
        moves: {
            moveOne: 'Tackle',
            moveTwo: 'Leech Seed ',
            moveThree: 'Razor Leaf',
            moveFour: 'Solar Beam'
        },
        playerPokemon: 'Bulbasaur',
        opponentPokemon: 'Pidgey',
        running: false,
        playerLife: 100,
        opponentLife: 100,
        logs: ''
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.opponentLife == 0
        },
        win() {
            return this.opponentLife == 0
        },
        lose() {
            return this.playerLife == 0
        },
    },
    methods: {
        startBattle() {
            this.running = true
            this.playerLife = 100
            this.opponentLife = 100
            this.log = []
        },
        attack(special, ult, source, move) {
            this.hurt('opponentLife', 2, 5, special, ult, this.playerPokemon, this.opponentPokemon, 'player')
            if(this.opponentLife > 0) {
                this.hurt('playerLife', 8, 7, false, false, this.opponentPokemon, this.playerPokemon, 'opponent')
            }
            this.moveLog(`${source} usou ${move}`)
        },
        hurt(prop, min, max, special, ult, source, target, cls) {
            const plusSpecial = special ? 6 : 0
            const plusUltimate = ult ? 150 : 0
            const hurt = this.getRandom(min + plusSpecial + plusUltimate, max + plusSpecial, plusUltimate)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.battleLog(`${source} causou ${hurt} ao ${target}`)
            
        },
        drainAndHurt(source, move) {
            this.heal(8, 6, this.playerPokemon)
            this.hurt('playerLife', 8, 7, false, false, this.opponentPokemon, this.playerPokemon)
            this.moveLog(`${source} usou ${move}`)
        },
        heal(min, max, source, target, cls) {
            const heal = this.getRandom(min, max)
            this.opponentLife = Math.ceil(Math.max(this.opponentLife - (heal / 8) , 0))
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.healLog(`${source} curou ${heal}`)
            
        },
        getRandom(min, max) {
            const value = Math.floor(Math.random() * min) + max
            return value
        },
        battleLog(text) {
            console.log(text)
        },
        healLog(text) {
            console.log(text)
        },
        moveLog(text) {
            console.log(text)
        }
         
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})