document.addEventListener('DOMContentLoaded', function() {
  const keysContainer = document.getElementById('keys');
  const prompt = document.getElementById('prompt');
  const timerDisplay = document.getElementById('timer');
  const correctDisplay = document.getElementById('score');
  const incorrectDisplay = document.getElementById('wrong');
  const startBtn = document.getElementById('startBtn');
  const winningGifContainer = document.getElementById('winningGifContainer');
  const layoutWarning = document.getElementById('layoutWarning');
  const selectEnglishBtn = document.getElementById('selectEnglish');
  const selectRussianBtn = document.getElementById('selectRussian');

  let correctCount = 0;
  let incorrectCount = 0;
  let activeKey = '';
  let countdown;
  let gameStarted = false;
  const maxCorrectKeys = 20;
  let currentLanguage = 'english';

  const englishKeyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const russianKeyRows = [
    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
    ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю']
  ];

  function generateKeys(language) {
    keysContainer.innerHTML = ''; // Clear previous keys
    const keyRows = language === 'english' ? englishKeyRows : russianKeyRows;
    keyRows.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'key-row';
      row.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.textContent = key;
        keyElement.classList.add('key');
        keyElement.id = key;
        rowDiv.appendChild(keyElement);
      });
      keysContainer.appendChild(rowDiv);
    });
  }

  function setActiveKey() {
    const keyRows = currentLanguage === 'english' ? englishKeyRows : russianKeyRows;
    const flatKeys = [].concat(...keyRows);
    const randomIndex = Math.floor(Math.random() * flatKeys.length);
    activeKey = flatKeys[randomIndex];
    prompt.textContent = `Нажмите на клавишу: ${activeKey}`;
    highlightKey(activeKey);
    resetTimer();
  }

  function highlightKey(key) {
    document.querySelectorAll('.key').forEach(keyElement => {
      keyElement.classList.remove('active', 'wrong');
    });
    const keyElement = document.getElementById(key);
    if (keyElement) {
      keyElement.classList.add('active');
    }
  }

  function updateScore(isCorrect, pressedKey) {
    if (isCorrect) {
      correctCount++;
      correctDisplay.textContent = `Правильно: ${correctCount}`;

      if (correctCount >= maxCorrectKeys) {
        endGame();
        return; // Выход из функции, чтобы предотвратить дальнейшие действия
      }
    } else {
      incorrectCount++;
      incorrectDisplay.textContent = `Неправильно: ${incorrectCount}`;

      const keyElement = document.getElementById(pressedKey);
      if (keyElement) {
        keyElement.classList.add('wrong');
        setTimeout(() => { keyElement.classList.remove('wrong'); }, 300);
      }
    }
  }

  function resetTimer() {
    clearInterval(countdown);
    let timeLeft = 15;
    timerDisplay.textContent = `Таймер: ${timeLeft} сек`;

    countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Таймер: ${timeLeft} сек`;
      if (timeLeft <= 0) {
        clearInterval(countdown);
        updateScore(false, activeKey);
        setActiveKey();
      }
    }, 1000);
  }

  function endGame() {
    gameStarted = false;
    clearInterval(countdown);
    winningGifContainer.classList.remove('hidden');
    setTimeout(() => {
      winningGifContainer.classList.add('hidden');
    }, 2000);
    startBtn.disabled = false;
    document.querySelectorAll('.key').forEach(keyElement => keyElement.classList.add('disabled'));
  }

  document.addEventListener('keydown', (event) => {
    if (!gameStarted) return;

    const pressedKey = event.key.toUpperCase();
    const validKeys = currentLanguage === 'english' ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ";

    if (!validKeys.includes(pressedKey)) {
      layoutWarning.style.display = 'block';
      setTimeout(() => {
        layoutWarning.style.display = 'none';
      }, 2000);
      return;
    }

    const isCorrect = pressedKey === activeKey;
    updateScore(isCorrect, pressedKey);
  
    if (isCorrect) {
      setActiveKey();
    }
  });

  startBtn.addEventListener('click', () => {
    gameStarted = true;
    correctCount = 0;
    incorrectCount = 0;
    correctDisplay.textContent = 'Правильно: 0';
    incorrectDisplay.textContent = 'Неправильно: 0';
    timerDisplay.textContent = 'Таймер: 15 сек';
    startBtn.disabled = true;
    document.querySelectorAll('.key').forEach(keyElement => keyElement.classList.remove('disabled'));
    setActiveKey();
  });

  selectEnglishBtn.addEventListener('click', () => {
    currentLanguage = 'english';
    generateKeys(currentLanguage);
    resetGame();
  });

  selectRussianBtn.addEventListener('click', () => {
    currentLanguage = 'russian';
    generateKeys(currentLanguage);
    resetGame();
  });

  function resetGame() {
    gameStarted = false;
    clearInterval(countdown);
    correctCount = 0;
    incorrectCount = 0;
    correctDisplay.textContent = 'Правильно: 0';
    incorrectDisplay.textContent = 'Неправильно: 0';
    timerDisplay.textContent = 'Таймер: 15 сек';
    startBtn.disabled = false;
    document.querySelectorAll('.key').forEach(keyElement => keyElement.classList.add('disabled'));
    winningGifContainer.classList.add('hidden'); // Ensure the modal is hidden at the start
  }

  generateKeys(currentLanguage); // Generate the keys when the page loads
  winningGifContainer.classList.add('hidden'); // Ensure the modal is hidden at the start
});
