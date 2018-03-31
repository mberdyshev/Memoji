'use strict';

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
};

(function () {
    function makeSpans(str) {
        return Array.from(str)
            .map(sym => `<span>${sym}</span>`)
            .join('');
    }

    function time(seconds) {
        if (seconds < 10) return '00:0' + seconds;
        return '00:' + seconds;
    }

    function startTimer() {
        let seconds = 60;
        timerID = setInterval(function () {
            timer.textContent = time(--seconds);
            if (seconds === 0)
                endGame(false);
        }, 1000);
    }

    function newGame() {
        cells.shuffle();
        for (let i = 0; i < cells.length; ++i) {
            cells[i].className = 'cell';
            cells[i].getElementsByClassName('back')[0].textContent = EMOJIS[Math.floor(i / 2)];
        }
        timer.textContent = '01:00';
        dialog.close();
        isGameStarted = false;
        pairs = 0;
    }

    function endGame(isWin) {
        clearInterval(timerID);
        dialog.getElementsByClassName('result')[0].innerHTML = makeSpans(isWin ? 'Win' : 'Lose');
        dialog.getElementsByTagName('button')[0].textContent = (isWin ? 'Play' : 'Try') + ' again';
        dialog.showModal();
    }

    function handleClick(event) {
        const parent = event.target.parentNode;
        if (event.target.tagName !== 'DIV' || parent.tagName !== 'DIV' || !parent.classList.contains('cell') ||
            parent.classList.length === 3)  // cell flipped + success or fail
            return;
        if (!isGameStarted) {
            isGameStarted = true;
            startTimer();
        }
        const flippedCells = cells.filter(cell => cell.classList.contains('flipped') && !cell.classList.contains('success'));
        if (flippedCells.length === 1 && flippedCells[0] !== parent) {
            const isContentSame = flippedCells[0].textContent === parent.textContent;
            [parent, flippedCells[0]].forEach(cell => cell.classList.add(isContentSame ? 'success' : 'fail'));
            if (isContentSame && ++pairs === 6)
                endGame(true);
        } else if (flippedCells.length === 2)
            flippedCells.forEach(cell => cell.classList.remove('fail', 'flipped'));
        parent.classList.toggle('flipped');
    }

    const EMOJIS = ['🦄', '🐞', '🐼', '🐨', '🐟', '🐙'];
    const cells = Array.from(document.getElementsByClassName('cell'));
    const timer = document.getElementsByClassName('timer')[0];
    const dialog = document.getElementsByTagName('dialog')[0];
    let isGameStarted;
    let timerID;
    let pairs;
    newGame();

    document.getElementsByClassName('cells')[0].addEventListener('click', handleClick);
    dialog.getElementsByTagName('button')[0].addEventListener('click', newGame);
})();