const btnAdd = document.getElementById('btn-add');
const btnReset = document.getElementById('btn-reset');
const currentIntakeEl = document.getElementById('current-intake');
const waters = document.querySelectorAll('.water');

const DAILY_GOAL = 6000;
let currentIntake = 0;
let lastIntake = 0;

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function updateUI(animate = true) {
    if (animate) {
        animateValue(currentIntakeEl, lastIntake, currentIntake, 800);
    } else {
        currentIntakeEl.innerHTML = currentIntake;
    }
    lastIntake = currentIntake;

    let percentage = (currentIntake / DAILY_GOAL) * 100;
    if (percentage > 110) percentage = 110;

    // The water elements start at top: 100% when empty
    // 0 is full
    const topOffset = Math.max(100 - percentage, -10);

    waters.forEach((water, index) => {
        const offset = topOffset + (index * 2);
        water.style.top = `${offset}%`;
    });
}

function addWater(amount) {
    currentIntake += amount;
    // Add a tiny bump animation to the container for tactile feedback
    const blob = document.querySelector('.glass-blob');
    blob.style.transform = 'scale(1.05)';
    setTimeout(() => {
        blob.style.transform = 'scale(1)';
    }, 200);

    updateUI();
}

function resetWater() {
    currentIntake = 0;
    updateUI();
}

btnAdd.addEventListener('click', () => addWater(500));
btnReset.addEventListener('click', resetWater);

// Init UI with zero animation
updateUI(false);
