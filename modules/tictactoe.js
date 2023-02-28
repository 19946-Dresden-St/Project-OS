class TicTacToe{
    constructor() {
        this.score1 = document.getElementById("score1");
        this.score2 = document.getElementById("score2");
        this.scoreNul = document.getElementById("scoreNul");
        this.cases = [...document.getElementsByClassName("case")]; // nodelist -> array
        
    
        // initialize state
        this.state = {
        joueurEnCours: 1,
        scoreJ1: localStorage.getItem("winP1") || 0,
        scoreJ2: localStorage.getItem("winP2") || 0,
        matchNul: localStorage.getItem("tie") || 0,
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9: 0,
        };
    
        // bind class methods to "this"
        this.load = this.load.bind(this);
        this.resetState = this.resetState.bind(this);
        this.verifierVictoire = this.verifierVictoire.bind(this);
        this.jouerCase = this.jouerCase.bind(this);
    
        // load state on page load
        this.load();
    
        // add event listener to each case element
        this.cases.forEach((el) => {
            el.addEventListener("click", this.jouerCase);
        });
        
    }
    
    load() {
        let winP1 = localStorage.getItem("winP1");
        let winP2 = localStorage.getItem("winP2");
        let tie = localStorage.getItem("tie");
    
        this.score1.innerHTML = winP1 || 0;
        this.score2.innerHTML = winP2 || 0;
        this.scoreNul.innerHTML = tie || 0;
    }
    
    resetState() {
        this.state.joueurEnCours = 1;
        this.state.c1 = 0;
        this.state.c2 = 0;
        this.state.c3 = 0;
        this.state.c4 = 0;
        this.state.c5 = 0;
        this.state.c6 = 0;
        this.state.c7 = 0;
        this.state.c8 = 0;
        this.state.c9 = 0;
    }
    
    verifierVictoire() {
        if (
        (this.state.c1 == this.state.c2 &&
            this.state.c2 == this.state.c3 &&
            this.state.c1 > 0) ||
        (this.state.c1 == this.state.c4 &&
            this.state.c4 == this.state.c7 &&
            this.state.c1 > 0) ||
        (this.state.c1 == this.state.c5 &&
            this.state.c5 == this.state.c9 &&
            this.state.c1 > 0) ||
        (this.state.c3 == this.state.c5 &&
            this.state.c5 == this.state.c7 &&
            this.state.c7 > 0) ||
        (this.state.c2 == this.state.c5 &&
            this.state.c5 == this.state.c8 &&
            this.state.c2 > 0) ||
        (this.state.c3 == this.state.c6 &&
            this.state.c6 == this.state.c9 &&
            this.state.c3 > 0) ||
        (this.state.c4 == this.state.c5 &&
            this.state.c5 == this.state.c6 &&
            this.state.c4 > 0) ||
        (this.state.c7 == this.state.c8 &&
            this.state.c8 == this.state.c9 &&
            this.state.c7 > 0)
        )    
        {
            // If any winning condition is met, update the scores and reset the state
            if (this.state.joueurEnCours === 1) {
                this.state.scoreJ1++;
                localStorage.setItem("winP1", this.state.scoreJ1);
                this.score1.innerHTML = this.state.scoreJ1;
                this.cases.forEach((c) => (c.textContent = ""));

            } else {
                this.state.scoreJ2++;
                localStorage.setItem("winP2", this.state.scoreJ2);
                this.score2.innerHTML = this.state.scoreJ2;
                this.cases.forEach((c) => (c.textContent = ""));

            }
            this.resetState();
            return true;
        } else if (
            // Check if all cases are played but no winning condition is met
            this.state.c1 !== 0 &&
            this.state.c2 !== 0 &&
            this.state.c3 !== 0 &&
            this.state.c4 !== 0 &&
            this.state.c5 !== 0 &&
            this.state.c6 !== 0 &&
            this.state.c7 !== 0 &&
            this.state.c8 !== 0 &&
            this.state.c9 !== 0
        ) {
            // If all cases are played and no winning condition is met, update the scores and reset the state
            this.state.matchNul++;
            localStorage.setItem("tie", this.state.matchNul);
            this.scoreNul.innerHTML = this.state.matchNul;
            this.cases.forEach((c) => (c.textContent = ""));

            this.resetState();
            return true;
        } else {
            return false;
        }
    }                
    
    jouerCase(event) {
        const caseId = event.target.getAttribute("id");
    
        // Play case only if it is not already played
        if (this.state[caseId] === 0) {
            const joueurEnCours = this.state.joueurEnCours;
            this.state[caseId] = joueurEnCours;
            event.target.textContent = joueurEnCours === 1 ? "X" : "O";
            event.target.classList.add(`joueur${joueurEnCours}`);
            
            localStorage.getItem("vibration") == true && console.log("vibrate");

            localStorage.getItem("vibration") == true && console.log("vibrate");
            if ("vibrate" in navigator && localStorage.getItem("vibration") == true) {
                navigator.vibrate(10);
                console.log("vibrate");
            }

            const gameWon = this.verifierVictoire();
    
            if (!gameWon) {
                // Switch player turn
                this.state.joueurEnCours = joueurEnCours === 1 ? 2 : 1;
            } 
        }
    }

    resetGame() {
        // Reset game state
        this.resetState();
        // Remove all CSS classes from case elements
        this.cases.forEach((el) => {
          el.classList.remove("joueur1");
          el.classList.remove("joueur2");
          el.textContent = "";

        });
      
        // Update the UI to reflect the reset state
        this.score1.innerHTML = this.state.scoreJ1;
        this.score2.innerHTML = this.state.scoreJ2;
        this.scoreNul.innerHTML = this.state.matchNul;
    }
}

export default TicTacToe;