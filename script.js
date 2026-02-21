// --- 1. Hero Image Slider ---
const heroData = [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200'
];

let heroIdx = 0;
const heroEl = document.getElementById('hero-slider');

function nextHero() {
    heroIdx = (heroIdx + 1) % heroData.length;
    // Smooth transition between images
    heroEl.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${heroData[heroIdx]}')`;
}
setInterval(nextHero, 5000);

// --- 2. Gallery Slider + Glow Animation ---
const wrapper = document.getElementById('auto-slider');
const cards = document.querySelectorAll('.pg-card');
let cardIdx = 0;

function moveSlider() {
    // Remove active class
    cards.forEach(c => c.classList.remove('active'));
    
    // Calculate movement
    const cardWidth = cards[0].offsetWidth + 30; // width + margin
    const moveX = -(cardIdx * cardWidth);

    // GSAP Slide Effect
    gsap.to(wrapper, {
        x: moveX,
        duration: 1,
        ease: "expo.out"
    });

    // Set Active Card & Glow
    cards[cardIdx].classList.add('active');
    
    // Staggered glow for text on active card
    gsap.fromTo(cards[cardIdx].querySelector('.pg-info'), 
        { opacity: 0.8 }, 
        { opacity: 1, duration: 0.5 }
    );

    cardIdx = (cardIdx + 1) % cards.length;
}

// Start Gallery after small delay
setTimeout(() => {
    setInterval(moveSlider, 3500);
    moveSlider();
}, 1000);

// --- 3. Premium Site Entrance ---
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.from(".navbar", { y: -50, opacity: 0, duration: 1 })
      .from(".hero-content h1", { scale: 0.9, opacity: 0, duration: 1 }, "-=0.5")
      .from(".hero-content p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");
});

gsap.from(".whatsapp-sticky", {
    duration: 1,
    y: 100,
    opacity: 0,
    delay: 2, // Site khulne ke 2 sec baad aayega
    ease: "back.out(1.7)"
});
// WhatsApp Slide-in Animation (2 second baad)
window.addEventListener('load', () => {
    gsap.to(".whatsapp-sticky", {
        right: 0,           /* Screen ke kone ko touch karega */
        opacity: 1,         /* Dikhne lagega */
        duration: 1.2,      /* Slide hone ki speed */
        delay: 2,           /* 2 second ka wait */
        ease: "power2.out"  /* Smooth entry */
    });
});
window.addEventListener('load', () => {
    // 2 second baad button right side se slide hoke aayega
    gsap.to(".whatsapp-sticky", {
        right: 0,
        opacity: 1,
        duration: 1.2,
        delay: 2,
        ease: "power3.out"
    });
});

window.addEventListener('load', () => {
    // Shuruat mein niche hidden rahega
    gsap.set(".sticky-cta-bar", { y: 100 });
    
    // 2.5 second baad slide-up hokar aayega
    gsap.to(".sticky-cta-bar", {
        y: 0,
        duration: 1,
        delay: 2.5,
        ease: "power3.out"
    });
});

let chatStep = 0;

function openAnviChat() {
    document.getElementById('anvi-bubble').style.display = 'none';
    const chatBox = document.getElementById('anvi-chat-box');
    chatBox.style.display = 'flex';
    
    // Automatic First Message
    if(chatStep === 0) {
        setTimeout(() => {
            botSay("May I know your name?");
        }, 600);
    }
}

function closeAnviChat() {
    document.getElementById('anvi-chat-box').style.display = 'none';
    document.getElementById('anvi-bubble').style.display = 'flex';
}

function checkAnviEnter(e) { if(e.key === 'Enter') sendAnviMsg(); }

function sendAnviMsg() {
    const inputEl = document.getElementById('anvi-user-msg');
    const val = inputEl.value.trim();
    if(!val) return;

    userSay(val);
    inputEl.value = '';
    
    setTimeout(() => { botLogic(val); }, 1000);
}

function userSay(text) {
    const main = document.getElementById('anvi-chat-content');
    main.innerHTML += `<div class="anvi-user-msg">${text}</div>`;
    main.scrollTop = main.scrollHeight;
}

function botSay(text) {
    const main = document.getElementById('anvi-chat-content');
    main.innerHTML += `<div class="anvi-bot-msg">${text}</div>`;
    main.scrollTop = main.scrollHeight;
}

function botLogic(input) {
    chatStep++;
    if(chatStep === 1) {
        botSay(`Nice name ${input}! Where are you looking for PG?`);
    } else if(chatStep === 2) {
        botSay("We provide PG in Gurugram Sector 20, 21, Shankar Chawk, Hanuman Chawk, Cybercity near Palam Vihar.");
        setTimeout(() => botSay("Aap visit kab kroge?"), 1000);
    } else if(chatStep === 3) {
        botSay("Okay! main help krta hu aapki. Aap is number (981XXXXXXX) par apni location bhejo, nearest PG ki location aa jayegi.");
        setTimeout(() => {
            botSay("Location lekar visit kr lo! 😊");
            document.getElementById('anvi-input-container').style.display = 'none';
        }, 1200);
    }
}

