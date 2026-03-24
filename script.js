// Global function to open envelope
function openEnvelope() {
    console.log('=== ENVELOPE OPENING STARTED ===');
    
    const envelopeOverlay = document.getElementById('envelope-overlay');
    console.log('1. envelopeOverlay found:', !!envelopeOverlay);
    
    const envelope = document.querySelector('.envelope');
    console.log('2. envelope found:', !!envelope);
    
    const mainContent = document.getElementById('main-content');
    console.log('3. mainContent found:', !!mainContent);
    
    const heroContent = document.querySelector('.hero-content');
    console.log('4. heroContent found:', !!heroContent);

    if (!envelope) {
        console.error('ERROR: Envelope not found!');
        return;
    }
    
    if (!envelopeOverlay) {
        console.error('ERROR: Envelope overlay not found!');
        return;
    }
    
    if (!mainContent) {
        console.error('ERROR: Main content not found!');
        return;
    }

    console.log('5. Adding open-anim class to envelope');
    envelope.classList.add('open-anim');
    console.log('6. Class added. Current classes:', envelope.className);
    
    console.log('7. Adding open class to overlay');
    envelopeOverlay.classList.add('open');
    console.log('8. Overlay class added');
    
    console.log('9. Removing hidden from mainContent');
    mainContent.classList.remove('hidden');
    console.log('10. Main content shown');
    
    // Animate the hero content
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transition = 'opacity 1.5s ease-in-out';
        }, 300);
    }
    
    // Play background music
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.play().catch(err => console.log('Music play error:', err));
    }
    
    console.log('=== ENVELOPE OPENING COMPLETE ===');
}

function createSparklesGlobal() {
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟'];
    const waxSeal = document.querySelector('.wax-seal');
    
    if (!waxSeal) return;
    
    const sealRect = waxSeal.getBoundingClientRect();
    const sealCenterX = sealRect.left + sealRect.width / 2;
    const sealCenterY = sealRect.top + sealRect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        sparkle.style.left = sealCenterX + 'px';
        sparkle.style.top = sealCenterY + 'px';
        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        sparkle.style.fontSize = (0.8 + Math.random() * 0.5) + 'rem';
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelopeClickArea = document.getElementById('envelope-click-area');
    const envelope = document.querySelector('.envelope');
    const bgMusic = document.getElementById('bg-music');
    const mainContent = document.getElementById('main-content');
    const heroContent = document.querySelector('.hero-content');

    // ===== COUNTDOWN LOGIC =====
    // Wedding: April 05, 2026 at 11:30 AM
    const weddingDate = new Date('April 05, 2026 11:30:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.querySelector('.countdown-container').innerHTML = "<h3 style='color: white; font-size: 2rem; font-family: var(--font-heading);'>We are married! 🎉</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation || 'animate-fade-in-up';
                    element.classList.add(animationType);
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    function addScrollAnimationClasses() {
        document.querySelectorAll('.time-box').forEach(el => {
            if (!el.classList.contains('scroll-animate')) {
                el.classList.add('scroll-animate');
                el.dataset.animation = 'animate-fade-in-up';
            }
        });

        document.querySelectorAll('.timeline-item').forEach(el => {
            if (!el.classList.contains('scroll-animate')) {
                el.classList.add('scroll-animate');
                el.dataset.animation = 'animate-fade-in-up';
            }
        });

        const locationCard = document.querySelector('.location-card');
        if (locationCard && !locationCard.classList.contains('scroll-animate')) {
            locationCard.classList.add('scroll-animate');
            locationCard.dataset.animation = 'animate-scale-in';
        }

        document.querySelectorAll('.section-title').forEach(el => {
            if (!el.classList.contains('scroll-animate')) {
                el.classList.add('scroll-animate');
                el.dataset.animation = 'animate-fade-in-down';
            }
        });

        document.querySelectorAll('.section-subtitle').forEach(el => {
            if (!el.classList.contains('scroll-animate')) {
                el.classList.add('scroll-animate');
                el.dataset.animation = 'animate-fade-in-up';
            }
        });

        document.querySelectorAll('.action-btn').forEach(el => {
            if (!el.classList.contains('scroll-animate')) {
                el.classList.add('scroll-animate');
                el.dataset.animation = 'animate-fade-in-up';
            }
        });

        const thankYouTitle = document.querySelector('.thank-you-title');
        if (thankYouTitle && !thankYouTitle.classList.contains('scroll-animate')) {
            thankYouTitle.classList.add('scroll-animate');
            thankYouTitle.dataset.animation = 'animate-fade-in-down';
        }

        const thankYouText = document.querySelector('.thank-you-text');
        if (thankYouText && !thankYouText.classList.contains('scroll-animate')) {
            thankYouText.classList.add('scroll-animate');
            thankYouText.dataset.animation = 'animate-fade-in-up';
        }

        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    }

    // ===== FLOATING HEARTS & DECORATIONS =====
    function createFloatingHearts() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝'];
        const sparkles = ['✨', '⭐', '🌟', '💫'];
        
        const heartInterval = setInterval(() => {
            const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = randomHeart;
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = (2 + Math.random() * 1.5) + 'rem';
            heart.style.animationDuration = (12 + Math.random() * 8) + 's';
            heart.style.animationDelay = '0s';
            document.body.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 21000);
        }, 2500);

        const sparkleInterval = setInterval(() => {
            const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
            const sparkle = document.createElement('div');
            sparkle.className = 'floating-sparkle';
            sparkle.textContent = randomSparkle;
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.bottom = '-50px';
            sparkle.style.fontSize = (1.2 + Math.random() * 1) + 'rem';
            sparkle.style.animationDuration = (15 + Math.random() * 10) + 's';
            document.body.appendChild(sparkle);
            setTimeout(() => { sparkle.remove(); }, 26000);
        }, 3500);
    }

    function addBackgroundDecorations() {
        const decorations = ['🌸', '🌹', '🌺', '🌷', '🌼'];
        const totalDecorations = 8;
        for (let i = 0; i < totalDecorations; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'floral-accent';
            decoration.textContent = decorations[Math.floor(Math.random() * decorations.length)];
            decoration.style.fontSize = (4 + Math.random() * 2) + 'rem';
            decoration.style.left = Math.random() * 100 + '%';
            decoration.style.top = Math.random() * 100 + '%';
            document.body.appendChild(decoration);
        }
    }

    setTimeout(() => { addScrollAnimationClasses(); }, 1500);
    createFloatingHearts();
    addBackgroundDecorations();

}); // END OF DOMContentLoaded

