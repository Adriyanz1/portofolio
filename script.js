// 1. Logika Fitur Dark/Light Mode
const themeToggle = document.getElementById('themeToggle');
const themeText = document.querySelector('.theme-text');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeText) themeText.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeText) themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeText) themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// 2. Efek Scroll Animasi (Intersection Observer)
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target); // Hanya animasi sekali saja saat di-scroll
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// 3. Hamburger Menu Mobile
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('navMenu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('is-active');
});

// Tutup menu saat link diklik
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('is-active');
    });
});

// 4. Highlight Nav Link Aktif saat Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// 5. Efek Ketik (Typing Effect)
const textArray = ["QA Engineer", "Manual Testing", "Automation Testing"];
let textIndex = 0;
let charIndex = 0;
const typedTextSpan = document.getElementById("typed-text");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, 1000);
});
