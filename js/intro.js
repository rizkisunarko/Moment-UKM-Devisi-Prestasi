document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("bgVideo");
    const source = video.querySelector("source");

    // Pilih video berdasarkan lebar layar
    if (window.innerWidth <= 768) {
        source.src = "assets/videos/hp.mp4";
    } else {
        source.src = "assets/videos/intro.mp4";
    }

    // Load & play video (aman untuk HP)
    video.load();
    video.play().catch(() => {
        // fallback kalau autoplay diblokir
        console.log("Autoplay diblokir, tunggu interaksi user");
    });

    // Tombol masuk
    document.getElementById("enterBtn").addEventListener("click", () => {
        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = "invite.html";
        }, 1000);
    });
});
