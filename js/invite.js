// Audio elements
const bgMusic = document.getElementById('bgMusic');
const envelopeSound = document.getElementById('envelopeSound');
const bubblePopSound = document.getElementById('bubblePopSound');
const successSound = document.getElementById('successSound');

// Set volume
bgMusic.volume = 0.3;
envelopeSound.volume = 0.5;
bubblePopSound.volume = 0.6;
successSound.volume = 0.5;

// Try to play background music on page load
function tryAutoplayMusic() {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Autoplay blocked, play on first user interaction
            const playOnInteraction = () => {
                bgMusic.play().catch(() => { });
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction, { once: true });
            document.addEventListener('touchstart', playOnInteraction, { once: true });
        });
    }
}

// Play sound helper
function playSound(audio) {
    audio.currentTime = 0;
    audio.play().catch(() => { });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    tryAutoplayMusic();
});

// Create particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = (Math.random() * 5 + 2) + 'px';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
}

const envelope = document.getElementById("openEnvelope");
const bubbles = document.querySelectorAll(".bubble");

// Confetti effect
function createConfetti(x, y) {
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#fa709a', '#fee140'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        confetti.style.setProperty('--tx', Math.cos(angle) * velocity * 50 + 'px');

        document.body.appendChild(confetti);

        setTimeout(() => confetti.classList.add('active'), 10);
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Envelope click
envelope.addEventListener("click", (e) => {
    playSound(envelopeSound); // Play envelope opening sound
    envelope.classList.add("open");
    createConfetti(e.pageX, e.pageY);

    setTimeout(() => {
        playSound(successSound); // Play success sound
        const modalEl = document.getElementById('inviteModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }, 800);
});

// Bubble click
bubbles.forEach(bubble => {
    bubble.addEventListener("click", (e) => {
        e.stopPropagation();
        playSound(bubblePopSound); // Play bubble pop sound
        createConfetti(e.pageX, e.pageY);
        bubble.style.transform = "scale(1.8)";
        bubble.style.opacity = "0";
        setTimeout(() => {
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = "home.html";
            }, 500);
        }, 500);
    });
});

// Modal enter button
const enterBtn = document.getElementById('enterFromModal');
enterBtn.addEventListener('click', () => {
    playSound(successSound); // Play success sound
    const modalEl = document.getElementById('inviteModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "home.html";
        }, 800);
    }, 300);
});