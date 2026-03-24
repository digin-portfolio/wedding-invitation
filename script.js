// ========================================
// GLOBAL: OPEN ENVELOPE
// ========================================
function openEnvelope() {
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelope = document.querySelector('.envelope');
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

        petal.innerHTML = `<div style="color:${petalColors[Math.floor(Math.random()*petalColors.length)]};font-size:20px;">🌸</div>`;

        petal.style.cssText = `
            position:fixed; left:${Math.random()*100}vw; top:-30px;
            animation:petalFall 10s linear forwards;`;

        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 10000);
    }, 500);
}

// ========================================
// DOM CONTENT LOADED
// ========================================
document.addEventListener('DOMContentLoaded', () => {

    // INIT
    updateMusicBtn(false);
    startPetals();

    // ========================================
    // RSVP FORM (TELEGRAM VERSION)
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

            // 🔴 PUT YOUR VALUES HERE
            const BOT_TOKEN = "YOUR_BOT_TOKEN";
            const CHAT_ID   = "YOUR_CHAT_ID";

            const message = `💍 Wedding RSVP

👤 Name: ${name}
${attend.value === 'yes' ? '✅ Attending' : '❌ Not Attending'}
👥 Guests: ${guests}
📝 Note: ${note || 'None'}`;

            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            })
            .then(() => {
                showRsvpSuccess(name, attend.value);
                showToast("RSVP sent successfully!");
                rsvpForm.reset();
            })
            .catch(() => {
                showToast("Error sending RSVP. Try again.");
            });
        });
    }

});

// ========================================
// TOAST
// ========================================
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.remove(); }, 3000);
}

// ========================================
// SUCCESS MESSAGE
// ========================================
function showRsvpSuccess(name, attend) {
    const msg = attend === 'yes'
        ? `🎉 Thank you ${name}! See you there!`
        : `💌 Thank you ${name}!`;

    const el = document.getElementById('rsvp-success');
    if (el) {
        el.textContent = msg;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 4000);
    }
}
