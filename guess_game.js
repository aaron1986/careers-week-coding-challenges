//dom shit

//variables



//guessing game object

    const CatOrDog = {
        catImages: ["cat1.jpg", "cat2.jpg", "cat3.jpg"],
        dogImages: ["dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg", "dog5.jpg"],

        getRandomImage: function() {
            const randomNum = Math.random();
            if (randomNum < 0.5) {
                return this.catImages[Math.floor(Math.random() * this.catImages.length)];
            } else {
                return this.dogImages[Math.floor(Math.random() * this.dogImages.length)];
            }
        },
        guessCatOrDog: function(imageURL) {
            if (this.catImages.includes(imageURL)) {
                return "cat";               
            } else if (this.dogImages.includes(imageURL)) {
                return "dog";
            }
        },

        getPlayerScore: function() {
            return parseInt(localStorage.getItem('playerScore')) || 0;
        }

    };

    const imageElement = document.getElementById("image");
    const guessInput = document.getElementById("guess");
    const checkButton = document.getElementById("checkButton");
    const resultElement = document.getElementById("result");
    const userNameInput = document.getElementById("userName"); 
    const saveButton = document.getElementById("saveButton");
    const playerNameDisplay = document.getElementById("playerName");
const playerScoreDisplay = document.getElementById("playerScore");

    let playerScore = 0;
    let userName = localStorage.getItem('userName') || '';

    function updateScore(score) {
        playerScore = score;
        localStorage.setItem('playerScore', playerScore.toString());
        playerScoreDisplay.textContent = `Score: ${playerScore}`;
    }

    function saveUserName() {
        userName = userNameInput.value;
        localStorage.setItem('userName', userName);
        playerNameDisplay.textContent = `Player Name: ${userName}`;
    }

    function startNewGame() {
        playerScore = 0; // Reset player's score at the start of a new game.
        updateScore(playerScore);
        startNewRound();
    }

    // Function to start a new round of the game.
    function startNewRound() {
        const randomImage = CatOrDog.getRandomImage();
        imageElement.src = randomImage;
        resultElement.textContent = "";
        guessInput.value = "";
    }

    userNameInput.value = userName;
    startNewRound();

    checkButton.addEventListener("click", function() {
        const userGuess = guessInput.value.toLowerCase();
        const imageURL = imageElement.src.split("/").pop(); // Extract the image filename from the URL.
        const actualAnswer = CatOrDog.guessCatOrDog(imageURL);

        if (userGuess === actualAnswer) {
            resultElement.textContent = `Congratulations! You guessed correctly.`;
            updateScore(playerScore + 1); 
        } else {
            resultElement.textContent = `Sorry, that's incorrect.`;
            updateScore(playerScore - 1); 
        }
        console.log(`Score: ${playerScore}`);
        // Start a new round after a short delay (you can adjust the delay as needed).
        setTimeout(startNewRound, 2000);
    });

    saveButton.addEventListener("click", function() {
        saveUserName();
    });