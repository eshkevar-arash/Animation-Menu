/*let nav = document.querySelector('.nav')

const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const animDiv = document.querySelector('.anim');
navLinks.forEach(function (navLink){
    navLink.addEventListener('mouseenter', event => {
        animDiv.style.opacity = '1'
        let myWith = event.target.offsetWidth
        let myLeft = event.target.offsetLeft
        animDiv.style.width =myWith+'px'
        animDiv.style.left = myLeft+'px'
    })
})
document.querySelector('.nav').addEventListener('mouseleave', () => {
    animDiv.style.width = '0';
    animDiv.style.opacity = '0';
})*/




const hoverSound = new Audio('sounds/hover.mp3');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const animDiv = document.querySelector('.anim');

// تنظیمات اولیه انیمیشن
Object.assign(animDiv.style, {
    transform: 'translateX(-100px)',
    opacity: '0',
    width: '0',
    transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(err => {
            console.log('صدا اجازه پخش نگرفت:', err);
        });
    })
})
// افکت ورود موس
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {

        const { offsetWidth, offsetLeft } = link;

        animDiv.style.cssText = `
      transform: translateX(${offsetLeft}px) translateZ(10px) rotateX(5deg);
      width: ${offsetWidth}px;
      opacity: 1;
      transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

        // افکت سه‌بعدی روی لینک (بدون GSAP)
        link.style.cssText = `
      transform: translateY(-5px) scale(1.05);
      transition: all 0.3s ease-out;
    `;
    });
});

// بازنشانی هنگام خروج
nav.addEventListener('mouseleave', () => {
    animDiv.style.cssText = `
    transform: translateX(-100px);
    width: 0;
    opacity: 0;
    transition: all 0.5s ease-in;
  `;

    // بازنشانی لینک‌ها
    navLinks.forEach(link => {
        link.style.transform = '';
    });
});

// انیمیشن ظاهر شدن اولیه (بدون GSAP)
document.addEventListener('DOMContentLoaded', () => {
    let delay = 100;
    navLinks.forEach(link => {
        setTimeout(() => {
            link.style.cssText = `
        transform: translateY(0);
        opacity: 1;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      `;
        }, delay);
        delay += 100;
    });
});

document.body.addEventListener('click', () => {
    hoverSound.play().catch(() => {
        // ساکت می‌مونیم چون فقط هدف آزادسازی بود
    });
}, { once: true });