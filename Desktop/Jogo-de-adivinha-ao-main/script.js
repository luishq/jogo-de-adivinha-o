document.addEventListener('DOMContentLoaded', () => {
    const playerName = localStorage.getItem('playerName');
    const difficulty = localStorage.getItem('difficulty');
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    if (window.location.pathname.endsWith('index.html')) {
        document.getElementById('nameForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const difficulty = document.getElementById('difficulty').value;
            localStorage.setItem('playerName', name);
            localStorage.setItem('difficulty', difficulty);
            window.location.href = 'game.html';
        });
    }

    if (window.location.pathname.endsWith('game.html')) {
        if (!playerName || !difficulty) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('greeting').textContent = `Olá, ${playerName}!`;
        }

        let maxNumber;
        if (difficulty === 'easy') {
            maxNumber = 10;
        } else if (difficulty === 'medium') {
            maxNumber = 50;
        } else if (difficulty === 'hard') {
            maxNumber = 100;
        } else if (difficulty === 'impossible') {
            maxNumber = 1000;
        } else {
            window.location.href = 'index.html';
        }

        document.getElementById('rangeText').textContent = `Adivinhe o número entre 1 e ${maxNumber}:`;

        let randomNumber = generateRandomNumber(maxNumber);
        let attempts = 0;

        document.getElementById('guessForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const userGuess = parseInt(document.getElementById('guess').value);
            attempts++;

            if (userGuess === randomNumber) {
                document.getElementById('feedback').textContent = `Parabéns, ${playerName}! Você acertou o número em ${attempts} tentativas.`;
                document.getElementById('playAgain').style.display = 'flex';
                saveScore(playerName, attempts, difficulty);
            } else if (userGuess < randomNumber) {
                giveFeedback(randomNumber, userGuess, 'maior');
            } else {
                giveFeedback(randomNumber, userGuess, 'menor');
            }

            document.getElementById('guess').value = ''; // Limpar o campo de entrada
        });

        document.getElementById('playAgain').addEventListener('click', function() {
            if (confirm('Você gostaria de jogar novamente?')) {
                randomNumber = generateRandomNumber(maxNumber);
                attempts = 0;
                document.getElementById('feedback').textContent = '';
                document.getElementById('guess').value = '';
                document.getElementById('playAgain').style.display = 'none';
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    if (window.location.pathname.endsWith('score.html')) {
        updateScoreboard();
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function saveScore(playerName, attempts, difficulty) {
        scores.push({ player: playerName, score: attempts, difficulty: difficulty });
        localStorage.setItem('scores', JSON.stringify(scores));
        updateScoreboard();
    }

    function updateScoreboard() {
        const scoreList = document.getElementById('scoreList');
        if (scoreList) {
            scoreList.innerHTML = '';
            scores.sort((a, b) => a.score - b.score);
            scores.forEach((score, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}. ${score.player} (Dificuldade: ${score.difficulty}): ${score.score} tentativas`;
                scoreList.appendChild(listItem);
            });
        }
    }

    function giveFeedback(randomNumber, userGuess, direction) {
        let feedbackText = `Tente um número ${direction}.`;
        if (Math.abs(randomNumber - userGuess) === 1) {
            document.getElementById('feedback').style.color = 'red';
            feedbackText = `Muito perto! Tente um número ${direction}.`;
        } else if (Math.abs(randomNumber - userGuess) <= 10) {
            document.getElementById('feedback').style.color = 'orange';
            feedbackText = `Perto! Tente um número ${direction}.`;
        } else {
            document.getElementById('feedback').style.color = 'blue';
        }
        document.getElementById('feedback').textContent = feedbackText;
    }
});