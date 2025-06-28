    const display = document.getElementById('display');
    const history = document.getElementById('history');
    let currentInput = '';
    let lastResult = '';

    function updateDisplay() {
    display.value = currentInput || '0';
    }

    function updateHistory(val) {
    history.textContent = val;
    }

    document.querySelectorAll('.number, .decimal').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        if (val === '.') {
        const parts = currentInput.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes('.')) return;
        }
        currentInput += val;
        updateDisplay();
    });
    });

    document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.value;

        if (val === '=') {
        try {
            const result = eval(currentInput);
            updateHistory(currentInput + ' =');
            currentInput = result.toString();
            updateDisplay();
        } catch {
            currentInput = '';
            updateDisplay();
        }
        } else if (val === '%') {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        }
        } else {
        if (currentInput === '' && val !== '-') return;
        if (/[+\-*/]$/.test(currentInput)) return;
        currentInput += val;
        updateDisplay();
        }
    });
    });

    document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    updateDisplay();
    updateHistory('');
    });

    document.getElementById('backspace').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
    });

    updateDisplay();
