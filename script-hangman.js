// Author: Hongjin Quan
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'javascript', 'python', 'thermodynamics', 'enyzme'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;
	// fetch word from the interface
	// then remove the space and new line
	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		finalMessageRevealWord.innerText = '';
		popup.style.display = 'flex';

		playable = false;
	}
}

// Update wrong guess on hangman
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'YOU LOST';
		finalMessageRevealWord.innerText = `THE WORD IS: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();


// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
