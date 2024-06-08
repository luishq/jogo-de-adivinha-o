document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    if (currentPage.includes('index.html')) {
        const welcomeForm = document.getElementById('welcomeForm');
        welcomeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            if (name) {
                localStorage.setItem('userName', name);
                localStorage.setItem('targetNumber', Math.floor(Math.random() * 100) + 1);
                localStorage.setItem('attempts', 0);
                window.location.href = 'game.html';
            }
        });
    } else if (currentPage.includes('game.html')) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        const userName = localStorage.getItem('userName');
        welcomeMessage.textContent = `Olá, ${userName}!`;

        const guessButton = document.getElementById('guessButton');
        const guessInput = document.getElementById('guessInput');
        const feedback = document.getElementById('feedback');

        guessButton.addEventListener('click', () => {
            const guess = parseInt(guessInput.value);
            const targetNumber = parseInt(localStorage.getItem('targetNumber'));
            let attempts = parseInt(localStorage.getItem('attempts')) + 1;
            localStorage.setItem('attempts', attempts);

            if (isNaN(guess) || guess < 1 || guess > 100) {
                feedback.textContent = 'Por favor, insira um número entre 1 e 100.';
                return;
            }

            if (guess === targetNumber) {
                window.location.href = 'result.html';
            } else if (guess < targetNumber) {
                feedback.textContent = 'O número é maior. Tente novamente.';
            } else {
                feedback.textContent = 'O número é menor. Tente novamente.';
            }
        });
    } else if (currentPage.includes('result.html')) {
        const resultMessage = document.getElementById('resultMessage');
        const correctNumber = document.getElementById('correctNumber');
        const score = document.getElementById('score');
        const playAgainButton = document.getElementById('playAgainButton');

        const userName = localStorage.getItem('userName');
        const targetNumber = localStorage.getItem('targetNumber');
        const attempts = localStorage.getItem('attempts');

        resultMessage.textContent = `Parabéns, ${userName}!`;
        correctNumber.textContent = `Você acertou o número ${targetNumber}.`;
        score.textContent = `Você fez ${attempts} tentativas.`;

        playAgainButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