function openLeadForm() {
    const modal = document.getElementById('enquiry-modal');
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('enquiry-modal').style.display = 'none';
}

// 5 Second Wait
window.addEventListener('load', () => {
    setTimeout(openLeadForm, 5000); 
});

// Cards reveal animation
gsap.from(".amenity-card", {
    scrollTrigger: {
        trigger: ".amenities-grid",
        start: "top 80%", // Jab section dikhna shuru ho
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2, // Ek ke baad ek aayenge
    ease: "power2.out"
});

window.addEventListener('scroll', () => {
    const sectionHeader = document.querySelector('.premium-header');
    const cards = document.querySelectorAll('.amenity-glass-card');
    
    // Trigger thoda pehle set kiya hai (90% pe) taaki jaldi dikhe
    const triggerPoint = window.innerHeight * 0.9;

    // 1. Header Pop-up
    if(sectionHeader.getBoundingClientRect().top < triggerPoint) {
        sectionHeader.classList.add('pop-active');
    }

    // 2. Fast Staggered Cards
    cards.forEach((card, idx) => {
        const cardTop = card.getBoundingClientRect().top;

        if(cardTop < triggerPoint) {
            // Delay ko 200ms se ghata kar 80ms kar diya (Very Fast)
            setTimeout(() => {
                card.classList.add('glow-active');
                
                // Continuous glow effect loop
                card.style.animation = `autoGlow 2.5s infinite ${idx * 0.3}s`;
            }, idx * 80); 
        }
    });
});
window.addEventListener('scroll', () => {
    const header = document.querySelector('.premium-header');
    const cards = document.querySelectorAll('.amenity-glass-card');
    const trigger = window.innerHeight * 0.95; // Pehle hi trigger ho jayega

    if(header.getBoundingClientRect().top < trigger) {
        header.classList.add('pop-active');
    }

    cards.forEach((card, i) => {
        if(card.getBoundingClientRect().top < trigger) {
            setTimeout(() => {
                card.classList.add('glow-active');
                card.style.animation = `autoGlow 2s infinite ${i * 0.2}s`;
            }, i * 60); // 60ms is super fast
        }
    });
});

window.addEventListener('scroll', () => {
    const whyHeader = document.querySelector('.why-pop');
    const whyCards = document.querySelectorAll('.why-card');
    const trigger = window.innerHeight * 0.85;

    if(whyHeader.getBoundingClientRect().top < trigger) {
        whyHeader.classList.add('active');
    }

    whyCards.forEach((card, i) => {
        if(card.getBoundingClientRect().top < trigger) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 100);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('.why-header-pop');
    const cards = document.querySelectorAll('.why-item-card');

    const triggerPoint = window.innerHeight * 0.9;

    window.addEventListener('scroll', () => {
        // Title Pop
        if (header.getBoundingClientRect().top < triggerPoint) {
            header.classList.add('active');
        }

        // Sequential Cards Pop
        cards.forEach((card, index) => {
            if (card.getBoundingClientRect().top < triggerPoint) {
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, index * 80); // 80ms delay (Very fast)
            }
        });
    });
});


const roomOptions = {
    private: [
        { type: "Luxury Fully Furnished", price: "₹18,500", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600", map: "https://maps.google.com" },
        { type: "Luxury Semi Furnished", price: "₹15,000", img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600", map: "https://maps.google.com" },
        { type: "Old Semi Furnished", price: "₹11,500", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600", map: "https://maps.google.com" }
    ],
    double: [
        { type: "Luxury Fully Furnished", price: "₹10,500", img: "https://images.unsplash.com/photo-1555854817-5b2247a8175f?w=600", map: "https://maps.google.com" },
        { type: "Luxury Semi Furnished", price: "₹9,000", img: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=600", map: "https://maps.google.com" },
        { type: "Old Semi Furnished", price: "₹7,500", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600", map: "https://maps.google.com" }
    ],
    triple: [
        { type: "Luxury Fully Furnished", price: "₹8,000", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600", map: "https://maps.google.com" },
        { type: "Luxury Semi Furnished", price: "₹7,000", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600", map: "https://maps.google.com" },
        { type: "Old Semi Furnished", price: "₹6,000", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600", map: "https://maps.google.com" }
    ]
};

function filterRooms(cat, btn) {
    // Active Tab Styling
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const display = document.getElementById('rooms-display-grid');
    display.innerHTML = ''; // Clear previous

    roomOptions[cat].forEach(room => {
        display.innerHTML += `
            <div class="room-card">
                <div class="room-img-box">
                    <div class="price-tag-floating">${room.price}/-</div>
                    <img src="${room.img}" alt="Room">
                </div>
                <div class="room-details">
                    <h3>${room.type}</h3>
                    <div class="action-buttons">
                        <div class="btn-more-pics" onclick="alert('Opening Gallery...')">+3 More Photos</div>
                        <a href="${room.map}" target="_blank" class="btn-map-link">📍 View Location on Map</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Smooth scroll to results
    display.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Har room ki 3 extra photos ka data
const extraPhotos = {
    "Luxury Fully Furnished": [
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600",
        "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=600"
    ],
    "Luxury Semi Furnished": [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600"
    ],
    "Old Semi Furnished": [
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600",
        "https://images.unsplash.com/photo-1555854817-5b2247a8175f?w=600"
    ]
};

// Pehle wala filterRooms function update kar rha hu
function filterRooms(cat, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const display = document.getElementById('rooms-display-grid');
    display.innerHTML = ''; 

    roomOptions[cat].forEach(room => {
        // Yahan onclick mein room ka title pass kar rahe hain asli photos ke liye
        display.innerHTML += `
            <div class="room-card">
                <div class="room-img-box">
                    <div class="price-tag-floating">${room.price}/-</div>
                    <img src="${room.img}" alt="Room">
                </div>
                <div class="room-details">
                    <h3>${room.type}</h3>
                    <div class="action-buttons">
                        <div class="btn-more-pics" onclick="openRoomGallery('${room.type}')">+3 More Photos</div>
                        <a href="${room.map}" target="_blank" class="btn-map-link">📍 View Location on Map</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Naya Function: Gallery Kholne ke liye
function openRoomGallery(roomType) {
    const lightbox = document.getElementById('room-lightbox');
    const imgContainer = document.getElementById('lightbox-images');
    
    imgContainer.innerHTML = ''; // Purani images saaf karo
    
    // extraPhotos se images uthao
    extraPhotos[roomType].forEach(imgUrl => {
        imgContainer.innerHTML += `<img src="${imgUrl}" alt="Extra View">`;
    });
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Scroll band kar do piche ka
}

function closeRoomGallery() {
    document.getElementById('room-lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; // Scroll wapas chalu
}

window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.about-reveal');
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < trigger) {
            el.classList.add('active');
        }
    });
});


function toggleFAQ(element) {
    const parent = element.parentElement;
    
    // Close other FAQs if open (Optional, but looks cleaner)
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) {
            item.classList.remove('active');
        }
    });

    // Toggle current FAQ
    parent.classList.toggle('active');
}

// FAQ Scroll Reveal
window.addEventListener('scroll', () => {
    const faqHeader = document.querySelector('.faq-reveal');
    if(faqHeader && faqHeader.getBoundingClientRect().top < window.innerHeight * 0.9) {
        faqHeader.classList.add('active');
    }
});

// --- Google Review Slider Logic ---
let reviewIndex = 0;

function initReviewSlider() {
    const track = document.getElementById('reviewTrack');
    const cards = document.querySelectorAll('.review-card');
    
    if (!track || cards.length === 0) return;

    // Auto Slide function
    function slideReviews() {
        reviewIndex++;
        
        // Agar aakhri card par pahuch gaye toh wapas 0 par
        if (reviewIndex >= cards.length) {
            reviewIndex = 0;
        }

        const gap = 20; // CSS wala gap
        const cardWidth = cards[0].offsetWidth + gap;
        
        // Slide the track
        track.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
    }

    // Har 4 second mein slide hoga
    let autoSlideInterval = setInterval(slideReviews, 4000);

    // Jab user touch kare toh pause ho jaye (Mobile Experience)
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', () => autoSlideInterval = setInterval(slideReviews, 4000));
}

// Jab page poora load ho jaye tab slider start karein
window.addEventListener('load', initReviewSlider);

// Window resize hone par slider fix karein
window.addEventListener('resize', () => {
    reviewIndex = 0;
    const track = document.getElementById('reviewTrack');
    if(track) track.style.transform = `translateX(0)`;
});

function startVisitPopup() {
    setTimeout(() => {
        const popup = document.getElementById('visit-popup');
        popup.style.bottom = '30px'; // Upar le aao
        
        let seconds = 10;
        const timerEl = document.getElementById('popup-timer');
        
        const countdown = setInterval(() => {
            seconds--;
            timerEl.innerText = seconds;
            if (seconds <= 0) {
                clearInterval(countdown);
                // Option: 0 hone par popup hide karna ho toh yahan code daal sakte ho
            }
        }, 1000);
    }, 10000); // 10 second ka wait
}

function closeVisitPopup() {
    document.getElementById('visit-popup').style.bottom = '-150px';
}

window.addEventListener('load', startVisitPopup);

window.addEventListener('scroll', () => {
    const transitHeader = document.querySelector('.transit-reveal');
    if(transitHeader && transitHeader.getBoundingClientRect().top < window.innerHeight * 0.9) {
        transitHeader.classList.add('active');
    }
});