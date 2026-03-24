// ========================================
// GLOBAL: OPEN ENVELOPE
// ========================================
function openEnvelope() {
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelope = document.getElementById('envelope-main');
    const mainContent = document.getElementById('main-content');
    const heroContent = document.querySelector('.hero-content');

    if (!envelope || !envelopeOverlay || !mainContent) return;

    envelope.classList.add('open-anim');
    envelopeOverlay.classList.add('open');
    mainContent.classList.remove('hidden');

    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transition = 'opacity 1.5s ease-in-out';
        }, 300);
    }

    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.play().catch(err => console.log('Music play error:', err));
        updateMusicBtn(true);
    }
}

// 👇 ADD HERE
function loadWishes() {
    const list = document.getElementById("congrats-list");
    if (!list) return;

    const wishes = JSON.parse(localStorage.getItem("wedding_wishes") || "[]");

    if (wishes.length === 0) {
        list.innerHTML = `
            <div class="no-congrats-message">
                No wishes yet. Be the first to wish Dyna & Sanosh! 🎉
            </div>`;
        return;
    }

    list.innerHTML = wishes.map((w, index) => `
        <div class="congrats-item">
            
            <div class="congrats-avatar">
                ${w.name.charAt(0).toUpperCase()}
            </div>

            <div class="congrats-text">
                <p class="congrats-name">${w.name}</p>
                <p class="congrats-message">${w.message}</p>
            </div>

            <button class="delete-congrats-btn" onclick="deleteWish(${index})">
                ❌
            </button>

        </div>
    `).join("");
}
// ========================================
// MUSIC PLAYER
// ========================================
function updateMusicBtn(isPlaying) {
    const btn = document.getElementById('music-toggle-btn');
    if (!btn) return;
    if (isPlaying) {
        btn.classList.add('playing');
        btn.innerHTML = `
            <div class="music-bars">
                <span></span><span></span><span></span><span></span>
            </div>
            <span class="music-label">Playing</span>`;
    } else {
        btn.classList.remove('playing');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <span class="music-label">Music</span>`;
    }
}

function toggleMusic() {
    const bgMusic = document.getElementById('bg-music');
    if (!bgMusic) return;
    if (bgMusic.paused) {
        bgMusic.play();
        updateMusicBtn(true);
    } else {
        bgMusic.pause();
        updateMusicBtn(false);
    }
}

// ========================================
// ROSE PETAL ANIMATION
// ========================================
function startPetals() {
    const petalColors = ['#f8b4c8','#f4a0b8','#e8829a','#f9c8d4','#fde8ee','#f06090','#ffadc5'];

    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'rose-petal';

        const size = 10 + Math.random() * 16;
        const color = petalColors[Math.floor(Math.random() * petalColors.length)];

        // RANDOM VALUES (IMPORTANT)
        const sway = 60 + Math.random() * 80;
        const rotStart = Math.random() * 360;
        const rotEnd = rotStart + (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);

        petal.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 20 22">
                <path d="M10,2 C14,2 18,6 18,10 C18,16 10,22 10,22 C10,22 2,16 2,10 C2,6 6,2 10,2Z"
                fill="${color}" opacity="0.85"/>
            </svg>
        `;

        petal.style.cssText = `
            left:${Math.random() * 100}vw;
            animation:petalFall ${6 + Math.random() * 6}s linear forwards;
            --sway:${sway}px;
            --rotate-start:${rotStart}deg;
            --rotate-end:${rotEnd}deg;
        `;

        document.body.appendChild(petal);

        setTimeout(() => petal.remove(), 10000);
    }, 350);
}

// ========================================
// DOM CONTENT LOADED
// ========================================
document.addEventListener('DOMContentLoaded', () => {

    // COUNTDOWN
    const weddingDate = new Date('April 05, 2026 11:30:00').getTime();

    const updateCountdown = () => {
        const distance = weddingDate - new Date().getTime();
        if (distance < 0) return;

        const d = Math.floor(distance / 86400000);
        const h = Math.floor((distance % 86400000) / 3600000);
        const m = Math.floor((distance % 3600000) / 60000);
        const s = Math.floor((distance % 60000) / 1000);

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h;
        document.getElementById('minutes').innerText = m;
        document.getElementById('seconds').innerText = s;
    };

    setInterval(updateCountdown, 1000);

    // INIT
    loadWishes();
    updateMusicBtn(false);
    startPetals();

    // ========================================
    // RSVP FORM (TELEGRAM FIX)
    // ========================================
    const rsvpForm = document.getElementById('rsvp-form');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name   = document.getElementById('rsvp-name').value.trim();
            const guests = document.getElementById('rsvp-guests').value;
            const attend = document.querySelector('input[name="attend"]:checked');
            const note   = document.getElementById('rsvp-note').value.trim();

            if (!name || !attend) {
                showToast('Please fill in your name and attendance.');
                return;
            }
            const message = `💍 Wedding RSVP

👤 Name: ${name}
${attend.value === 'yes' ? '✅ Attending' : '❌ Not Attending'}
👥 Guests: ${guests}
📝 Note: ${note || 'None'}`;

            fetch("https://wedding-invitation-mu-flame.vercel.app/api/send", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        guests,
        attend: attend.value,
        note
    })
})
.then(res => res.json())
.then(data => {
    if (data.success) {
        showRsvpSuccess(name, attend.value);
        rsvpForm.reset();
    } else {
        showToast("Error sending RSVP");
    }
})
.catch(() => {
    showToast("Network error");
});
        });
    }

});

// ========================================
// WISHES WALL
// ========================================
function addCongrats() {
    const name = prompt("Your name:");
    const message = prompt("Your wish:");

    if (!name || !message) return;

    // ✅ SAVE LOCALLY (for display)
    const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');

    wishes.push({
        name,
        message
    });

    localStorage.setItem('wedding_wishes', JSON.stringify(wishes));

    loadWishes(); // 👈 THIS IS IMPORTANT

    // ✅ SEND TO TELEGRAM (your backend)
    fetch("https://wedding-invitation-mu-flame.vercel.app/api/wish", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, message })
    })
    .then(() => {
        alert("Wish sent 💖");
    })
    .catch(() => {
        alert("Error sending wish");
    });
}
// ========================================
// TOAST
// ========================================
function showToast(msg) {
    alert(msg);
}

// ========================================
// SUCCESS MESSAGE
// ========================================
function showRsvpSuccess(name, attend) {
    alert(`Thanks ${name}!`);
}

function deleteWish(index) {
    if (!confirm("Delete this wish?")) return;

    const wishes = JSON.parse(localStorage.getItem("wedding_wishes") || "[]");

    wishes.splice(index, 1);

    localStorage.setItem("wedding_wishes", JSON.stringify(wishes));

    loadWishes();
}