// ===== CONGRATULATIONS FUNCTIONS =====
function addCongrats() {
    const name = prompt('Enter your name:');
    if (name) {
        const message = prompt('Enter your congratulations message:');
        if (message) {
            const congratsList = document.getElementById('congrats-list');
            
            const noMessage = congratsList.querySelector('.no-congrats-message');
            if (noMessage) { noMessage.remove(); }
            
            const newItem = document.createElement('div');
            newItem.className = 'congrats-item';
            
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            
            newItem.innerHTML = `
                <div class="congrats-avatar">${initials}</div>
                <div class="congrats-text">
                    <p class="congrats-name">${name}</p>
                    <p class="congrats-message">${message}</p>
                </div>
                <button class="delete-congrats-btn" onclick="deleteCongrats(this)" title="Delete this congratulation">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            `;
            
            congratsList.appendChild(newItem);
            alert('Thank you for your congratulations! 🎉');
        }
    }
}

function deleteCongrats(button) {
    const congrat = button.parentElement;
    const name = congrat.querySelector('.congrats-name').textContent;
    
    if (confirm(`Delete congratulation from ${name}?`)) {
        congrat.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            congrat.remove();
            const congratsList = document.getElementById('congrats-list');
            if (congratsList.children.length === 0) {
                const noMessage = document.createElement('div');
                noMessage.className = 'no-congrats-message';
                noMessage.innerHTML = '<p>No congratulations yet. Be the first to congratulate! 🎉</p>';
                congratsList.appendChild(noMessage);
            }
        }, 300);
    }
}

// ===== ADD TO CALENDAR FUNCTION =====
function addToCalendar() {
    const eventTitle = 'Dyna & Sanosh Wedding';
    const eventDate = '20260405';
    const eventStartTime = '113000';
    const eventEndTime = '200000';
    const eventLocation = 'Seven Seas Hotel Dubai Airport, Dubai';
    const eventDescription = 'You are invited to celebrate the wedding of Dyna and Sanosh';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventDate}T${eventStartTime}/${eventDate}T${eventEndTime}&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(eventDescription)}`;

    window.open(googleCalendarUrl, '_blank');
}
