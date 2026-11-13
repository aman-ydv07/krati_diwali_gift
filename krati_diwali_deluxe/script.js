
// =====================================
// SCROLL PROGRESS BAR
// =====================================

const progress = document.getElementById("progress");

function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;

    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// =====================================
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// =====================================

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const siblings = [...entry.target.parentElement.children];

            entry.target.style.transitionDelay =
                `${Math.min(siblings.indexOf(entry.target) % 4, 3) * 90}ms`;

            entry.target.classList.add("visible");

            obs.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
});

document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});

// =====================================
// FALLING GOLD SPARKLES
// =====================================

const layer = document.getElementById("sparkles");

const symbols = ["✦", "✧", "·", "✺"];

function makeSparkles(count = 24) {
    for (let i = 0; i < count; i++) {
        const s = document.createElement("span");

        s.className = "spark";
        s.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        s.style.left = `${Math.random() * 100}%`;
        s.style.fontSize = `${9 + Math.random() * 15}px`;
        s.style.animationDuration = `${4 + Math.random() * 5}s`;
        s.style.animationDelay = `${Math.random() * 1.2}s`;

        layer.appendChild(s);

        setTimeout(() => s.remove(), 10500);
    }
}

document.getElementById("sparkleBtn").addEventListener("click", () => {
    makeSparkles(42);
});

makeSparkles(14);

// =====================================
// REVEAL CLOSING MESSAGE
// =====================================

document.getElementById("surpriseBtn").addEventListener("click", () => {
    document.getElementById("hidden").classList.toggle("show");
});

// =====================================
// GENTLE MOUSE TILT FOR COLLAGE PHOTOS
// DESKTOP ONLY
// =====================================

if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {

    document.querySelectorAll(".tile").forEach(tile => {

        tile.addEventListener("mousemove", e => {
            const r = tile.getBoundingClientRect();

            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;

            tile.style.transform =
                `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-5px)`;
        });

        tile.addEventListener("mouseleave", () => {
            tile.style.transform = "";
        });

    });

}

// =====================================
// DIWALI GIFT INTRO FUNCTIONALITY
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const giftIntro = document.getElementById("giftIntro");
    const envelope = document.getElementById("envelope");
    const openGiftBtn = document.getElementById("openGift");

    if (!giftIntro || !envelope || !openGiftBtn) return;

    // Prevent scrolling while the gift intro is visible

    document.body.style.overflow = "hidden";

    // Keep the underlying website out of keyboard navigation

    const pageElements = [...document.body.children].filter(
        element => element !== giftIntro && element.tagName !== "SCRIPT"
    );

    pageElements.forEach(element => {
        element.inert = true;
    });

    // Handle gift opening button

    openGiftBtn.addEventListener("click", function () {

        // Prevent multiple clicks

        if (openGiftBtn.disabled) return;

        openGiftBtn.disabled = true;
        openGiftBtn.textContent = "Opening your surprise...";

        // Start envelope opening animation

        envelope.classList.add("opening");

        // Reveal the existing website

        setTimeout(function () {

            giftIntro.classList.add("leaving");

            document.body.style.overflow = "";

            pageElements.forEach(element => {
                element.inert = false;
            });

            // Remove the intro after its fade-out

            setTimeout(function () {
                giftIntro.remove();
            }, 1000);

        }, 1200);

    });

});