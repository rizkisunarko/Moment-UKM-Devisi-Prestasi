// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll row function
function scrollRow(button, direction) {
    const wrapper = button.parentElement;
    const posters = wrapper.querySelector('.row-posters');
    const scrollAmount = 600;
    posters.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

// Modal functionality
const modal = document.getElementById('modal');
const modalMedia = document.getElementById('modalMedia');
const downloadBtn = document.getElementById('downloadBtn');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const vid = item.querySelector('video');
        modalMedia.innerHTML = '';

        if (img) {
            const src = img.src;
            const el = document.createElement('img');
            el.src = src;
            modalMedia.appendChild(el);
            downloadBtn.href = src;
            modal.style.display = 'flex';
        } else if (vid) {
            const src = vid.getAttribute('src') || vid.src;
            const v = document.createElement('video');
            v.src = src;
            v.controls = true;
            v.autoplay = true;
            modalMedia.appendChild(v);
            downloadBtn.href = src;
            modal.style.display = 'flex';
        }
    });
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    const v = modalMedia.querySelector('video');
    if (v) v.pause();
    modal.style.display = 'none';
    modalMedia.innerHTML = '';
}

// Video hover play/pause
document.querySelectorAll('.item video').forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => video.pause());
});

// Music toggle
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        music.play().catch(() => { });
        musicBtn.textContent = '🔇';
        musicBtn.title = 'Matikan Musik';
    } else {
        music.pause();
        musicBtn.textContent = '🔊';
        musicBtn.title = 'Nyalakan Musik';
    }
    isPlaying = !isPlaying;
});

// Auto play music on first interaction
let musicStarted = false;
document.addEventListener('click', () => {
    if (!musicStarted && !isPlaying) {
        music.play().catch(() => { });
        musicBtn.textContent = '🔇';
        isPlaying = true;
        musicStarted = true;
    }
}, { once: true });