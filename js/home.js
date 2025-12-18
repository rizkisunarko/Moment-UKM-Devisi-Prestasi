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

// IntersectionObserver: add 'in-view' class to items and featured video for entrance animations
(function(){
    const obsOptions = { root: null, rootMargin: '0px', threshold: 0.18 };
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const target = entry.target;

            // If it's a row-posters container, reveal children with a stagger
            if (target.classList && target.classList.contains('row-posters')) {
                const items = target.querySelectorAll('.item');
                items.forEach((it, i) => {
                    // set a CSS variable for delay and add in-view
                    const delay = i * 80;
                    it.style.setProperty('--delay', `${delay}ms`);

                    // alternate slide direction for nicer visual rhythm
                    // use zoom animation variant for entrance
                    it.classList.add('zoom');

                    // reveal the item (the CSS transition-delay uses --delay)
                    it.classList.add('in-view');

                    // animate overlay and titles with a slightly larger offset
                    const overlay = it.querySelector('.item-overlay');
                    if (overlay) overlay.style.transitionDelay = `${delay + 160}ms`;
                    const title = it.querySelector('.item-title');
                    if (title) title.style.transitionDelay = `${delay + 200}ms`;
                    const desc = it.querySelector('.item-desc');
                    if (desc) desc.style.transitionDelay = `${delay + 220}ms`;
                });
                observer.unobserve(target);
                return;
            }

            // For individual elements (hero, headers, featured video), assign slide direction and add class
            if (target.classList && target.classList.contains('row-header')) {
                // alternate header sliding based on row position when possible
                const parent = target.parentElement;
                if (parent) {
                    // apply zoom for headers as well
                    target.classList.add('zoom');
                }
            }

            if (target.classList && target.classList.contains('hero-content')) {
                target.classList.add('zoom');
            }

            target.classList.add('in-view');
            observer.unobserve(target);
        });
    }, obsOptions);

    // Observe each row-posters container for stagger reveal
    document.querySelectorAll('.row-posters').forEach(el => io.observe(el));

    // Observe row headers and hero-content and featured video
    document.querySelectorAll('.row-header, .hero-content, .featured-video-inner').forEach(el => io.observe(el));
})();