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
    const petalShapes = [
        'M10,2 C14,2 18,6 18,10 C18,16 10,22 10,22 C10,22 2,16 2,10 C2,6 6,2 10,2Z',
        'M10,1 C13,1 17,4 16,8 C15,12 10,20 10,20 C10,20 5,12 4,8 C3,4 7,1 10,1Z',
        'M10,3 Q16,2 17,8 Q18,14 10,20 Q2,14 3,8 Q4,2 10,3Z'
    ];

    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        const size     = 10 + Math.random() * 16;
        const color    = petalColors[Math.floor(Math.random() * petalColors.length)];
        const shape    = petalShapes[Math.floor(Math.random() * petalShapes.length)];
        const startX   = Math.random() * 110 - 5;
        const duration = 6 + Math.random() * 8;
        const delay    = Math.random() * 2;
        const sway     = 60 + Math.random() * 80;
        const rotStart = Math.random() * 360;
        const rotEnd   = rotStart + (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);

        petal.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 20 22">
            <path d="${shape}" fill="${color}" opacity="0.85"/>
        </svg>`;

        petal.style.cssText = `
            position:fixed; left:${startX}vw; top:-30px; z-index:3;
            pointer-events:none;
            animation:petalFall ${duration}s ${delay}s linear forwards;
            --sway:${sway}px;
            --rotate-start:${rotStart}deg;
            --rotate-end:${rotEnd}deg;`;

        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), (duration + delay + 1) * 1000);
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
        if (distance < 0) {
            const c = document.querySelector('.countdown-container');
            if (c) c.innerHTML = "<h3 style='color:white;font-size:2rem;font-family:var(--font-heading);'>We are married! 🎉</h3>";
            return;
        }
        const d = Math.floor(distance / 86400000);
        const h = Math.floor((distance % 86400000) / 3600000);
        const m = Math.floor((distance % 3600000) / 60000);
        const s = Math.floor((distance % 60000) / 1000);

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) { const v = String(val).padStart(2,'0'); if (el.innerText !== v) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); } el.innerText = v; }
        };
        set('days', d); set('hours', h); set('minutes', m); set('seconds', s);
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // SCROLL ANIMATIONS
    function initScrollAnimations() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add(e.target.dataset.animation || 'animate-fade-in-up');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.scroll-animate').forEach(el => obs.observe(el));
    }

    function addScrollAnimationClasses() {
        const pairs = [
            ['.time-box','animate-fade-in-up'],['.timeline-item','animate-fade-in-up'],
            ['.section-title','animate-fade-in-down'],['.section-subtitle','animate-fade-in-up'],
            ['.action-btn','animate-fade-in-up'],['.thank-you-title','animate-fade-in-down'],
            ['.thank-you-text','animate-fade-in-up'],['.rsvp-card','animate-scale-in'],
        ];
        pairs.forEach(([sel, anim]) => {
            document.querySelectorAll(sel).forEach(el => {
                if (!el.classList.contains('scroll-animate')) { el.classList.add('scroll-animate'); el.dataset.animation = anim; }
            });
        });
        const lc = document.querySelector('.location-card');
        if (lc && !lc.classList.contains('scroll-animate')) { lc.classList.add('scroll-animate'); lc.dataset.animation = 'animate-scale-in'; }
        setTimeout(initScrollAnimations, 100);
    }
    setTimeout(addScrollAnimationClasses, 1500);

    // FLOATING HEARTS
    const hearts   = ['❤️','💕','💖','💗','💝'];
    const sparkles = ['✨','⭐','🌟','💫'];
    setInterval(() => {
        const h = document.createElement('div');
        h.className = 'floating-heart';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.cssText = `left:${Math.random()*100}%;bottom:-50px;font-size:${2+Math.random()*1.5}rem;animation-duration:${12+Math.random()*8}s;`;
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 21000);
    }, 2500);
    setInterval(() => {
        const s = document.createElement('div');
        s.className = 'floating-sparkle';
        s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        s.style.cssText = `left:${Math.random()*100}%;bottom:-50px;font-size:${1.2+Math.random()}rem;animation-duration:${15+Math.random()*10}s;`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 26000);
    }, 3500);

    // BACKGROUND FLOWERS
    ['🌸','🌹','🌺','🌷','🌼','🌸','🌹','🌺'].forEach(d => {
        const el = document.createElement('div');
        el.className = 'floral-accent';
        el.textContent = d;
        el.style.cssText = `font-size:${4+Math.random()*2}rem;left:${Math.random()*100}%;top:${Math.random()*100}%;`;
        document.body.appendChild(el);
    });

    // INIT FEATURES
    loadWishes();
    updateMusicBtn(false);
    startPetals();

    // RSVP FORM SUBMIT
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name   = document.getElementById('rsvp-name').value.trim();
            const guests = document.getElementById('rsvp-guests').value;
            const attend = document.querySelector('input[name="attend"]:checked');
            const note   = document.getElementById('rsvp-note').value.trim();
            if (!name || !attend) { showToast('Please fill in your name and attendance. 💌'); return; }

            const rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
            rsvps.push({ name, guests, attend: attend.value, note, date: new Date().toLocaleDateString() });
            localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
            showRsvpSuccess(name, attend.value);
            rsvpForm.reset();
        });
    }

}); // END DOMContentLoaded

// ========================================
// WISHES WALL — persists with localStorage
// ========================================
function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    const list   = document.getElementById('congrats-list');
    if (!list) return;
    if (wishes.length === 0) {
        list.innerHTML = '<div class="no-congrats-message"><p>No wishes yet. Be the first to wish Dyna & Sanosh! 🎉</p></div>';
        return;
    }
    list.innerHTML = '';
    wishes.forEach((w, i) => list.appendChild(createWishItem(w, i)));
}

function createWishItem(w, index) {
    const item = document.createElement('div');
    item.className = 'congrats-item';
    const initials = w.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
    item.innerHTML = `
        <div class="congrats-avatar">${initials}</div>
        <div class="congrats-text">
            <p class="congrats-name">${escapeHtml(w.name)} <span class="wish-date">${w.date || ''}</span></p>
            <p class="congrats-message">${escapeHtml(w.message)}</p>
        </div>
        <button class="delete-congrats-btn" onclick="deleteWish(${index})" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
        </button>`;
    return item;
}

function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function addCongrats() {
    const name = prompt('Your name:');
    if (!name || !name.trim()) return;
    const message = prompt('Your wish for Dyna & Sanosh:');
    if (!message || !message.trim()) return;

    const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    wishes.push({ name: name.trim(), message: message.trim(), date: new Date().toLocaleDateString() });
    localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
    loadWishes();
    showToast('Your wish has been saved forever! 💕');
}

function deleteWish(index) {
    if (!confirm('Delete this wish?')) return;
    const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    wishes.splice(index, 1);
    localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
    loadWishes();
}

// ========================================
// TOAST NOTIFICATION
// ========================================
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3500);
}

// ========================================
// RSVP SUCCESS MESSAGE
// ========================================
function showRsvpSuccess(name, attend) {
    const msg = attend === 'yes'
        ? `🎉 Thank you ${name}! We can't wait to celebrate with you!`
        : `💌 Thank you ${name} for letting us know. You'll be missed!`;
    const el = document.getElementById('rsvp-success');
    if (el) { el.textContent = msg; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 5000); }
    showToast(msg);
}

// ========================================
// ADD TO CALENDAR
// ========================================
function addToCalendar() {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Dyna & Sanosh Wedding')}&dates=20260405T113000/20260405T200000&location=${encodeURIComponent('Seven Seas Hotel Dubai Airport, Dubai')}&details=${encodeURIComponent('You are invited to celebrate the wedding of Dyna and Sanosh')}`;
    window.open(url, '_blank');
}
